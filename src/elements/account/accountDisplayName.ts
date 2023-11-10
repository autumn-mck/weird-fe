import { formatInEmojis } from "../../utils";
import CustomHTMLElement from "../customElement";
import * as consts from "../../consts";
import { CustomEmoji } from "../../models/customEmoji";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	font-weight: bold;
	margin: 0;
	display: inline-block;
}

${consts.emojiCSS}
`);

export default class AccountDisplayName extends CustomHTMLElement {
	public static override tagName = "display-name";
	protected static override baseToClone: AccountDisplayName;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as AccountDisplayName;
	}

	constructor() {
		super(sheet);
	}

	public setData(displayName: string, emojis: CustomEmoji[]) {
		this.replaceAll("displayName", displayName, formatInEmojis, emojis);
	}
}
