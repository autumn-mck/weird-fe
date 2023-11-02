import { newElement } from "../../domUtils";
import { Status } from "../../models/status";
import CustomHTMLElement from "../customElement";
import AvatarWithPreview from "./avatarWithPreview";
import EmojiReactions from "./emojiReactions";
import PostInteractionsRow from "./postInteractionsRow";
import PostMedia from "./postMedia";
import PostTextContent from "./postTextContent";
import PostInfo from "./postInfo";
import * as consts from "../../consts";
import { PostContentWarning } from "./postContentWarning";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	${consts.postCSS}
	display: flex;
}

:host(.quoted-post) {
	margin: 0;
	padding: 0.5rem;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
	border-radius: 8px;
}

:host(.quoted-post:hover) {
	border-color: var(--border-hover);
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
}

:host(.boosted-post),
:host(.boosted-post:hover) {
	padding: 0;
	margin: 0;
	background: none;
	width: 100%;
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

.display-none {
	display: none;
}

:host(.content-hidden) .post-inner-body {
	display: none;
}

:host(.content-hidden) .quoted-post {
	display: none;
}
`);

export default class StandardPost extends CustomHTMLElement {
	protected static override baseToClone: StandardPost;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as StandardPost;
	}

	//private includeSpaceForAvatarLine = false;

	constructor() {
		let elements = {
			avatar: AvatarWithPreview.newClone().addClasses("display-none"),
			posterInfo: PostInfo.newClone(),
			spoilerText: new PostContentWarning(),
			content: new PostTextContent(),
			media: new PostMedia(),
			quote: "",
			emojiReactions: EmojiReactions.newClone(),
			interactionsRow: PostInteractionsRow.newClone(),
		};

		let innerBody = newElement({ element: "div", className: "post-inner-body", children: [elements.content, elements.media] });
		let body = newElement({
			element: "div",
			className: "post-body",
			children: [elements.posterInfo, elements.spoilerText, innerBody, elements.emojiReactions, elements.interactionsRow],
		});

		let layout = [elements.avatar, body];

		super(sheet, elements, layout);
	}

	public setData(post: Status, includeSpaceForAvatarLine: boolean, isQuoted: boolean) {
		this.id = post.id;

		this.toggleClassOnElement("avatar", "display-none", !includeSpaceForAvatarLine);
		if (includeSpaceForAvatarLine) this.set("avatar", post.account, true);
		this.set("posterInfo", post, !includeSpaceForAvatarLine);
		this.toggleClassOnElement("spoilerText", "display-none", !post.spoiler_text);
		this.set("spoilerText", post.spoiler_text, post.emojis, this);
		if (post.spoiler_text) this.classList.add("content-hidden");

		this.toggleClassOnElement("content", "display-none", !post.content);
		this.set("content", post.content, post.emojis, post.mentions);

		this.toggleClassOnElement("media", "display-none", !post.media_attachments.length);
		this.set("media", post.media_attachments, post.sensitive);

		if (post.quote) {
			if (!this.elements["quote"]) {
				let quote = StandardPost.newClone().addClasses("quoted-post");
				this.elements["quote"] = quote;
				(this.elements["emojiReactions"] as Node).parentNode!.insertBefore(quote, this.elements["emojiReactions"] as Node);
			}
			(this.elements["quote"] as CustomHTMLElement).setData(post.quote, false, true);
		}

		this.toggleClassOnElement("emojiReactions", "display-none", !post.emoji_reactions?.length);
		this.set("emojiReactions", post.emoji_reactions);

		this.toggleClassOnElement("interactionsRow", "display-none", isQuoted);
		this.toggleClassOnElement("interactionsRow", "extra-margin", !includeSpaceForAvatarLine);
		this.set("interactionsRow", post, includeSpaceForAvatarLine);
	}
}
