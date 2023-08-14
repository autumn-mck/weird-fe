export function relativeTime(date) {
    const formatter = new Intl.RelativeTimeFormat("en", {
        numeric: "always",
        style: "long",
    });
    const now = Date.now();
    // todo handle future dates? because times can be out of sync or other instances can deliberately return future dates
    // display as eg. "2 hours ago", or "5 minutes ago", depending on which scale works best
    // why do something overly complicated when this works well enough
    // seconds
    if (date.getTime() > now - 1000 * 60) {
        return formatter.format(Math.round((date.getTime() - Date.now()) / 1000), "second");
    }
    // minutes
    else if (date.getTime() > now - 1000 * 60 * 60) {
        return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60), "minute");
    }
    // hours
    else if (date.getTime() > now - 1000 * 60 * 60 * 24) {
        return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60), "hour");
    }
    // days
    else if (date.getTime() > now - 1000 * 60 * 60 * 24 * 7) {
        return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24), "day");
    }
    // weeks
    else if (date.getTime() > now - 1000 * 60 * 60 * 24 * 30) {
        return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 7), "week");
    }
    // months
    else if (date.getTime() > now - 1000 * 60 * 60 * 24 * 365) {
        return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 30), "month");
    }
    // else just assume years
    else {
        return formatter.format(Math.round((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 365), "year");
    }
}
export async function fetchJsonAsync(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
export async function fetchAsync(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}
export function escapeHTML(string) {
    const lookup = {
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
        "<": "&lt;",
        ">": "&gt;",
    };
    return string.replace(/[&"'<>]/g, (c) => lookup[c]);
}
export function formatInEmojis(string, emojis) {
    // i would have assumed i'd need to check to make sure emojis aren't inserted into preformatted elements or whatever,
    // but akkoma-fe seems to just do it, and since that's easier i'll just do that too
    for (const emoji of emojis) {
        const emojiHtml = escapeHTML(emoji.shortcode);
        const emojiImg = `<img src="${emoji.url}" alt="${emojiHtml}" title=":${emojiHtml}:" class="emoji" />`;
        string = string.replaceAll(`:${emojiHtml}:`, emojiImg);
    }
    return string;
}
export function getAccountDisplayNameHTML(account) {
    let displayNameHtml = escapeHTML(account.display_name);
    return formatInEmojis(displayNameHtml, account.emojis);
}
export function createElement(elementType, classes) {
    const element = document.createElement(elementType);
    element.className = classes;
    return element;
}
export function putChildrenInContainer(children, containerClass) {
    let childrenContainer = createElement("div", containerClass);
    childrenContainer.append(...children);
    return childrenContainer;
}
//# sourceMappingURL=utils.js.map