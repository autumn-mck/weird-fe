import { putChildrenInShadowDOM } from "../../curryingUtils.js";
import ProfilePreview from "../account/profilePreview.js";
import Avatar from "../account/avatar.js";
import { aCreateElement } from "../../utils.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: var(--post-pfp-size);
}

.avatar-line {
	display: flex;
	background: var(--border);
	width: 4px;
	flex-grow: 1;
	margin-bottom: -20px;
}

x-avatar:hover + profile-preview,
profile-preview:hover {
	display: block;
	position: absolute;
	top: var(--post-pfp-size);
	left: 0;
	z-index: 9;
	width: 70ch;
}

`);
export default class AvatarWithPreview extends HTMLElement {
    constructor(account, includeSpaceForAvatarLine = false) {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        shadow.adoptedStyleSheets = [sheet];
        Promise.all([
            new Avatar(account.avatar),
            new ProfilePreview(account),
            includeSpaceForAvatarLine ? aCreateElement("div", "avatar-line") : "",
        ]).then(putChildrenInShadowDOM(shadow));
    }
}
//# sourceMappingURL=avatarWithPreview.js.map