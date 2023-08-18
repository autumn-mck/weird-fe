import { Account } from "../../models/account";
import ProfilePreview from "../account/profilePreview.js";
import Avatar from "../account/avatar.js";
import { aCreateElement } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: var(--post-pfp-size);
}

.avatar-line {
	display: flex;
	background: var(--border);
	width: 4px;
	flex-grow: 1;
	margin-bottom: -20px;
}

x-avatar:hover + profile-preview,
profile-preview:hover {
	display: block;
	position: absolute;
	top: var(--post-pfp-size);
	left: 0;
	z-index: 9;
	width: 70ch;
}
`);

export default class AvatarWithPreview extends CustomHTMLElement {
	static async build(account: Account, includeSpaceForAvatarLine = false): Promise<CustomHTMLElement> {
		return Promise.all([
			Avatar.build(account.avatar),
			ProfilePreview.build(account),
			includeSpaceForAvatarLine ? aCreateElement("div", "avatar-line") : "",
		]).then(AvatarWithPreview.createNew);
	}

	protected static createNew(elements: (HTMLElement | string)[]): CustomHTMLElement {
		return new AvatarWithPreview(sheet, elements);
	}
}
