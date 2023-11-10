import { Icon } from "../../models/icons";
import Status from "../../models/status";
import CustomHTMLElement from "../customElement";
import PostInteractionItem from "./postInteractionItem";

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

export default class PostInteractionsRow extends CustomHTMLElement {
	public static override tagName = "post-interactions-row";
	protected static override baseToClone: PostInteractionsRow;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as PostInteractionsRow;
	}

	constructor() {
		let elements = {
			[Icon.Reply]: new PostInteractionItem(Icon.Reply),
			[Icon.Boost]: new PostInteractionItem(Icon.Boost),
			[Icon.Quote]: new PostInteractionItem(Icon.Quote),
			[Icon.Favourite]: new PostInteractionItem(Icon.Favourite),
			[Icon.AddReaction]: new PostInteractionItem(Icon.AddReaction),
			[Icon.More]: new PostInteractionItem(Icon.More),
		};

		super(sheet, elements);
	}

	public setData(post: Status) {
		this.set(Icon.Reply, post.replies_count);
		this.set(Icon.Boost, post.reblogs_count);
		this.set(Icon.Favourite, post.favourites_count);
	}
}
