import { getIcon } from "../../assets.js";
import { addClasses, putChildrenInShadowDOM, setInnerText } from "../../curryingUtils.js";
import { aCreateElement, clone, relativeTime } from "../../utils.js";
import { Icon } from "../../models/icons.js";
import DisplayName from "../account/displayName.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	color: var(--repeated);
	display: flex;
	padding-bottom: 0.5rem;
	padding-left: calc(var(--post-pfp-size) + 0.5rem - 24px);
}

p {
	margin: 0;
}

.boosted-by-ico {
	margin-right: 0.5rem;
	fill: var(--repeated);
	height: 24px;
}

.boosted-time {
	text-align: right;
	display: inline-block;
	width: auto;
	margin-left: auto;
}

.boosted-by {
	margin-right: 0.25rem;
}

display-name {
	--text-color: var(--repeated);
}
`);
export default class BoostedBy extends HTMLElement {
    constructor(post) {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        shadow.adoptedStyleSheets = [sheet];
        Promise.all([
            getIcon(Icon.Boost).then(clone).then(addClasses("boosted-by-ico")),
            aCreateElement("p", "boosted-by").then(setInnerText("Boosted by")),
            new DisplayName(post.account),
            aCreateElement("p", "boosted-time").then(setInnerText(relativeTime(new Date(post.created_at)))),
        ]).then(putChildrenInShadowDOM(shadow));
    }
}
//# sourceMappingURL=boostedBy.js.map