import { createElement } from "./utils";

export function putChildrenInCurryContainer(container: HTMLElement) {
	return function (children: (HTMLElement | string)[]) {
		container.append(...children);
		return container;
	};
}

export function putChildInCurryContainer(container: HTMLElement) {
	return function (child: HTMLElement | null) {
		if (child) container.appendChild(child);
		return container;
	};
}

export function putChildInNewCurryContainer(containerClass: string, elementType = "div") {
	return function (child: Node) {
		const container: HTMLElement = createElement(elementType, containerClass);
		container.appendChild(child);
		return container;
	};
}

export function putChildrenInNewCurryContainer(containerClass: string, elementType = "div") {
	return function (children: (Node | string)[]) {
		const container: HTMLElement = createElement(elementType, containerClass);
		container.append(...children);
		return container;
	};
}

export function setInnerText(text: string) {
	return function (element: HTMLElement) {
		element.innerText = text;
		return element;
	};
}

export function addClasses(classes: string) {
	return function (element: HTMLElement) {
		element.className += " " + classes;
		return element;
	};
}

export function setAnchorHref(href: string) {
	return function (a: HTMLElement) {
		(a as HTMLAnchorElement).href = href;
		return a;
	};
}
