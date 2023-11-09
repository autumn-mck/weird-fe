import Status from "../../models/status";
import CustomHTMLElement from "../customElement";
import PostBoostedBy from "./postBoostedBy";
import StandardPost from "./standardPost";
import * as consts from "../../consts";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	${consts.postCSS}
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
`);

export default class Boost extends CustomHTMLElement {
	protected static override baseToClone: Boost;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as Boost;
	}

	constructor() {
		let elements = {
			boostedBy: new PostBoostedBy(),
			post: new StandardPost().addClasses("boosted-post"),
		};

		super(sheet, elements);
	}

	public setData(post: Status) {
		if (!post.reblog) throw new Error("Post is not boosted");
		this.id = post.id;

		this.set("boostedBy", post);
		this.set("post", post.reblog);
	}
}
