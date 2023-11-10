export default abstract class CustomHTMLElement extends HTMLElement {
	public static tagName: string;
	protected static baseToClone: CustomHTMLElement | undefined;
	protected elements: { [key: string]: HTMLElement | string } = {};
	protected values: { [key: string]: any } = {};
	static observedAttributes?: string[];

	constructor(
		css: CSSStyleSheet = new CSSStyleSheet(),
		elements: { [key: string]: HTMLElement | string } = {},
		layout: (HTMLElement | string)[] | undefined = undefined
	) {
		super();

		this.elements = elements;

		const shadow = this.attachShadow({ mode: "open" });
		shadow.adoptedStyleSheets = [css];

		shadow.append(...(layout || Object.values(elements)));
	}

	public abstract setData(...data: any[]): void;

	protected appendElements(...elements: (Node | string)[]) {
		if (!this.shadowRoot) return;
		this.shadowRoot.innerHTML = "";
		this.shadowRoot.append(...elements);
	}

	public addClasses(classes: string) {
		this.className += " " + classes;
		return this;
	}

	protected update(element: string, newValue: any, update: (element: HTMLElement, value: any) => void) {
		if (this.values[element] === newValue) return;
		if (this.values[element] === undefined && newValue === null) return;

		this.values[element] = newValue;
		const maybeElement = this.elements[element];
		if (maybeElement) update(maybeElement as HTMLElement, newValue); // assuming all strings are empty
	}

	protected set(element: string, ...data: any[]) {
		(this.elements[element] as CustomHTMLElement).setData(...data);
	}

	protected replaceAll(valueName: string, newValue: any, replace: (...args: any[]) => ChildNode[], ...args: any[]) {
		if (this.values[valueName] !== newValue) {
			this.values[valueName] = newValue;
			this.shadowRoot?.replaceChildren(...replace(newValue, ...args));
		}
	}

	protected replaceChildrenOfElement(
		elementName: string,
		newValue: any,
		replace: (...args: any[]) => ChildNode[],
		...args: any[]
	) {
		if (this.values[elementName] !== newValue) {
			this.values[elementName] = newValue;
			(this.elements[elementName] as HTMLElement).replaceChildren(...replace(newValue, ...args));
		}
	}

	protected toggleClassOnElement(elementName: string, className: string, newValue: boolean) {
		if (this.values[`${elementName}-${className}`] !== newValue) {
			this.values[elementName] = newValue;
			(this.elements[elementName] as HTMLElement).classList.toggle(className, newValue);
		}
	}
}
