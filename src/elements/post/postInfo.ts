import { getIconForVisibility } from "../../assets";
import { relativeTime } from "../../utils";
import UsernameAcct from "../account/usernameAcct";
import { Status } from "../../models/status";
import AvatarWithPreview from "./avatarWithPreview";
import * as consts from "../../consts";
import AccountDisplayName from "../account/accountDisplayName";
import CustomHTMLElement from "../customElement";
import { addClasses, newElement, setAnchorHref, setInnerText, setInnerTextAsRelativeTime, setTitle } from "../../domUtils";
import { Visibility } from "../../models/visibility";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
}

a {
	color: var(--accent);
}

.poster-text-info {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-left: 1rem;
}

.left-column {
	display: flex;
	flex-direction: column;
}

.right-column {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.display-none {
	display: none;
}

.post-visibility {
	fill: var(--subtext);
	height: 24px;
}

.times {
	text-align: right;
}
`);

export default class PostInfo extends CustomHTMLElement {
	protected static override baseToClone: PostInfo;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as PostInfo;
	}

	constructor() {
		let elements = {
			avatar: AvatarWithPreview.newClone().addClasses("display-none"),
			displayName: new AccountDisplayName(),
			usernameAcct: new UsernameAcct(),
			createdAt: newElement({ element: "span", className: "post-time" }),
			editedAt: newElement({ element: "span", className: "edit-time" }),
			visibility: newElement({ element: "span", className: "post-visibility" }),
			times: newElement({ element: "a", className: "times" }),
		};
		elements.times.append(elements.createdAt, elements.editedAt);

		let leftCol = newElement({
			element: "div",
			className: "left-column",
			children: [elements.displayName, elements.usernameAcct],
		});
		let rightCol = newElement({
			element: "div",
			className: "right-column",
			children: [elements.times, elements.visibility],
		});
		let textInfo = newElement({ element: "div", className: "poster-text-info", children: [leftCol, rightCol] });

		let layout = [elements.avatar, textInfo];

		super(sheet, elements, layout);
	}

	public setData(post: Status, shouldIncludeAvatar: boolean) {
		if (shouldIncludeAvatar) this.set("avatar", post.account);
		this.toggleClassOnElement("avatar", "display-none", !shouldIncludeAvatar);

		this.set("displayName", post.account.display_name, post.account.emojis);
		this.set("usernameAcct", post.account);

		this.update("createdAt", post.created_at, setInnerTextAsRelativeTime);

		this.update("editedAt", post.edited_at, PostInfo.setEditedAt);

		this.update("times", post.id, PostInfo.setTimesHref);

		this.replaceChildrenOfElement("visibility", post.visibility, PostInfo.newPostVisibilityIcon);
	}

	private static newPostVisibilityIcon(visibility: Visibility) {
		const icon = getIconForVisibility(visibility);
		addClasses(icon, "post-visibility");
		setTitle(icon, visibility);
		return [icon];
	}

	private static setEditedAt(editedAtSpan: HTMLElement, editedAt: string) {
		setInnerText(editedAtSpan, ` (edited ${relativeTime(new Date(editedAt))})`);
	}

	private static setTimesHref(times: HTMLElement, statusId: string) {
		setAnchorHref(times, `/${consts.statusesPath}/${statusId}`);
	}
}
