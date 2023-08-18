export default abstract class CustomHTMLElement extends HTMLElement {
	constructor(css: CSSStyleSheet, children: (Node | string)[]) {
		super();

		const shadow = this.attachShadow({ mode: "closed" });
		shadow.adoptedStyleSheets = [css];

		shadow.append(...children);
	}

	// Typescript doesn't currently support static abstract methods
	// so just kinda pretend they're there i guess, everything extending this class should follow this pattern
	//static abstract build(...data: any[]): Promise<CustomHTMLElement>;
	//protected static abstract createNew(...data: any[]): CustomHTMLElement;
}
