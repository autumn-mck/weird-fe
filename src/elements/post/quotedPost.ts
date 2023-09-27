import { Status } from "../../models/status";
import CustomHTMLElement from "../customElement";
import PostBoostedBy from "./postBoostedBy";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	border: 1px solid var(--border);
	border-radius: 8px;
}

.post {

}
`);

export default class QuotedPost extends CustomHTMLElement {
	static async build(post: Status): Promise<CustomHTMLElement> {
		//return Post.build(post, false, true).then(addClasses("quoted-post")).then(QuotedPost.createNew);
		return PostBoostedBy.newClone();
	}

	public setData() {}
}
