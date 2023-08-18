import { setImgSrc } from "../../curryingUtils.js";
import { aCreateElement } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
}

.avatar {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	border-radius: 8px;
	z-index: 1;
}
`);

export default class Avatar extends CustomHTMLElement {
	static async build(avatarSrc: string): Promise<CustomHTMLElement> {
		return aCreateElement("img", "avatar").then(setImgSrc(avatarSrc)).then(Avatar.createNew);
	}

	protected static createNew(element: HTMLElement | string): CustomHTMLElement {
		return new Avatar(sheet, [element]);
	}
}
