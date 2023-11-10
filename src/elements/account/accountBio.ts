import * as consts from "../../consts";
import { CustomEmoji } from "../../models/customEmoji";
import { formatInEmojis } from "../../utils";
import CustomHTMLElement from "../customElement";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
${consts.emojiCSS}
`);

export default class AccountBio extends CustomHTMLElement {
	public static override tagName = "account-bio";
	protected static override baseToClone: AccountBio;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as AccountBio;
	}

	constructor() {
		super(sheet);
	}

	public setData(bio: string, emojis: CustomEmoji[]) {
		this.replaceAll("bio", bio, formatInEmojis, emojis);
	}
}
