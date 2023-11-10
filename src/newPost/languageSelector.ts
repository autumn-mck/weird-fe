import ISO6391 from "iso-639-1";
import CustomHTMLElement from "../elements/customElement";
import { newElement } from "../domUtils";
import * as consts from "../consts";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
select {
	font-family: monospace;
	width: 6ch;
}

${consts.selectCss}
`);

export default class LanguageSelector extends CustomHTMLElement {
	public static override tagName = "language-selector";
	constructor() {
		const elements = {
			select: newElement({ element: "select" }),
		};

		for (const code of ISO6391.getAllCodes()) {
			const name = ISO6391.getNativeName(code);
			const option = newElement({
				element: "option",
				value: code,
				innerText: `${code} - ${name}`,
			});
			elements.select.append(option);
		}

		super(sheet, elements);
	}

	public override setData(): void {}
}
