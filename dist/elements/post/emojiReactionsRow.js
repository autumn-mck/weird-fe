import CustomHTMLElement from "../customElement.js";
import EmojiReaction from "./emojiReaction.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	margin-top: 0.5rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
	row-gap: 0.5rem;
}
`);
export default class EmojiReactionsRow extends CustomHTMLElement {
    static async build(emojiReactions) {
        return Promise.all(emojiReactions.map(EmojiReaction.build)).then(EmojiReactionsRow.createNew);
    }
    static createNew(elements) {
        return new EmojiReactionsRow(sheet, elements);
    }
}
//# sourceMappingURL=emojiReactionsRow.js.map