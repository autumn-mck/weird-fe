import { addClasses, setImgSrc, setInnerText, setTitle } from "../../curryingUtils.js";
import { aCreateElement } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import * as consts from "../../consts.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	align-items: center;
	padding: 0.5rem;
	padding-right: 1rem;
}

${consts.emojiCSS}
`);

export default class EmojiReaction extends CustomHTMLElement {
	static async build(emojiReaction: any): Promise<CustomHTMLElement> {
		return Promise.all([
			EmojiReaction.createEmojiElement(emojiReaction).then(addClasses("emoji")),
			EmojiReaction.buildReactionCount(emojiReaction.count),
		]).then(EmojiReaction.createNew);
	}

	private static buildReactionCount(count: number): Promise<HTMLElement> {
		return aCreateElement("span", "emoji-reaction-count").then(setInnerText(String(count)));
	}

	protected static createNew(elements: (HTMLElement | string)[]): CustomHTMLElement {
		return new EmojiReaction(sheet, elements);
	}

	private static async createEmojiElement(emojiReaction: any) {
		if (emojiReaction.url) {
			return aCreateElement("img", "emoji-reaction-img")
				.then(setImgSrc(emojiReaction.url))
				.then(setTitle(":" + emojiReaction.name + ":"));
		} else {
			return aCreateElement("span", "emoji-reaction-span").then(setInnerText(emojiReaction.name));
		}
	}
}
