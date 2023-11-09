import Status from "../../models/status";
import Boost from "./boost";
import StandardPost from "./standardPost";

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

export default class Post {
	static async build(post: Status, inludeSpaceForAvatarLine = false, isQuoted = false) {
		if (post.reblog) {
			return this.constructBoost(post);
		} else {
			return this.constructPost(inludeSpaceForAvatarLine, post, isQuoted);
		}
	}

	private static fillMissingData(post: Status): Status {
		// todo, and not in this class
		return post;
	}

	private static constructBoost(post: Status) {
		let boost = Boost.newClone();
		boost.setData(post);
		return boost;
	}

	private static constructPost(inludeSpaceForAvatarLine: boolean, post: Status, isQuoted: boolean) {
		let newPost = StandardPost.newClone();
		newPost.setData(post, inludeSpaceForAvatarLine, isQuoted);
		return newPost;
	}
}
