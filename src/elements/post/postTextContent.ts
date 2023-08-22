import { CustomEmoji } from "../../models/customEmoji";
import { formatInEmojis, parseHTML } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import * as consts from "../../consts.js";
import { StatusMention } from "../../models/status";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	overflow-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

pre {
	white-space: pre-wrap;
}

p {
	margin: 0;
}

a {
	color: var(--accent);
}

/* akkoma sends the inline quote text (RE: <Link to quoted post>) in a span with this class */
.quote-inline {
	display: none;
}

/* but on quoted posts that are also quoting something, probably a good idea to show that it is */
/* TODO get this bit to work again */
.post-quote .quote-inline {
	display: inline;
}

${consts.emojiCSS}
`);

export default class PostTextContent extends CustomHTMLElement {
	static async build(content: string, emojis: CustomEmoji[], mentions: StatusMention[]): Promise<CustomHTMLElement> {
		return formatInEmojis(content, emojis)
			.then(parseHTML)
			.then((elements) => PostTextContent.addOnClickListenersToMentions(elements, mentions))
			.then(PostTextContent.createNew);
	}

	private static addOnClickListenersToMentions(elements: ChildNode[], mentions: StatusMention[]) {
		elements.forEach((element) => PostTextContent.walk(element, mentions));

		return elements;
	}

	private static walk(node: Node, mentions: StatusMention[]) {
		const children = node.childNodes;
		children.forEach((child) => PostTextContent.walk(child, mentions));
		PostTextContent.interceptUrlMentions(node, mentions);
	}

	private static interceptUrlMentions(node: Node, mentions: StatusMention[]) {
		if (!(node instanceof HTMLAnchorElement)) return;

		const mention = mentions.find((mention) => mention.url === node.href);
		if (!mention) return;

		node.title = mention.acct;

		node.dataset["accountId"] = mention.id;

		node.addEventListener("click", this.redirectToAccountPageOnClick);
	}

	private static redirectToAccountPageOnClick(e: MouseEvent) {
		e.preventDefault();

		let targetElement;
		if (e.target instanceof HTMLSpanElement) targetElement = e.target.parentElement;
		else targetElement = e.target as HTMLAnchorElement;

		if (!targetElement) return;

		history.pushState(null, "", `/${consts.accountsPath}/${targetElement.dataset["accountId"]}`);
		window.dispatchEvent(new Event("popstate"));
	}

	protected static createNew(elements: (Node | string)[]): CustomHTMLElement {
		return new PostTextContent(sheet, elements);
	}
}
