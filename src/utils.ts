import * as consts from "./consts";
import { CustomEmoji } from "./models/customEmoji";

export function relativeTime(date: Date) {
	const now = Date.now();
	const time = date.getTime();

	if (time < now) return `${toRelativeString(time, now)} ago`;
	else return `in ${toRelativeString(time, now)}`;
}

function toRelativeString(time: number, now: number) {
	if (time > now - 1000 * 60) {
		return `${Math.round((now - time) / 1000)}s`;
	} else if (time > now - 1000 * 60 * 60) {
		return `${Math.round((now - time) / 1000 / 60)}m`;
	} else if (time > now - 1000 * 60 * 60 * 24) {
		return `${Math.round((now - time) / 1000 / 60 / 60)}h`;
	} else if (time > now - 1000 * 60 * 60 * 24 * 7) {
		return `${Math.round((now - time) / 1000 / 60 / 60 / 24)}d`;
	} else if (time > now - 1000 * 60 * 60 * 24 * 30) {
		return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 7)}w`;
	} else if (time > now - 1000 * 60 * 60 * 24 * 365) {
		return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 30)}mo`;
	} else {
		return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 365)}y`;
	}
}

export function asReadableDate(date: Date) {
	return date.toLocaleString();
}

export async function fetchJsonAsync(url: string) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export async function fetchAsync(url: string) {
	const response = await fetch(url);
	const data = await response.text();
	return data;
}

export function escapeHTML(string: string) {
	const lookup: any = {
		"&": "&amp;",
		'"': "&quot;",
		"'": "&apos;",
		"<": "&lt;",
		">": "&gt;",
	};
	return string.replace(/[&"'<>]/g, (c) => lookup[c]);
}

export function formatInEmojis(string: string, emojis: CustomEmoji[]) {
	// i would have assumed i'd need to check to make sure emojis aren't inserted into preformatted elements or whatever,
	// but akkoma-fe seems to just do it, and since that's easier i'll just do that too
	for (const emoji of emojis) {
		const emojiHtml = escapeHTML(emoji.shortcode);
		const emojiImg = `<img src="${emoji.url}" alt="${emojiHtml}" title=":${emojiHtml}:" class="emoji" />`;
		string = string.replaceAll(`:${emojiHtml}:`, emojiImg);
	}
	return parseHTML(string);
}

export function createElement(elementType: string, classes = "") {
	const element = document.createElement(elementType);
	if (classes) element.className = classes;

	return element;
}

export async function aCreateElement(elementType: string, classes = "") {
	const element = document.createElement(elementType);
	element.className = classes;

	return element;
}

export function putChildrenInNewContainer(children: HTMLElement[], containerClass: string): HTMLElement {
	const childrenContainer: HTMLElement = createElement("div", containerClass);
	childrenContainer.append(...children);
	return childrenContainer;
}

export function clone(element: HTMLElement) {
	return element.cloneNode(true) as HTMLElement;
}

const parser = new DOMParser();
export function parseHTML(html: string) {
	return Array.from(parser.parseFromString(`${html}`, "text/html").body.childNodes);
}

export function parseSVG(svg: string) {
	return parser.parseFromString(svg, "image/svg+xml").firstChild as Node;
}

export function chunkArray<T>(array: T[], chunkSize: number) {
	return array
		.map((_item, index) => (index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null))
		.filter(Boolean) as T[][];
}

export function pathToAccount(accountId: string) {
	return `/${consts.accountsPath}/${accountId}`;
}
