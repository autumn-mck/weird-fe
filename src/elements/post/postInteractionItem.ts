import { Icon } from "../../models/icons";
import CustomHTMLElement from "../customElement";
import { newElement, setInnerText } from "../../domUtils";

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

.display-none {
	display: none;
}
`);

export default class PostInteractionItem extends CustomHTMLElement {
	constructor(icon: Icon) {
		let elements = {
			hiddenCheckbox: newElement({
				element: "input",
				type: "checkbox",
				className: "hidden-checkbox",
				id: "checkbox",
			}),

			iconLabel: newElement({
				element: "label",
				className: `icon icon-${icon} ${PostInteractionItem.addClassIfSpinny(icon)}`,
				htmlFor: "checkbox",
				children: [ newElement({element: "custom-icon", "icon": icon}) ],
			}),

			interactionCount: newElement({ element: "span", className: "interaction-text  display-none" }),
		};

		super(sheet, elements);
	}

	public setData(count: number) {
		this.update("interactionCount", count, setInnerText);
		this.toggleClassOnElement("interactionCount", "display-none", count === undefined);
	}

	private static addClassIfSpinny(icon: Icon) {
		switch (icon) {
			case Icon.Reply:
			case Icon.Boost:
			case Icon.Favourite:
			case Icon.AddReaction:
				return "spinny-icon";
			default:
				return "";
		}
	}
}
