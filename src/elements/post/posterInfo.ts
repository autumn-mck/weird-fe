import { getIconForVisibility } from "../../assets.js";
import { addClasses, putChildrenInNewCurryContainer, setAnchorHref, setInnerText, setTitle } from "../../curryingUtils.js";
import { aCreateElement, relativeTime } from "../../utils.js";
import UsernameAcct from "../account/usernameAcct.js";
import { Status } from "../../models/status.js";
import AvatarWithPreview from "./avatarWithPreview.js";
import * as consts from "../../consts.js";
import DisplayName from "../account/displayName.js";
import CustomHTMLElement from "../customElement.js";
import { Account } from "../../models/account.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	align-items: center;
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

.svg {
	height: 24px;
	width: 24px;
}

.post-visibility {
	fill: var(--subtext);
}
`);

export default class PosterInfo extends CustomHTMLElement {
	static async build(post: Status, shouldIncludeAvatar: boolean): Promise<CustomHTMLElement> {
		return Promise.all([
			shouldIncludeAvatar ? AvatarWithPreview.build(post.account) : "",
			Promise.all([PosterInfo.constructLeftCol(post.account), PosterInfo.constructRightCol(post)]).then(
				putChildrenInNewCurryContainer("poster-text-info")
			),
		]).then(PosterInfo.createNew);
	}

	private static async constructLeftCol(account: Account): Promise<HTMLElement> {
		return Promise.all([DisplayName.build(account.display_name, account.emojis), UsernameAcct.build(account)]).then(
			putChildrenInNewCurryContainer("left-column")
		);
	}

	private static async constructRightCol(post: Status): Promise<HTMLElement> {
		return Promise.all([
			aCreateElement("a", "post-time")
				.then(setInnerText(relativeTime(new Date(post.created_at))))
				.then(setAnchorHref(`/${consts.statusesPath}/${post.id}`)),

			getIconForVisibility(post.visibility).then(addClasses("post-visibility")).then(setTitle(post.visibility)),
		]).then(putChildrenInNewCurryContainer("right-column"));
	}

	protected static createNew(elements: (HTMLElement | string)[]): CustomHTMLElement {
		return new PosterInfo(sheet, elements);
	}
}
