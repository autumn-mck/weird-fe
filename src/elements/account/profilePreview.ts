import {
	addClasses,
	putChildInShadowDOM,
	putChildrenInNewCurryContainer,
	setImgSrc,
	setInnerHTML,
	setInnerText,
} from "../../curryingUtils.js";
import { aCreateElement, formatInEmojis, relativeTime } from "../../utils.js";
import { Account } from "../../models/account";
import DisplayName from "./displayName.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: none;
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
`);

export default class ProfilePreview extends HTMLElement {
	constructor(account: Account) {
		super();

		const shadow = this.attachShadow({ mode: "closed" });
		shadow.adoptedStyleSheets = [sheet];

		const accountBio = formatInEmojis(account.note, account.emojis);
		const accountCreatedAt = relativeTime(new Date(account.created_at));

		Promise.all([
			aCreateElement("img", "preview-header").then(setImgSrc(account.header)),

			Promise.all([
				aCreateElement("img", "preview-avatar").then(setImgSrc(account.avatar)),

				Promise.all([
					new DisplayName(account),
					aCreateElement("p").then(setInnerHTML(accountBio)).then(addClasses("profile-preview-bio")),
					aCreateElement("p").then(setInnerText(accountCreatedAt)).then(addClasses("profile-preview-created-at")),
				]).then(putChildrenInNewCurryContainer("profile-preview-text")),
			]).then(putChildrenInNewCurryContainer("profile-preview-content")),
		])
			.then(putChildrenInNewCurryContainer("profile-preview"))
			.then(putChildInShadowDOM(shadow));
	}
}
