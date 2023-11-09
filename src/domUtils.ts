import CustomHTMLElement from "./elements/customElement";
import { createElement, relativeTime } from "./utils";

class ElementData {
	element!: string;
	children?: (HTMLElement | string)[];
	className?: string;
	[key: string]: any;
}

export function newElement(elementData: ElementData) {
	const element = document.createElement(elementData.element);

	for (const key in elementData) {
		if (key === "element") continue;

		if (key === "children" && elementData["children"]) {
			element.append(...elementData["children"]);
			continue;
		}

		if (
			element instanceof CustomHTMLElement &&
			(<typeof CustomHTMLElement>element.constructor).observedAttributes?.includes(key)
		) {
			element.setAttribute(key, elementData[key]);
		} else {
			(element as any)[key] = elementData[key];
		}
	}

	return element;
}

export function setInnerText(element: HTMLElement, text: string) {
	element.innerText = text;
}

export function setInnerTextAsRelativeTime(element: HTMLElement, time: string) {
	setInnerText(element, relativeTime(new Date(time)));
}

export function putChildrenInContainer(container: HTMLElement, ...children: (HTMLElement | "")[]) {
	container.append(...children);
}

export function addEventListener(element: HTMLElement, event: string, listener: (e: Event) => void) {
	element.addEventListener(event, listener);
}

export function setAnchorHref(element: HTMLElement, href: string) {
	(element as HTMLAnchorElement).href = href;
}

export function setSrc(element: HTMLElement, src: string) {
	(element as HTMLImageElement).src = src;
}

export function setTitle(element: HTMLElement, title: string) {
	element.title = title;
}

export function newContainerFor(type: string, classes: string, ...children: (HTMLElement | "")[]) {
	const container = createElement(type, classes);
	container.append(...children);
	return container;
}

export function addClasses(element: HTMLElement, classes: string) {
	element.className += " " + classes;
}
