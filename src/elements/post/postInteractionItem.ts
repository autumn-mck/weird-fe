import { getIcon } from "../../assets.js";
import {
	addClasses,
	putChildInNewCurryContainer,
	putChildrenInShadowDOM,
	setId,
	setInnerText,
	setInputType,
	setLabelHtmlFor,
} from "../../curryingUtils.js";
import { aCreateElement, clone } from "../../utils.js";
import { Icon } from "../../models/icons.js";

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
	margin-right: 0.3rem;
	padding: 0.25rem;
	transition: fill 0.2s ease-in, transform 0.7s ease-in-out;
	fill: var(--post-interaction);
	cursor: pointer;
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

export default class InteractionItem extends HTMLElement {
	constructor(icon: Icon, postId: string, text?: string) {
		super();

		const shadow = this.attachShadow({ mode: "closed" });
		shadow.adoptedStyleSheets = [sheet];

		Promise.all([
			aCreateElement("input", "hidden-checkbox").then(setInputType("checkbox")).then(setId(postId)),

			getIcon(icon)
				.then(clone)
				.then(putChildInNewCurryContainer(`icon icon-${icon}`, "label"))
				.then(setLabelHtmlFor(postId))
				.then(addClasses(shouldBeSpinny(icon) ? "spinny-icon" : "")),

			text ? aCreateElement("p", "interaction-text").then(setInnerText(text)) : "",
		]).then(putChildrenInShadowDOM(shadow));

		function shouldBeSpinny(icon: Icon) {
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
}
