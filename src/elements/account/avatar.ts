import { putChildInShadowDOM, setImgSrc } from "../../curryingUtils.js";
import { aCreateElement } from "../../utils.js";
import { Account } from "../../models/account";

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

export default class Avatar extends HTMLElement {
	constructor(avatarSrc: string) {
		super();

		const shadow = this.attachShadow({ mode: "closed" });
		shadow.adoptedStyleSheets = [sheet];

		aCreateElement("img", "avatar").then(setImgSrc(avatarSrc)).then(putChildInShadowDOM(shadow));
	}
}
