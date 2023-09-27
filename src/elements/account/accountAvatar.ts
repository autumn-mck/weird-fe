import { newElement, setSrc } from "../../domUtils";
import CustomHTMLElement from "../customElement";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	z-index: 1;
}

.avatar {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	border-radius: 8px;
}

:host(.with-border) .avatar {
	border: 4px solid var(--background-translucent);
}
`);

export default class AccountAvatar extends CustomHTMLElement {
	protected static override baseToClone: AccountAvatar;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as AccountAvatar;
	}

	constructor() {
		let elements = {
			avatar: newElement({ element: "img", className: "avatar" }),
		};

		super(sheet, elements);
	}

	public setData(avatarSrc: string) {
		this.update("avatar", avatarSrc, setSrc);
		return this;
	}
}
