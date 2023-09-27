import { createElement } from "../../utils";
import CustomHTMLElement from "../customElement";
import * as consts from "../../consts";
import { newElement, setInnerText, setSrc, setTitle } from "../../domUtils";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	align-items: center;
	padding: 0.5rem;
	gap: 0.5rem;
	border-radius: 8px;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
}

${consts.emojiCSS}

:host(:hover) {
	border-color: var(--accent);
}

.emoji:hover {
	transform: scale(1);
}

:host(:hover) .emoji {
	transform: scale(1.5);
}
`);

enum reactionType {
	emojiReaction,
	customReaction,
}

export default class EmojiReaction extends CustomHTMLElement {
	protected static override baseToClone: EmojiReaction;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as EmojiReaction;
	}

	constructor() {
		let elements = {
			emoji: newElement({ element: "span", className: "emoji" }),
			count: newElement({ element: "span", className: "count" }),
		};
		super(sheet, elements);
	}

	public setData(emojiReaction: any) {
		let newReactionType = EmojiReaction.getReactionType(emojiReaction);
		if (this.values["reactionType"] !== newReactionType) {
			this.values["reactionType"] = newReactionType;
			(this.elements["emoji"]! as HTMLElement).replaceChildren(EmojiReaction.createEmojiElement(emojiReaction));
		} else if (newReactionType === reactionType.customReaction) {
			setSrc(this.elements["emoji"]! as HTMLImageElement, emojiReaction.url);
		} else {
			setInnerText(this.elements["emoji"]! as HTMLSpanElement, emojiReaction.name);
		}

		this.update("count", emojiReaction.count, setInnerText);
	}

	private static getReactionType(emojiReaction: any): reactionType {
		if (emojiReaction.url) {
			return reactionType.customReaction;
		} else {
			return reactionType.emojiReaction;
		}
	}

	private static createEmojiElement(emojiReaction: any) {
		if (emojiReaction.url) {
			let img = createElement("img") as HTMLImageElement;
			setSrc(img, emojiReaction.url);
			setTitle(img, `:${emojiReaction.name}:`);
			return img;
		} else {
			let span = createElement("span") as HTMLSpanElement;
			setInnerText(span, emojiReaction.name);
			return span;
		}
	}
}
