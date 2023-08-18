import { getIconForVisibility } from "../../assets.js";
import { addClasses, putChildrenInNewCurryContainer, setAnchorHref, setInnerText, setTitle } from "../../curryingUtils.js";
import { aCreateElement, relativeTime } from "../../utils.js";
import UsernameAcct from "../account/usernameAcct.js";
import AvatarWithPreview from "./avatarWithPreview.js";
import * as consts from "../../consts.js";
import DisplayName from "../account/displayName.js";
import CustomHTMLElement from "../customElement.js";
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
export default class PosterInfo extends CustomHTMLElement {
    static async build(post, shouldIncludeAvatar) {
        return Promise.all([
            shouldIncludeAvatar ? AvatarWithPreview.build(post.account) : "",
            Promise.all([PosterInfo.constructLeftCol(post.account), PosterInfo.constructRightCol(post)]).then(putChildrenInNewCurryContainer("poster-text-info")),
        ]).then(PosterInfo.createNew);
    }
    static async constructLeftCol(account) {
        return Promise.all([DisplayName.build(account.display_name, account.emojis), UsernameAcct.build(account)]).then(putChildrenInNewCurryContainer("poster-info-column-1"));
    }
    static async constructRightCol(post) {
        return Promise.all([
            aCreateElement("a", "post-time")
                .then(setInnerText(relativeTime(new Date(post.created_at))))
                .then(setAnchorHref(`/${consts.statusesPath}/${post.id}`)),
            getIconForVisibility(post.visibility).then(addClasses("post-visibility")).then(setTitle(post.visibility)),
        ]).then(putChildrenInNewCurryContainer("poster-info-column-2"));
    }
    static createNew(elements) {
        return new PosterInfo(sheet, elements);
    }
}
//# sourceMappingURL=posterInfo.js.map