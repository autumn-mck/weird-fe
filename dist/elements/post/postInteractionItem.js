import { getIcon } from "../../assets.js";
import { addClasses, putChildInNewCurryContainer, setId, setInnerText, setInputType, setLabelHtmlFor, } from "../../curryingUtils.js";
import { aCreateElement, clone } from "../../utils.js";
import { Icon } from "../../models/icons.js";
import CustomHTMLElement from "../customElement.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	align-items: center;
}

.icon {
	box-sizing: content-box;
	height: 24px;
	width: 24px;
	padding: 0.25rem;
	transition: fill 0.2s ease-in, transform 0.7s ease-in-out;
	fill: var(--post-interaction);
	cursor: pointer;
}

.interaction-text {
	margin-left: 0.25rem;
}

.svg {
	height: 24px;
	width: 24px;
}

.icon-${Icon.Favourite} {
	transform-origin: 50% 54%;
}

.icon:hover {
	fill: var(--accent);
}

.hidden-checkbox {
	display: none;
}

.hidden-checkbox:checked + .icon-${Icon.Reply},
.hidden-checkbox:checked + .icon-${Icon.Quote},
.hidden-checkbox:checked + .icon-${Icon.AddReaction} {
	fill: var(--interacted);
}

.hidden-checkbox:checked + .icon-${Icon.Boost} {
	fill: var(--repeated);
}

.hidden-checkbox:checked + .icon-${Icon.Favourite} {
	fill: var(--favourited);
}

.spinny-icon:hover,
.hidden-checkbox:checked + .spinny-icon {
	transform: rotate(360deg);
}
`);
export default class InteractionItem extends CustomHTMLElement {
    static async build(icon, postId, text) {
        return Promise.all([
            aCreateElement("input", "hidden-checkbox").then(setInputType("checkbox")).then(setId(postId)),
            getIcon(icon)
                .then(clone)
                .then(putChildInNewCurryContainer(`icon icon-${icon}`, "label"))
                .then(setLabelHtmlFor(postId))
                .then(addClasses(InteractionItem.shouldBeSpinny(icon) ? "spinny-icon" : "")),
            text ? aCreateElement("span", "interaction-text").then(setInnerText(text)) : "",
        ]).then(InteractionItem.createNew);
    }
    static createNew(elements) {
        return new InteractionItem(sheet, elements);
    }
    static shouldBeSpinny(icon) {
        switch (icon) {
            case Icon.Reply:
            case Icon.Boost:
            case Icon.Favourite:
            case Icon.AddReaction:
                return true;
            default:
                return false;
        }
    }
}
//# sourceMappingURL=postInteractionItem.js.map