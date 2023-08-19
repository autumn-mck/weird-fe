import { addClasses } from "../../curryingUtils.js";
import { Icon } from "../../models/icons.js";
import { Status } from "../../models/status";
import CustomHTMLElement from "../customElement.js";
import InteractionItem from "./postInteractionItem.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	justify-content: space-between;
}

:host(.extra-margin) {
	margin-left: var(--post-pfp-size);
}
`);

export default class InteractionsRow extends HTMLElement {
	static async build(post: Status, inludeSpaceForAvatarLine: boolean): Promise<CustomHTMLElement> {
		return Promise.all([
			InteractionItem.build(Icon.Reply, post.id, String(post.replies_count)),
			InteractionItem.build(Icon.Boost, post.id, String(post.reblogs_count)),
			InteractionItem.build(Icon.Quote, post.id),
			InteractionItem.build(Icon.Favourite, post.id, String(post.favourites_count)),
			InteractionItem.build(Icon.AddReaction, post.id),
			InteractionItem.build(Icon.More, post.id),
		])
			.then(InteractionsRow.createNew)
			.then((row) => (!inludeSpaceForAvatarLine ? addClasses("extra-margin")(row) : row));
	}

	protected static createNew(elements: (HTMLElement | string)[]): CustomHTMLElement {
		return new InteractionItem(sheet, elements);
	}
}