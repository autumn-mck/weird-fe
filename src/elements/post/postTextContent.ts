import { CustomEmoji } from "../../models/customEmoji";
import { formatInEmojis, parseHTML } from "../../utils.js";
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
	static async build(content: string, emojis: CustomEmoji[]): Promise<CustomHTMLElement> {
		return formatInEmojis(content, emojis).then(parseHTML).then(this.createNew);
	}

	protected static createNew(elements: (Node | string)[]): CustomHTMLElement {
		return new PostTextContent(sheet, elements);
	}
}
