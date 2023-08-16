import { getIconForVisibility } from "../../assets.js";
import {
	addClasses,
	putChildrenInNewCurryContainer,
	putChildrenInShadowDOM,
	setAnchorHref,
	setInnerText,
	setTitle,
} from "../../curryingUtils.js";
import { aCreateElement, relativeTime } from "../../utils.js";
import UsernameAcct from "../account/usernameAcct.js";
import { Status } from "../../models/status.js";
import AvatarWithPreview from "./avatarWithPreview.js";
import * as consts from "../../consts.js";
import DisplayName from "../account/displayName.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	margin-bottom: 0.5rem;
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


.poster-info-col-1 {
	display: inline-block;
}

.poster-info-column-2 * {
	text-align: right;
}

.post-visibility {
	fill: var(--subtext);
}
`);

export default class PosterInfo extends HTMLElement {
	constructor(post: Status, shouldIncludeAvatar: boolean) {
		super();

		const shadow = this.attachShadow({ mode: "closed" });
		shadow.adoptedStyleSheets = [sheet];

		Promise.all([
			shouldIncludeAvatar ? new AvatarWithPreview(post.account) : "",
			Promise.all([constructLeftCol(post), constructRightCol(post)]).then(putChildrenInNewCurryContainer("poster-text-info")),
		]).then(putChildrenInShadowDOM(shadow));

		function constructLeftCol(post: Status): Promise<HTMLElement> {
			return Promise.all([new DisplayName(post.account), new UsernameAcct(post.account)]).then(
				putChildrenInNewCurryContainer("poster-info-column-1")
			);
		}

		function constructRightCol(post: Status): Promise<HTMLElement> {
			return Promise.all([
				aCreateElement("a", "post-time")
					.then(setInnerText(relativeTime(new Date(post.created_at))))
					.then(setAnchorHref(`/${consts.statusesPath}/${post.id}`)),

				getIconForVisibility(post.visibility).then(addClasses("post-visibility")).then(setTitle(post.visibility)),
			]).then(putChildrenInNewCurryContainer("poster-info-column-2"));
		}
	}
}
