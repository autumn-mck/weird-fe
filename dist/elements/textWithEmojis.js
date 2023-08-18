import { escapeHTML } from "../utils.js";
import CustomHTMLElement from "./customElement.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`


a {
	color: var(--accent);
}
`);
export default class TextWithEmojis extends CustomHTMLElement {
    static async build(text, emojis, shouldEscapeText = true) {
        if (shouldEscapeText)
            text = escapeHTML(text);
        for (const emoji of emojis) {
            const emojiHtml = escapeHTML(emoji.shortcode);
            const emojiImg = `<img src="${emoji.url}" alt="${emojiHtml}" title=":${emojiHtml}:" class="emoji" />`;
            text = text.replaceAll(`:${emojiHtml}:`, emojiImg);
        }
        return this.createNew(text, true);
    }
    static createNew(element, isRawHTML = false) {
        return new TextWithEmojis(sheet, [element], isRawHTML);
    }
}
//# sourceMappingURL=textWithEmojis.js.map