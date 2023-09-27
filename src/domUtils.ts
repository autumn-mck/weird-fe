import { createElement, relativeTime } from "./utils";

export function newElement(elementData: any) {
	const element = document.createElement(elementData.element);

	for (const key in elementData) {
		if (key === "element") continue;

		if (key === "children") {
			element.append(...elementData[key]);
			continue;
		}

		element[key] = elementData[key];
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
