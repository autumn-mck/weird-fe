import ProfilePreview from "../account/profilePreview.js";
import Avatar from "../account/avatar.js";
import { aCreateElement } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import { putChildInNewCurryContainer, setId, setInputType, setLabelHtmlFor } from "../../curryingUtils.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: var(--post-pfp-size);
}

.avatar-label {
	width: var(--post-pfp-size);
	height: var(--post-pfp-size);
	cursor: pointer;
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

.hidden-checkbox {
	display: none;
}

.hidden-checkbox:checked + profile-preview {
	display: block;
}
`);
export default class AvatarWithPreview extends CustomHTMLElement {
    static async build(account, includeSpaceForAvatarLine = false) {
        return Promise.all([
            Avatar.build(account.avatar)
                .then(putChildInNewCurryContainer("avatar-label", "label"))
                .then(setLabelHtmlFor("hidden-checkbox")),
            aCreateElement("input", "hidden-checkbox").then(setInputType("checkbox")).then(setId("hidden-checkbox")),
            ProfilePreview.build(account),
            includeSpaceForAvatarLine ? aCreateElement("div", "avatar-line") : "",
        ]).then(AvatarWithPreview.createNew);
    }
    static createNew(elements) {
        return new AvatarWithPreview(sheet, elements);
    }
}
//# sourceMappingURL=avatarWithPreview.js.map