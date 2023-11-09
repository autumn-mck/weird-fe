import { fetchIcon } from "../assets";
import { Icon } from "../models/icons";
import CustomHTMLElement from "./customElement";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`

`);

export default class CustomIcon extends CustomHTMLElement {
	public static override observedAttributes = ["icon"];

	constructor() {
		super(sheet);
	}

	public override setData(...data: any[]): void {}

	async attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		this.shadowRoot?.append(await fetchIcon(newValue as Icon).then((icon) => icon.cloneNode(true)));
	}
}
