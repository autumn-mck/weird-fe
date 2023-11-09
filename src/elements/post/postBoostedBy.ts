import Status from "../../models/status";
import { Icon } from "../../models/icons";
import AccountDisplayName from "../account/accountDisplayName";
import CustomHTMLElement from "../customElement";
import { addClasses, newElement, setInnerTextAsRelativeTime } from "../../domUtils";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	color: var(--repeated);
	display: flex;
	padding-bottom: 0.5rem;
	padding-left: calc(var(--post-pfp-size) + 0.5rem - 24px);
	white-space: pre-line;
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
	white-space: pre;
}

display-name {
	--text-color: var(--repeated);
}
`);

export default class PostBoostedBy extends CustomHTMLElement {
	protected static override baseToClone: PostBoostedBy;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as PostBoostedBy;
	}

	constructor() {
		let elements = {
			displayName: new AccountDisplayName(),
			boostedTime: newElement({ element: "span", className: "boosted-time" }),
		};

		let textSpan = newElement({ element: "span", className: "boosted-by", innerText: "Boosted by " });

		let layout = [PostBoostedBy.getIcon(), textSpan, elements.displayName, elements.boostedTime];

		super(sheet, elements, layout);
	}

	public setData(post: Status) {
		this.set("displayName", post.account.display_name, post.account.emojis);
		this.update("boostedTime", post.created_at, setInnerTextAsRelativeTime);
	}

	private static getIcon(): HTMLElement {
		let icon = newElement({ element: "custom-icon", icon: Icon.Boost });
		addClasses(icon, "boosted-by-ico");
		return icon;
	}
}
