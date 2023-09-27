import { Account } from "../../models/account";
import ProfilePreview from "../account/profilePreview";
import AccountAvatar from "../account/accountAvatar";
import { pathToAccount } from "../../utils";
import CustomHTMLElement from "../customElement";
import { addEventListener, newElement, setAnchorHref } from "../../domUtils";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: var(--post-pfp-size);
}

.link {
	width: var(--post-pfp-size);
	height: var(--post-pfp-size);
}

.avatar-line {
	display: none;
	background: var(--border);
	width: 4px;
	flex-grow: 1;
	margin-bottom: -1.5rem;
}

.avatar-line.visible {
	display: flex;
}

profile-preview {
	display: none;
	position: absolute;
	top: var(--post-pfp-size);
	z-index: 9;

	width: 50ch;
}

.preview-visible {
	display: block;
}
`);

export default class AvatarWithPreview extends CustomHTMLElement {
	protected static override baseToClone: AvatarWithPreview;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as AvatarWithPreview;
	}

	constructor() {
		let elements = {
			avatar: AccountAvatar.newClone(),
			anchor: newElement({ element: "a", className: "link" }),
			profilePreview: ProfilePreview.newClone(),
			avatarLine: newElement({ element: "div", className: "avatar-line" }),
		};

		elements.anchor.appendChild(elements.avatar);

		let layout = [elements.anchor, elements.profilePreview, elements.avatarLine];

		super(sheet, elements, layout);

		addEventListener(elements.anchor, "click", AvatarWithPreview.toggleProfilePreview(this));
	}

	public setData(account: Account, includeSpaceForAvatarLine = false) {
		this.set("avatar", account.avatar);
		this.update("anchor", account.id, AvatarWithPreview.setAnchorToAccount);
		this.set("profilePreview", account);
		this.toggleClassOnElement("avatarLine", "visible", includeSpaceForAvatarLine);
	}

	private static setAnchorToAccount(anchor: HTMLElement, accountId: string) {
		setAnchorHref(anchor, pathToAccount(accountId));
	}

	private static toggleProfilePreview(elem: AvatarWithPreview) {
		return function (e: Event) {
			e.preventDefault();
			(elem.elements["profilePreview"]! as HTMLElement).classList.toggle("preview-visible");
		};
	}
}
