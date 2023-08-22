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

.preview-visible {
	display: block;
}
`);
export default class AvatarWithPreview extends CustomHTMLElement {
    static async build(account, includeSpaceForAvatarLine = false) {
        return Promise.all([
            Avatar.build(account.avatar)
                .then(putChildInNewCurryContainer("link", "a"))
                .then(setAnchorHref(pathToAccount(account.id)))
                .then(addEventListener("click", AvatarWithPreview.toggleProfilePreview)),
            ProfilePreview.build(account),
            includeSpaceForAvatarLine ? aCreateElement("div", "avatar-line") : "",
        ]).then(AvatarWithPreview.createNew);
    }
    static toggleProfilePreview(e) {
        e.preventDefault();
        let profilePreview = e.target.parentNode?.nextSibling;
        profilePreview.classList.toggle("preview-visible");
    }
    static createNew(elements) {
        return new AvatarWithPreview(sheet, elements);
    }
}
//# sourceMappingURL=avatarWithPreview.js.map