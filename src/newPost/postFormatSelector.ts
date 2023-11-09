import CustomHTMLElement from "../elements/customElement";
import { newElement } from "../domUtils";
import * as consts from "../consts";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
${consts.selectCss}
`);

export default class PostFormatSelector extends CustomHTMLElement {
	constructor() {
		let elements = {
			select: newElement({ element: "select" }),
		};

		const options = ["Text", "Markdown", "MFM", "HTML", "BBCode"];

		options.forEach((option) => {
			const optionElement = newElement({
				element: "option",
				textContent: option,
			});
			elements.select.appendChild(optionElement);
		});

		super(sheet, elements);
	}

	public override setData(...data: any[]): void {}
}
