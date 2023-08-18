import { addClasses, putChildrenInNewCurryContainer, setImgSrc, setInnerText } from "../../curryingUtils.js";
import { aCreateElement, formatInEmojis, parseHTML, relativeTime } from "../../utils.js";
import { Account } from "../../models/account";
import DisplayName from "./displayName.js";
import CustomHTMLElement from "../customElement.js";
import * as consts from "../../consts.js";

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

${consts.emojiCSS}
`);

export default class ProfilePreview extends CustomHTMLElement {
	static async build(account: Account): Promise<CustomHTMLElement> {
		const accountCreatedAt = relativeTime(new Date(account.created_at));

		return Promise.all([
			aCreateElement("img", "preview-header").then(setImgSrc(account.header)),

			Promise.all([
				aCreateElement("img", "preview-avatar").then(setImgSrc(account.avatar)),

				Promise.all([
					DisplayName.build(account.display_name, account.emojis),
					formatInEmojis(account.note, account.emojis)
						.then(parseHTML)
						.then(putChildrenInNewCurryContainer("profile-preview-bio")),
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
