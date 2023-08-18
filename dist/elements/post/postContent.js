import { formatInEmojis, parseHTML } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import * as consts from "../../consts.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
p {
	margin: 0;
}

a {
	color: var(--accent);
}

${consts.emojiCSS}
`);
export default class PostContent extends CustomHTMLElement {
    static async build(content, emojis) {
        return formatInEmojis(content, emojis).then(parseHTML).then(this.createNew);
    }
    static createNew(elements) {
        return new PostContent(sheet, elements);
    }
}
//# sourceMappingURL=postContent.js.map