import { addClasses, setImgSrc, setInnerText, setTitle } from "../../curryingUtils.js";
import { aCreateElement } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	align-items: center;
	padding: 0.5rem;
	padding-right: 1rem;
}

.emoji {
	vertical-align: middle;
	/* stares at https://bugzilla.mozilla.org/show_bug.cgi?id=1310170 */
	height: 1.375rem;
	min-width: 1.375rem;
	transition: transform 0.1s ease-in-out;
	max-width: 100%;
	object-fit: contain;
}

.emoji:hover {
	z-index: 1;
	transform: scale(2);
}
`);

export default class EmojiReaction extends CustomHTMLElement {
	static async build(emojiReaction: any): Promise<CustomHTMLElement> {
		console.log(emojiReaction);
		return Promise.all([
			EmojiReaction.#createEmojiElement(emojiReaction).then(addClasses("emoji")),
			aCreateElement("span", "emoji-reaction-count").then(setInnerText(String(emojiReaction.count))),
		]).then(EmojiReaction.createNew);
	}

	protected static createNew(elements: (HTMLElement | string)[]): CustomHTMLElement {
		return new EmojiReaction(sheet, elements);
	}

	static async #createEmojiElement(emojiReaction: any) {
		if (emojiReaction.url) {
			return aCreateElement("img", "emoji-reaction-img")
				.then(setImgSrc(emojiReaction.url))
				.then(setTitle(":" + emojiReaction.name + ":"));
		} else {
			return aCreateElement("span", "emoji-reaction-span").then(setInnerText(emojiReaction.name));
		}
	}
}
