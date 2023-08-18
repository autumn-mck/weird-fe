import { addClasses } from "../../curryingUtils.js";
import { Status } from "../../models/status.js";
import { constructPost } from "../../postRendering.js";
import CustomHTMLElement from "../customElement.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	margin-top: 0.5rem;
}

.post {
	border: 1px solid var(--border);
	border-radius: 8px;
}
`);

export default class QuotedPost extends CustomHTMLElement {
	static async build(post: Status): Promise<CustomHTMLElement> {
		return constructPost(post, false, true).then(addClasses("quoted-post")).then(this.createNew);
	}

	protected static createNew(element: HTMLElement | string): CustomHTMLElement {
		return new QuotedPost(sheet, [element]);
	}
}
