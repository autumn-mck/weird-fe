import { addClasses, putChildrenInNewCurryContainer, setInnerText } from "../../curryingUtils.js";
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
	padding: 0.5rem 0.5rem 0 0.5rem;
	margin: 0.5rem 0.5rem 0 0.5rem;
	display: flex;
	background: transparent;
	transition: background 0.2s ease-in-out;
	border-radius: 8px;
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
}

.post-spoiler .post-inner-body {
	filter: blur(8px);
	/*height: 2ch;*/
	overflow: hidden;
	user-select: none;
}
`);
export default class Post extends CustomHTMLElement {
    static async build(post, inludeSpaceForAvatarLine = false, isQuoted = false) {
        return (post.reblog ? this.#constructBoost(post) : this.#constructStandardPost(inludeSpaceForAvatarLine, post, isQuoted)).then((elements) => this.createNew(elements, post.id));
    }
    static async #constructBoost(post) {
        return Promise.all([BoostedBy.build(post), Post.build(post.reblog).then(addClasses("boosted-post"))])
            .then(putChildrenInNewCurryContainer("post-body"))
            .then((body) => [body]);
    }
    static async #constructStandardPost(inludeSpaceForAvatarLine, post, isQuoted) {
        return Promise.all([
            inludeSpaceForAvatarLine ? AvatarWithPreview.build(post.account, inludeSpaceForAvatarLine) : "",
            this.#constructStandardPostBody(post, inludeSpaceForAvatarLine, isQuoted),
        ]);
    }
    static async #constructStandardPostBody(post, inludeSpaceForAvatarLine, isQuoted) {
        return Promise.all([
            PosterInfo.build(post, !inludeSpaceForAvatarLine),
            post.spoiler_text ? aCreateElement("p", "post-spoiler-text").then(setInnerText(post.spoiler_text)) : "",
            Promise.all([
                PostTextContent.build(post.content, post.emojis),
                post.media_attachments && post.media_attachments.length > 0
                    ? PostMedia.build(post.media_attachments, post.sensitive)
                    : "",
                post.poll ? "TODO: poll" : "",
                post.quote ? QuotedPost.build(post.quote) : "",
            ]).then(putChildrenInNewCurryContainer("post-inner-body")),
            !isQuoted && post.emoji_reactions && post.emoji_reactions.length > 0 ? EmojiReactionsRow.build(post.emoji_reactions) : "",
            !isQuoted ? InteractionsRow.build(post) : "",
        ])
            .then(putChildrenInNewCurryContainer("post-body"))
            .then((postBody) => {
            if (post.spoiler_text)
                postBody.className += " post-spoiler";
            return postBody;
        });
    }
    static createNew(elements, id) {
        const post = new Post(sheet, elements);
        post.id = id;
        return post;
    }
}
//# sourceMappingURL=post.js.map