import { addClasses, putChildrenInNewCurryContainer, setImgSrc, setInnerText } from "../../curryingUtils.js";
import { aCreateElement, formatInEmojis, parseHTML, relativeTime } from "../../utils.js";
import { Account } from "../../models/account";
import DisplayName from "./displayName.js";
import CustomHTMLElement from "../customElement.js";
import * as consts from "../../consts.js";
import Avatar from "./avatar.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	animation: 0.2s fadeIn;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    filter: opacity(0%);
  }
  100% {
    filter: opacity(100%);
  }
}

a {
	color: var(--accent);
}

.profile-preview {
	margin-top: 0.5rem;
	background: var(--background);
	border-radius: 8px;
	border: 1px solid var(--border);
	box-shadow: 0 0 8px var(--shadow);
	overflow: hidden;
	--post-pfp-size:var(--pfp-size-large)
}

.preview-header {
	height: 6rem;
	width: 100%;
	object-fit: cover;
}

x-avatar {
	position: absolute;
	top: calc(6rem - var(--post-pfp-size) / 2);
	left: 1rem;
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
				Avatar.build(account.avatar).then(addClasses("with-border")),

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
			.then(ProfilePreview.createNew);
	}

	protected static createNew(element: HTMLElement | string): CustomHTMLElement {
		return new ProfilePreview(sheet, [element]);
	}
}
