import { setInnerHTML } from "../../curryingUtils.js";
import { aCreateElement, escapeHTML, formatInEmojis } from "../../utils.js";
import { Account } from "../../models/account";
import CustomHTMLElement from "../customElement.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
p {
	font-weight: bold;
	margin: 0;
	display: inline-block;
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

export default class DisplayName extends CustomHTMLElement {
	static async build(account: Account): Promise<CustomHTMLElement> {
		return aCreateElement("p")
			.then(setInnerHTML(this.#getAccountDisplayNameHTML(account)))
			.then(this.createNew);
	}

	static #getAccountDisplayNameHTML(account: Account) {
		let displayNameHtml = escapeHTML(account.display_name);
		return formatInEmojis(displayNameHtml, account.emojis);
	}

	protected static createNew(element: HTMLElement | string): CustomHTMLElement {
		return new DisplayName(sheet, [element]);
	}
}
