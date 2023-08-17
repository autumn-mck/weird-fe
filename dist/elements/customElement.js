export default class CustomHTMLElement extends HTMLElement {
    constructor(css, children) {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        shadow.adoptedStyleSheets = [css];
        shadow.append(...children);
    }
}
//# sourceMappingURL=customElement.js.map