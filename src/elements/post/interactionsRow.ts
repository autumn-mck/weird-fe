import { putChildrenInShadowDOM } from "../../curryingUtils.js";
import { Icon } from "../../models/icons.js";
import { Status } from "../../models/status";
import InteractionItem from "./postInteractionItem.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	justify-content: space-between;
	margin-top: 0.5rem;
	margin-bottom: 0.8rem;
	margin-left: calc(var(--post-pfp-size) + 1rem);
	margin-right: calc(var(--post-pfp-size) + 1rem);
}
`);

export default class InteractionsRow extends HTMLElement {
	constructor(post: Status) {
		super();

		const shadow = this.attachShadow({ mode: "closed" });
		shadow.adoptedStyleSheets = [sheet];

		Promise.all([
			new InteractionItem(Icon.Reply, post.id, String(post.replies_count)),
			new InteractionItem(Icon.Boost, post.id, String(post.reblogs_count)),
			new InteractionItem(Icon.Quote, post.id),
			new InteractionItem(Icon.Favourite, post.id, String(post.favourites_count)),
			new InteractionItem(Icon.AddReaction, post.id),
			new InteractionItem(Icon.More, post.id),
		]).then(putChildrenInShadowDOM(shadow));
	}
}
