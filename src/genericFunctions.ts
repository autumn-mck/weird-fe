export function relativeTime(date: Date) {
	const formatter = new Intl.RelativeTimeFormat("en", {
		numeric: "always",
		style: "long",
	});

	// display as eg. "2 hours ago", or "5 minutes ago", depending on which scale works best
	// if seconds is the correct scale
	if (date.getTime() > Date.now() - 1000 * 60) {
		return formatter.format(Math.round((date.getTime() - Date.now()) / 1000), "second");
	}
	// if minutes is the correct scale
	if (date.getTime() > Date.now() - 1000 * 60 * 60) {
		return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60), "minute");
	}
	// if hours is the correct scale
	if (date.getTime() > Date.now() - 1000 * 60 * 60 * 24) {
		return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60), "hour");
	}
	// if days is the correct scale
	if (date.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7) {
		return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24), "day");
	}
	// if weeks is the correct scale
	if (date.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 30) {
		return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 7), "week");
	}
	// if months is the correct scale
	if (date.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 365) {
		return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 30), "month");
	}
	// if years is the correct scale
	else {
		return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 365), "year");
	}
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
