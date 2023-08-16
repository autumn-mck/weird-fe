import { createElement } from "./utils.js";
export function putChildrenInCurryContainer(container) {
    return function (children) {
        container.append(...children);
        return container;
    };
}
export function putChildInCurryContainer(container) {
    return function (child) {
        if (child)
            container.appendChild(child);
        return container;
    };
}
export function putChildInNewCurryContainer(containerClass, elementType = "div") {
    return function (child) {
        let container = createElement(elementType, containerClass);
        container.appendChild(child);
        return container;
    };
}
export function putChildrenInShadowDOM(shadow) {
    return function (children) {
        shadow.append(...children);
        return shadow;
    };
}
export function putChildInShadowDOM(shadow) {
    return function (child) {
        shadow.appendChild(child);
        return shadow;
    };
}
export function putChildrenInNewCurryContainer(containerClass) {
    return function (children) {
        let container = createElement("div", containerClass);
        container.append(...children);
        return container;
    };
}
export function setInnerHTML(html) {
    return function (element) {
        element.innerHTML = html;
        return element;
    };
}
export function setInnerText(text) {
    return function (element) {
        element.innerText = text;
        return element;
    };
}
export function addClasses(classes) {
    return function (element) {
        element.className += " " + classes;
        return element;
    };
}
export function setTitle(title) {
    return function (element) {
        element.title = title;
        return element;
    };
}
export function setId(id) {
    return function (element) {
        element.id = id;
        return element;
    };
}
export function setImgSrc(src) {
    return function (img) {
        img.src = src;
        return img;
    };
}
export function setAnchorHref(href) {
    return function (a) {
        a.href = href;
        return a;
    };
}
export function setInputType(type) {
    return function (input) {
        input.type = type;
        return input;
    };
}
export function setLabelHtmlFor(htmlFor) {
    return function (label) {
        label.htmlFor = htmlFor;
        return label;
    };
}
//# sourceMappingURL=curryingUtils.js.map