import { formatInEmojis, parseHTML } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import * as consts from "../../consts.js";
import { CustomEmoji } from "../../models/customEmoji.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	font-weight: bold;
	margin: 0;
	display: inline-block;
}

${consts.emojiCSS}
`);

export default class DisplayName extends CustomHTMLElement {
	static async build(display_name: string, emojis: CustomEmoji[]): Promise<CustomHTMLElement> {
		return formatInEmojis(display_name, emojis).then(parseHTML).then(DisplayName.createNew);
	}

	protected static createNew(elements: (Node | string)[]): CustomHTMLElement {
		return new DisplayName(sheet, elements);
	}
}
