import { Account } from "../../models/account";
import ProfilePreview from "../account/profilePreview.js";
import Avatar from "../account/avatar.js";
import { aCreateElement, pathToAccount } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import { putChildInNewCurryContainer, setAnchorHref, addEventListener } from "../../curryingUtils.js";

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
	display: flex;
	background: var(--border);
	width: 4px;
	flex-grow: 1;
	margin-bottom: -1.5rem;
}

profile-preview {
	display: none;
	position: absolute;
	top: var(--post-pfp-size);
	z-index: 9;

	width: 50ch;
}

:host(.preview-visible) profile-preview {
	display: block;
}
`);

export default class AvatarWithPreview extends CustomHTMLElement {
	static async build(account: Account, includeSpaceForAvatarLine = false): Promise<CustomHTMLElement> {
		return Promise.all([
			Avatar.build(account.avatar)
				.then(putChildInNewCurryContainer("link", "a"))
				.then(setAnchorHref(pathToAccount(account.id))),

			ProfilePreview.build(account),
			includeSpaceForAvatarLine ? aCreateElement("div", "avatar-line") : "",
		])
			.then(AvatarWithPreview.createNew)
			.then(addEventListener("click", AvatarWithPreview.toggleProfilePreview));
	}

	private static toggleProfilePreview(e: Event) {
		e.preventDefault();

		let targetElement = e.target as AvatarWithPreview;
		targetElement.classList.toggle("preview-visible");
	}

	protected static createNew(elements: (HTMLElement | string)[]): AvatarWithPreview {
		return new AvatarWithPreview(sheet, elements);
	}
}
