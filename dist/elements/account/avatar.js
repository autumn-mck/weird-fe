import { setImgSrc } from "../../curryingUtils.js";
import { aCreateElement } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	z-index: 1;
}

.avatar {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	border-radius: 8px;
}

:host(.with-border) .avatar {
	border: 4px solid var(--background-translucent);
}
`);
export default class Avatar extends CustomHTMLElement {
    static async build(avatarSrc) {
        return aCreateElement("img", "avatar").then(setImgSrc(avatarSrc)).then(Avatar.createNew);
    }
    static createNew(element) {
        return new Avatar(sheet, [element]);
    }
}
//# sourceMappingURL=avatar.js.map