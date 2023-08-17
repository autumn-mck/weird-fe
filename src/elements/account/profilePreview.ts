import { addClasses, putChildrenInNewCurryContainer, setImgSrc, setInnerHTML, setInnerText } from "../../curryingUtils.js";
import { aCreateElement, formatInEmojis, relativeTime } from "../../utils.js";
import { Account } from "../../models/account";
import DisplayName from "./displayName.js";
import CustomHTMLElement from "../customElement.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: none;
}

a {
	color: var(--accent);
}

.profile-preview {
	margin-top: 1rem;
	background: var(--background);
	border-radius: 8px;
	border: 1px solid var(--border);
	box-shadow: 0 0 8px var(--shadow);
	overflow: hidden;
}

.preview-header {
	height: 10rem;
	width: 100%;
	object-fit: cover;
}

.preview-avatar {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
}

.profile-preview-content {
	padding: 1rem;
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

export default class ProfilePreview extends CustomHTMLElement {
	static async build(account: Account): Promise<CustomHTMLElement> {
		const accountBio = formatInEmojis(account.note, account.emojis);
		const accountCreatedAt = relativeTime(new Date(account.created_at));

		return Promise.all([
			aCreateElement("img", "preview-header").then(setImgSrc(account.header)),

			Promise.all([
				aCreateElement("img", "preview-avatar").then(setImgSrc(account.avatar)),

				Promise.all([
					DisplayName.build(account),
					aCreateElement("p").then(setInnerHTML(accountBio)).then(addClasses("profile-preview-bio")),
					aCreateElement("p").then(setInnerText(accountCreatedAt)).then(addClasses("profile-preview-created-at")),
				]).then(putChildrenInNewCurryContainer("profile-preview-text")),
			]).then(putChildrenInNewCurryContainer("profile-preview-content")),
		])
			.then(putChildrenInNewCurryContainer("profile-preview"))
			.then(this.createNew);
	}

	protected static createNew(element: HTMLElement | string): CustomHTMLElement {
		return new ProfilePreview(sheet, [element]);
	}
}
