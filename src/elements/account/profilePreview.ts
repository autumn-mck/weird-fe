import { Account } from "../../models/account";
import AccountDisplayName from "./accountDisplayName";
import CustomHTMLElement from "../customElement";
import AccountAvatar from "./accountAvatar";
import { newContainerFor, newElement, setInnerTextAsRelativeTime, setSrc } from "../../domUtils";
import AccountBio from "./accountBio";

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

.preview {
	margin-top: 0.5rem;
	background: var(--background);
	border-radius: 8px;
	border: 1px solid var(--border);
	box-shadow: 0 0 8px var(--shadow);
	overflow: hidden;
	--post-pfp-size:var(--pfp-size-large)
}

.header {
	height: 6rem;
	width: 100%;
	object-fit: cover;
}

x-avatar {
	position: absolute;
	top: calc(6rem - var(--post-pfp-size) / 2);
	left: 1rem;
}

.content {
	padding: 1rem;
}
`);

export default class ProfilePreview extends CustomHTMLElement {
	protected static override baseToClone: ProfilePreview;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as ProfilePreview;
	}

	constructor() {
		let elements = {
			header: newElement({ element: "img", className: "header" }),
			avatar: AccountAvatar.newClone().addClasses("with-border"),
			displayName: AccountDisplayName.newClone(),
			bio: AccountBio.newClone(),
			createdAt: newElement({ element: "p", className: "created-at" }),
		};

		let textContent = newContainerFor(
			"div",
			"text-content",
			elements.displayName,
			elements.bio,
			elements.createdAt
		);
		let content = newContainerFor("div", "content", elements.avatar, textContent);
		let layout = [newContainerFor("div", "preview", elements.header, content)];

		super(sheet, elements, layout);
	}

	public setData(account: Account) {
		this.update("header", account.header, setSrc);
		this.set("avatar", account.avatar);
		this.set("displayName", account.display_name, account.emojis);
		this.set("bio", account.note, account.emojis);
		this.update("createdAt", account.created_at, setInnerTextAsRelativeTime);
	}
}
