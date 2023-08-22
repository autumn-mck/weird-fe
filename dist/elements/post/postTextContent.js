import { formatInEmojis, parseHTML, pathToAccount } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import * as consts from "../../consts.js";
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
    static async build(content, emojis, mentions) {
        return formatInEmojis(content, emojis)
            .then(parseHTML)
            .then((elements) => PostTextContent.addOnClickListenersToMentions(elements, mentions))
            .then(PostTextContent.createNew);
    }
    static addOnClickListenersToMentions(elements, mentions) {
        elements.forEach((element) => PostTextContent.walk(element, mentions));
        return elements;
    }
    static walk(node, mentions) {
        const children = node.childNodes;
        children.forEach((child) => PostTextContent.walk(child, mentions));
        PostTextContent.interceptUrlMentions(node, mentions);
    }
    static interceptUrlMentions(node, mentions) {
        if (!(node instanceof HTMLAnchorElement) || node.className !== "u-url mention")
            return;
        const mention = mentions.find((mention) => mention.url === node.href);
        if (!mention)
            return;
        node.title = mention.acct;
        node.dataset["accountId"] = mention.id;
        node.addEventListener("click", this.redirectToAccountPageOnClick);
    }
    static redirectToAccountPageOnClick(e) {
        e.preventDefault();
        let targetElement;
        if (e.target instanceof HTMLSpanElement)
            targetElement = e.target.parentElement;
        else
            targetElement = e.target;
        if (!targetElement)
            return;
        history.pushState(null, "", pathToAccount(targetElement.dataset["accountId"]));
        window.dispatchEvent(new Event("popstate"));
    }
    static createNew(elements) {
        return new PostTextContent(sheet, elements);
    }
}
//# sourceMappingURL=postTextContent.js.map