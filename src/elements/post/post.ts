import { addClasses, putChildrenInNewCurryContainer, setId, setInnerText } from "../../curryingUtils.js";
import { Status } from "../../models/status.js";
import { aCreateElement } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import AvatarWithPreview from "./avatarWithPreview.js";
import BoostedBy from "./boostedBy.js";
import EmojiReactionsRow from "./emojiReactionsRow.js";
import InteractionsRow from "./interactionsRow.js";
import PostMedia from "./postMedia.js";
import PostTextContent from "./postTextContent.js";
import PosterInfo from "./posterInfo.js";
import QuotedPost from "./quotedPost.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	width: calc(100% - 1rem);
	/* todo root post should have top split 50/50 */
	padding: 0.5rem 0.5rem 0.5rem 0.5rem;
	margin: 0.5rem 0.5rem 0 0.5rem;
	display: flex;
	background: transparent;
	transition: background 0.2s ease-in-out;
	border-radius: 8px;
}

:host(.quoted-post) {
	margin: 0;
	padding: 0.5rem;
	width: 100%;
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
}

.boosted-post,
.boosted-post:hover {
	padding: 0;
	margin: 0;
	background: none;
}

.post-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-inner-body {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-spoiler .post-inner-body {
	filter: blur(8px);
	/*height: 2ch;*/
	overflow: hidden;
	user-select: none;
}
`);

export default class Post extends CustomHTMLElement {
	static async build(post: Status, inludeSpaceForAvatarLine = false, isQuoted = false): Promise<CustomHTMLElement> {
		return (post.reblog ? Post.constructBoost(post) : Post.constructPost(inludeSpaceForAvatarLine, post, isQuoted))
			.then(Post.createNew)
			.then(setId(post.id));
	}

	private static async constructBoost(post: Status) {
		return Promise.all([BoostedBy.build(post), Post.build(post.reblog!).then(addClasses("boosted-post"))])
			.then(putChildrenInNewCurryContainer("post-body"))
			.then((body) => [body]);
	}

	private static async constructPost(inludeSpaceForAvatarLine: boolean, post: Status, isQuoted: boolean) {
		return Promise.all([
			inludeSpaceForAvatarLine ? AvatarWithPreview.build(post.account, inludeSpaceForAvatarLine) : "",
			Post.constructStandardPostBody(post, inludeSpaceForAvatarLine, isQuoted),
		]);
	}

	private static async constructStandardPostBody(post: Status, inludeSpaceForAvatarLine: boolean, isQuoted: boolean) {
		return Promise.all([
			PosterInfo.build(post, !inludeSpaceForAvatarLine),
			post.spoiler_text ? aCreateElement("p", "post-spoiler-text").then(setInnerText(post.spoiler_text)) : "",
			Post.constructInnerBody(post),
			Post.shouldDisplayEmojiReactionRow(isQuoted, post.emoji_reactions) ? EmojiReactionsRow.build(post.emoji_reactions!) : "",
			!isQuoted ? InteractionsRow.build(post, inludeSpaceForAvatarLine) : "",
		])
			.then(putChildrenInNewCurryContainer("post-body"))
			.then(Post.markSpoilerIfNeeded(post.spoiler_text));
	}

	private static markSpoilerIfNeeded(postSpoilerText: string) {
		return function (postBody: HTMLElement) {
			if (postSpoilerText) postBody.className += " post-spoiler";
			return postBody;
		};
	}

	private static shouldDisplayEmojiReactionRow(isQuoted: boolean, emojiReactions: any[] | undefined) {
		return !isQuoted && emojiReactions && emojiReactions.length > 0;
	}

	private static constructInnerBody(post: Status): Promise<HTMLElement> {
		return Promise.all([
			PostTextContent.build(post.content, post.emojis, post.mentions),
			post.media_attachments && post.media_attachments.length > 0 ? PostMedia.build(post.media_attachments, post.sensitive) : "",
			post.poll ? "TODO: poll" : "",
			post.quote ? QuotedPost.build(post.quote) : "",
		]).then(putChildrenInNewCurryContainer("post-inner-body"));
	}

	protected static createNew(elements: (HTMLElement | string)[]): CustomHTMLElement {
		return new Post(sheet, elements);
	}
}
