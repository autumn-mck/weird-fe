import { CustomEmoji } from "../../models/customEmoji";
import { formatInEmojis } from "../../utils";
import CustomHTMLElement from "../customElement";
import * as consts from "../../consts";
import { newElement } from "../../domUtils";
import StandardPost from "./standardPost";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
span {
	overflow-wrap: anywhere;
	hyphens: auto;
}

button {
	background: none;
	border: var(--accent) 1px solid;
	border-radius: 8px;
	color: var(--text);
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
}

${consts.emojiCSS}
`);

export class PostContentWarning extends CustomHTMLElement {
	constructor() {
		let elements = {
			content: newElement({ element: "span" }),
			showContent: newElement({ element: "button", innerText: "Show content" }),
		};

		let layout = [elements.content, " ", elements.showContent];

		super(sheet, elements, layout);
	}

	public setData(content: string, emojis: CustomEmoji[], parent: StandardPost) {
		this.replaceChildrenOfElement("content", content, formatInEmojis, emojis);
		this.update("showContent", parent, PostContentWarning.setOnClick);
	}

	private static setOnClick(button: HTMLElement, parent: StandardPost) {
		button.onclick = () => {
			parent.classList.toggle("content-hidden");
		};
	}
}
