import { addClasses } from "../../curryingUtils.js";
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
    static async build(post) {
        return constructPost(post, false, true).then(addClasses("quoted-post")).then(this.createNew);
    }
    static createNew(element) {
        return new QuotedPost(sheet, [element]);
    }
}
//# sourceMappingURL=quotedPost.js.map