// src/consts.ts
var userSelectedInstance = "0w0.is";
var userSelectedInstanceUrl = "https://" + userSelectedInstance;
var accountsPath = "users";
var statusesPath = "statuses";
var emojiCSS = `
.emoji {
	vertical-align: middle;
	/* stares at https://bugzilla.mozilla.org/show_bug.cgi?id=1310170 */
	height: 1.375rem;
	min-width: 1.375rem;
	transition: transform 0.1s ease-in-out;
	max-width: 100%;
	object-fit: contain;
}

.emoji:hover {
	z-index: 1;
	transform: scale(2);
}
`;
var postCSS = `
	width: calc(100% - 1rem);
	padding: 0.5rem 0.5rem 0.5rem 0.5rem;
	margin: 0.5rem 0.5rem 0 0.5rem;
	background: transparent;
	transition: background 0.2s ease-in-out;
	border-radius: 8px;
`;

// src/utils.ts
function relativeTime(date) {
  const now = Date.now();
  const time = date.getTime();
  if (time < now)
    return `${toRelativeString(time, now)} ago`;
  else
    return `in ${toRelativeString(time, now)}`;
}
var toRelativeString = function(time, now) {
  if (time > now - 60000) {
    return `${Math.round((now - time) / 1000)}s`;
  } else if (time > now - 3600000) {
    return `${Math.round((now - time) / 1000 / 60)}m`;
  } else if (time > now - 86400000) {
    return `${Math.round((now - time) / 1000 / 60 / 60)}h`;
  } else if (time > now - 604800000) {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24)}d`;
  } else if (time > now - 2592000000) {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 7)}w`;
  } else if (time > now - 31536000000) {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 30)}mo`;
  } else {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 365)}y`;
  }
};
function asReadableDate(date) {
  return date.toLocaleString();
}
async function fetchJsonAsync(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
async function fetchAsync(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
function escapeHTML(string) {
  const lookup = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return string.replace(/[&"'<>]/g, (c) => lookup[c]);
}
function formatInEmojis(string, emojis) {
  for (const emoji of emojis) {
    const emojiHtml = escapeHTML(emoji.shortcode);
    const emojiImg = `<img src="${emoji.url}" alt="${emojiHtml}" title=":${emojiHtml}:" class="emoji" />`;
    string = string.replaceAll(`:${emojiHtml}:`, emojiImg);
  }
  return parseHTML(string);
}
function createElement(elementType, classes = "") {
  const element = document.createElement(elementType);
  if (classes)
    element.className = classes;
  return element;
}
async function aCreateElement(elementType, classes = "") {
  const element = document.createElement(elementType);
  element.className = classes;
  return element;
}
function putChildrenInNewContainer(children, containerClass) {
  const childrenContainer = createElement("div", containerClass);
  childrenContainer.append(...children);
  return childrenContainer;
}
function clone(element) {
  return element.cloneNode(true);
}
function parseHTML(html) {
  return Array.from(parser.parseFromString(`${html}`, "text/html").body.childNodes);
}
function parseSVG(svg) {
  return parser.parseFromString(svg, "image/svg+xml").firstChild;
}
function chunkArray(array, chunkSize) {
  return array.map((_item, index) => index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null).filter(Boolean);
}
function pathToAccount(accountId) {
  return `/${accountsPath}/${accountId}`;
}
var parser = new DOMParser;

// src/models/iconSet.ts
var IconSet;
(function(IconSet2) {
  IconSet2["MaterialSymbols"] = "material-symbols";
  IconSet2["Tabler"] = "tabler";
  IconSet2["FontAwesome"] = "font-awesome";
})(IconSet || (IconSet = {}));

// src/models/icons.ts
var Icon;
(function(Icon2) {
  Icon2["VisibilityPublic"] = "visibility-public";
  Icon2["VisibilityUnlisted"] = "visibility-unlisted";
  Icon2["VisibilityFollowers"] = "visibility-followers";
  Icon2["VisibilityLocal"] = "visibility-local";
  Icon2["VisibilityDirect"] = "visibility-direct";
  Icon2["Favourite"] = "favourite-star";
  Icon2["Boost"] = "boost";
  Icon2["Reply"] = "reply";
  Icon2["More"] = "more";
  Icon2["AddReaction"] = "add-reaction";
  Icon2["Quote"] = "quote";
})(Icon || (Icon = {}));

// src/models/visibility.ts
var Visibility;
(function(Visibility2) {
  Visibility2["Public"] = "public";
  Visibility2["Unlisted"] = "unlisted";
  Visibility2["Local"] = "local";
  Visibility2["Followers"] = "private";
  Visibility2["Direct"] = "direct";
})(Visibility || (Visibility = {}));

// src/curryingUtils.ts
function putChildrenInCurryContainer(container) {
  return function(children) {
    container.append(...children);
    return container;
  };
}
function putChildInCurryContainer(container) {
  return function(child) {
    if (child)
      container.appendChild(child);
    return container;
  };
}
function putChildInNewCurryContainer(containerClass, elementType = "div") {
  return function(child) {
    const container = createElement(elementType, containerClass);
    container.appendChild(child);
    return container;
  };
}
function putChildrenInNewCurryContainer(containerClass, elementType = "div") {
  return function(children) {
    const container = createElement(elementType, containerClass);
    container.append(...children);
    return container;
  };
}
function addClasses(classes) {
  return function(element) {
    element.className += " " + classes;
    return element;
  };
}

// src/assets.ts
function getIcon(icon) {
  return icons2[icon];
}
async function fetchIcon(icon) {
  const iconSet2 = IconSet.MaterialSymbols;
  if (!icons2[icon]) {
    icons2[icon] = await fetchAsync(`/assets/svgs/${iconSet2}/${icon}.svg`).then(parseSVG).then(putChildInNewCurryContainer("svg"));
  }
  return icons2[icon];
}
function getIconClone(iconType) {
  return clone(getIcon(iconType));
}
function getIconForVisibility(visibility2) {
  const icon = getIconEnumForVisibility(visibility2);
  return clone(getIcon(icon));
}
var getIconEnumForVisibility = function(visibility2) {
  switch (visibility2) {
    case Visibility.Public:
      return Icon.VisibilityPublic;
    case Visibility.Unlisted:
      return Icon.VisibilityUnlisted;
    case Visibility.Local:
      return Icon.VisibilityLocal;
    case Visibility.Followers:
      return Icon.VisibilityFollowers;
    case Visibility.Direct:
      return Icon.VisibilityDirect;
    default:
      throw new Error("Unknown visibility: " + visibility2);
  }
};
var icons2 = {};

// src/fetchStuff.ts
async function fetchStatusById(id) {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/statuses/" + id);
}
async function fetchContextByPostId(id) {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/statuses/" + id + "/context");
}
async function fetchUserStatuses(id) {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/accounts/" + id + "/statuses");
}
async function fetchFederatedTimeline() {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/timelines/public");
}
async function fetchStatusAndContext(statusId) {
  return Promise.all([fetchStatusById(statusId), fetchContextByPostId(statusId)]);
}

// src/elements/customElement.ts
class CustomHTMLElement extends HTMLElement {
  static baseToClone;
  elements = {};
  values = {};
  constructor(css, elements = {}, layout = undefined) {
    super();
    this.elements = elements;
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [css];
    shadow.append(...layout || Object.values(elements));
  }
  appendElements(...elements) {
    if (!this.shadowRoot)
      return;
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(...elements);
  }
  addClasses(classes) {
    this.className += " " + classes;
    return this;
  }
  update(element, newValue, update) {
    if (this.values[element] === newValue)
      return;
    if (this.values[element] === undefined && newValue === null)
      return;
    this.values[element] = newValue;
    let maybeElement = this.elements[element];
    if (maybeElement)
      update(maybeElement, newValue);
  }
  set(element, ...data) {
    this.elements[element].setData(...data);
  }
  replaceAll(valueName, newValue, replace, ...args) {
    if (this.values[valueName] !== newValue) {
      this.values[valueName] = newValue;
      this.shadowRoot?.replaceChildren(...replace(newValue, ...args));
    }
  }
  replaceChildrenOfElement(elementName, newValue, replace, ...args) {
    if (this.values[elementName] !== newValue) {
      this.values[elementName] = newValue;
      this.elements[elementName].replaceChildren(...replace(newValue, ...args));
    }
  }
  toggleClassOnElement(elementName, className, newValue) {
    if (this.values[`${elementName}-${className}`] !== newValue) {
      this.values[elementName] = newValue;
      this.elements[elementName].classList.toggle(className, newValue);
    }
  }
}

// src/elements/account/accountDisplayName.ts
var sheet = new CSSStyleSheet;
sheet.replaceSync(`
:host {
	font-weight: bold;
	margin: 0;
	display: inline-block;
}

${emojiCSS}
`);

class AccountDisplayName extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    super(sheet);
  }
  setData(displayName, emojis) {
    this.replaceAll("displayName", displayName, formatInEmojis, emojis);
  }
}

// src/domUtils.ts
function newElement(elementData) {
  const element = document.createElement(elementData.element);
  for (const key in elementData) {
    if (key === "element")
      continue;
    if (key === "children") {
      element.append(...elementData[key]);
      continue;
    }
    element[key] = elementData[key];
  }
  return element;
}
function setInnerText(element, text) {
  element.innerText = text;
}
function setInnerTextAsRelativeTime(element, time) {
  setInnerText(element, relativeTime(new Date(time)));
}
function putChildrenInContainer(container, ...children) {
  container.append(...children);
}
function addEventListener2(element, event, listener) {
  element.addEventListener(event, listener);
}
function setAnchorHref(element, href) {
  element.href = href;
}
function setSrc(element, src) {
  element.src = src;
}
function setTitle(element, title) {
  element.title = title;
}
function newContainerFor(type, classes, ...children) {
  const container = createElement(type, classes);
  container.append(...children);
  return container;
}
function addClasses2(element, classes) {
  element.className += " " + classes;
}

// src/elements/post/postBoostedBy.ts
var sheet2 = new CSSStyleSheet;
sheet2.replaceSync(`
:host {
	color: var(--repeated);
	display: flex;
	padding-bottom: 0.5rem;
	padding-left: calc(var(--post-pfp-size) + 0.5rem - 24px);
	white-space: pre-line;
}

.boosted-by-ico {
	margin-right: 0.5rem;
	fill: var(--repeated);
	height: 24px;
}

.boosted-time {
	text-align: right;
	display: inline-block;
	width: auto;
	margin-left: auto;
}

.boosted-by {
	white-space: pre;
}

display-name {
	--text-color: var(--repeated);
}
`);

class PostBoostedBy extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      displayName: new AccountDisplayName,
      boostedTime: newElement({ element: "span", className: "boosted-time" })
    };
    let textSpan = newElement({ element: "span", className: "boosted-by", innerText: "Boosted by " });
    let layout = [PostBoostedBy.getIcon(), textSpan, elements.displayName, elements.boostedTime];
    super(sheet2, elements, layout);
  }
  setData(post) {
    this.set("displayName", post.account.display_name, post.account.emojis);
    this.update("boostedTime", post.created_at, setInnerTextAsRelativeTime);
  }
  static getIcon() {
    let icon = getIconClone(Icon.Boost);
    addClasses2(icon, "boosted-by-ico");
    return icon;
  }
}

// src/elements/account/accountAvatar.ts
var sheet3 = new CSSStyleSheet;
sheet3.replaceSync(`
:host {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	z-index: 1;
}

.avatar {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	border-radius: 8px;
}

:host(.with-border) .avatar {
	border: 4px solid var(--background-translucent);
}
`);

class AccountAvatar extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      avatar: newElement({ element: "img", className: "avatar" })
    };
    super(sheet3, elements);
  }
  setData(avatarSrc) {
    this.update("avatar", avatarSrc, setSrc);
    return this;
  }
}

// src/elements/account/accountBio.ts
var sheet4 = new CSSStyleSheet;
sheet4.replaceSync(`
${emojiCSS}
`);

class AccountBio extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    super(sheet4);
  }
  setData(bio, emojis) {
    this.replaceAll("bio", bio, formatInEmojis, emojis);
  }
}

// src/elements/account/profilePreview.ts
var sheet5 = new CSSStyleSheet;
sheet5.replaceSync(`
:host {
	animation: 0.2s fadeIn;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    filter: opacity(0%);
  }
  100% {
    filter: opacity(100%);
  }
}

a {
	color: var(--accent);
}

.preview {
	margin-top: 0.5rem;
	background: var(--background);
	border-radius: 8px;
	border: 1px solid var(--border);
	box-shadow: 0 0 8px var(--shadow);
	overflow: hidden;
	--post-pfp-size:var(--pfp-size-large)
}

.header {
	height: 6rem;
	width: 100%;
	object-fit: cover;
}

x-avatar {
	position: absolute;
	top: calc(6rem - var(--post-pfp-size) / 2);
	left: 1rem;
}

.content {
	padding: 1rem;
}
`);

class ProfilePreview extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      header: newElement({ element: "img", className: "header" }),
      avatar: AccountAvatar.newClone().addClasses("with-border"),
      displayName: AccountDisplayName.newClone(),
      bio: AccountBio.newClone(),
      createdAt: newElement({ element: "p", className: "created-at" })
    };
    let textContent = newContainerFor("div", "text-content", elements.displayName, elements.bio, elements.createdAt);
    let content = newContainerFor("div", "content", elements.avatar, textContent);
    let layout = [newContainerFor("div", "preview", elements.header, content)];
    super(sheet5, elements, layout);
  }
  setData(account) {
    this.update("header", account.header, setSrc);
    this.set("avatar", account.avatar);
    this.set("displayName", account.display_name, account.emojis);
    this.set("bio", account.note, account.emojis);
    this.update("createdAt", account.created_at, setInnerTextAsRelativeTime);
  }
}

// src/elements/post/avatarWithPreview.ts
var sheet6 = new CSSStyleSheet;
sheet6.replaceSync(`
:host {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: var(--post-pfp-size);
}

.link {
	width: var(--post-pfp-size);
	height: var(--post-pfp-size);
}

.avatar-line {
	display: none;
	background: var(--border);
	width: 4px;
	flex-grow: 1;
	margin-bottom: -1.5rem;
}

.avatar-line.visible {
	display: flex;
}

profile-preview {
	display: none;
	position: absolute;
	top: var(--post-pfp-size);
	z-index: 9;

	width: 50ch;
}

.preview-visible {
	display: block;
}
`);

class AvatarWithPreview extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      avatar: AccountAvatar.newClone(),
      anchor: newElement({ element: "a", className: "link" }),
      profilePreview: ProfilePreview.newClone(),
      avatarLine: newElement({ element: "div", className: "avatar-line" })
    };
    elements.anchor.appendChild(elements.avatar);
    let layout = [elements.anchor, elements.profilePreview, elements.avatarLine];
    super(sheet6, elements, layout);
    addEventListener2(elements.anchor, "click", AvatarWithPreview.toggleProfilePreview(this));
  }
  setData(account, includeSpaceForAvatarLine = false) {
    this.set("avatar", account.avatar);
    this.update("anchor", account.id, AvatarWithPreview.setAnchorToAccount);
    this.set("profilePreview", account);
    this.toggleClassOnElement("avatarLine", "visible", includeSpaceForAvatarLine);
  }
  static setAnchorToAccount(anchor, accountId) {
    setAnchorHref(anchor, pathToAccount(accountId));
  }
  static toggleProfilePreview(elem) {
    return function(e) {
      e.preventDefault();
      elem.elements["profilePreview"].classList.toggle("preview-visible");
    };
  }
}

// src/elements/post/emojiReaction.ts
var sheet7 = new CSSStyleSheet;
sheet7.replaceSync(`
:host {
	display: flex;
	align-items: center;
	padding: 0.5rem;
	gap: 0.5rem;
	border-radius: 8px;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
}

${emojiCSS}

:host(:hover) {
	border-color: var(--accent);
}

.emoji:hover {
	transform: scale(1);
}

:host(:hover) .emoji {
	transform: scale(1.5);
}
`);
var reactionType;
(function(reactionType2) {
  reactionType2[reactionType2["emojiReaction"] = 0] = "emojiReaction";
  reactionType2[reactionType2["customReaction"] = 1] = "customReaction";
})(reactionType || (reactionType = {}));

class EmojiReaction extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      emoji: newElement({ element: "span", className: "emoji" }),
      count: newElement({ element: "span", className: "count" })
    };
    super(sheet7, elements);
  }
  setData(emojiReaction) {
    let newReactionType = EmojiReaction.getReactionType(emojiReaction);
    if (this.values["reactionType"] !== newReactionType) {
      this.values["reactionType"] = newReactionType;
      this.elements["emoji"].replaceChildren(EmojiReaction.createEmojiElement(emojiReaction));
    } else if (newReactionType === reactionType.customReaction) {
      setSrc(this.elements["emoji"], emojiReaction.url);
    } else {
      setInnerText(this.elements["emoji"], emojiReaction.name);
    }
    this.update("count", emojiReaction.count, setInnerText);
  }
  static getReactionType(emojiReaction) {
    if (emojiReaction.url) {
      return reactionType.customReaction;
    } else {
      return reactionType.emojiReaction;
    }
  }
  static createEmojiElement(emojiReaction) {
    if (emojiReaction.url) {
      let img = createElement("img");
      setSrc(img, emojiReaction.url);
      setTitle(img, `:${emojiReaction.name}:`);
      return img;
    } else {
      let span = createElement("span");
      setInnerText(span, emojiReaction.name);
      return span;
    }
  }
}

// src/elements/post/emojiReactions.ts
var sheet8 = new CSSStyleSheet;
sheet8.replaceSync(`
:host {
	margin-top: 0.5rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
	row-gap: 0.5rem;
}
`);

class EmojiReactions extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  currentReactions = {};
  constructor() {
    super(sheet8);
  }
  setData(emojiReactions) {
    if (!emojiReactions) {
      return;
    }
    emojiReactions.forEach((emojiReaction2) => {
      if (this.currentReactions[emojiReaction2.name]) {
        this.currentReactions[emojiReaction2.name].setData(emojiReaction2);
      } else {
        let reaction = new EmojiReaction;
        reaction.setData(emojiReaction2);
        this.currentReactions[emojiReaction2.name] = reaction;
        this.append(reaction);
      }
    });
  }
}

// src/elements/post/postInteractionItem.ts
var sheet9 = new CSSStyleSheet;
sheet9.replaceSync(`
:host {
	display: flex;
	align-items: center;
}

.icon {
	box-sizing: content-box;
	height: 24px;
	width: 24px;
	padding: 0.25rem;
	transition: fill 0.2s ease-in, transform 0.7s ease-in-out;
	fill: var(--post-interaction);
	cursor: pointer;
}

.interaction-text {
	margin-left: 0.25rem;
}

.svg {
	height: 24px;
	width: 24px;
}

.icon-${Icon.Favourite} {
	transform-origin: 50% 54%;
}

.icon:hover {
	fill: var(--accent);
}

.hidden-checkbox {
	display: none;
}

.hidden-checkbox:checked + .icon-${Icon.Reply},
.hidden-checkbox:checked + .icon-${Icon.Quote},
.hidden-checkbox:checked + .icon-${Icon.AddReaction} {
	fill: var(--interacted);
}

.hidden-checkbox:checked + .icon-${Icon.Boost} {
	fill: var(--repeated);
}

.hidden-checkbox:checked + .icon-${Icon.Favourite} {
	fill: var(--favourited);
}

.spinny-icon:hover,
.hidden-checkbox:checked + .spinny-icon {
	transform: rotate(360deg);
}

.display-none {
	display: none;
}
`);

class PostInteractionItem extends CustomHTMLElement {
  constructor(icon) {
    let elements = {
      hiddenCheckbox: newElement({
        element: "input",
        type: "checkbox",
        className: "hidden-checkbox",
        id: "checkbox"
      }),
      iconLabel: newElement({
        element: "label",
        className: `icon icon-${icon} ${PostInteractionItem.addClassIfSpinny(icon)}`,
        htmlFor: "checkbox",
        children: [getIconClone(icon)]
      }),
      interactionCount: newElement({ element: "span", className: "interaction-text  display-none" })
    };
    super(sheet9, elements);
  }
  setData(count) {
    this.update("interactionCount", count, setInnerText);
    this.toggleClassOnElement("interactionCount", "display-none", count === undefined);
  }
  static addClassIfSpinny(icon) {
    switch (icon) {
      case Icon.Reply:
      case Icon.Boost:
      case Icon.Favourite:
      case Icon.AddReaction:
        return "spinny-icon";
      default:
        return "";
    }
  }
}

// src/elements/post/postInteractionsRow.ts
var sheet10 = new CSSStyleSheet;
sheet10.replaceSync(`
:host {
	display: flex;
	justify-content: space-between;
}

:host(.extra-margin) {
	margin-left: var(--post-pfp-size);
}
`);

class PostInteractionsRow extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      [Icon.Reply]: new PostInteractionItem(Icon.Reply),
      [Icon.Boost]: new PostInteractionItem(Icon.Boost),
      [Icon.Quote]: new PostInteractionItem(Icon.Quote),
      [Icon.Favourite]: new PostInteractionItem(Icon.Favourite),
      [Icon.AddReaction]: new PostInteractionItem(Icon.AddReaction),
      [Icon.More]: new PostInteractionItem(Icon.More)
    };
    super(sheet10, elements);
  }
  setData(post) {
    this.set(Icon.Reply, post.replies_count);
    this.set(Icon.Boost, post.reblogs_count);
    this.set(Icon.Favourite, post.favourites_count);
  }
}

// src/elements/post/postMediaItem.ts
var sheet11 = new CSSStyleSheet;
sheet11.replaceSync(`
:host {
	border-radius: 8px;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
	max-width: 100%;
	height: 18rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
	min-width: 20%;
	width: auto;
}

:host(:hover) {
	border-color: var(--border-hover);
}

.media {
	width: auto;
	height: 100%;
	max-width: 100%;
	margin: auto;
	display: block;
	object-fit: contain;
}

.post-media-item.sensitive {
	filter: blur(8px);
}
`);

class PostMediaItem extends CustomHTMLElement {
  element;
  src;
  isSensitive = false;
  constructor() {
    super(sheet11);
  }
  setData(attachment, isSensitive) {
    if (this.src !== attachment.url) {
      this.element = PostMediaItem.constructMediaDomItem(attachment);
      this.shadowRoot?.replaceChildren(this.element);
    }
    if (this.isSensitive !== isSensitive) {
      this.isSensitive = isSensitive;
      this.element?.classList.toggle("sensitive");
    }
  }
  static constructMediaDomItem(attachment) {
    let element;
    switch (attachment.type) {
      case "image":
        element = document.createElement("img");
        break;
      case "gifv":
      case "video":
        element = document.createElement("video");
        break;
      case "audio":
        element = document.createElement("audio");
        break;
      default:
        console.log(attachment);
        throw new Error("Unknown media type: " + attachment.type);
    }
    if (PostMediaItem.shouldEnableMediaControls(attachment.type)) {
      element.controls = true;
    }
    setSrc(element, attachment.url);
    addClasses2(element, "media");
    return element;
  }
  static shouldEnableMediaControls(attachmentType) {
    switch (attachmentType) {
      case "video":
      case "gifv":
      case "audio":
        return true;
      default:
        return false;
    }
  }
}

// src/elements/post/postMediaRow.ts
var sheet12 = new CSSStyleSheet;
sheet12.replaceSync(`
:host {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	width: auto;
	max-width: 100%;
}
`);

class MediaRow extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  mediaItems = [];
  constructor() {
    super(sheet12);
  }
  setData(attachments, isSensitive) {
    attachments.forEach((attachment, index) => {
      let mediaItem = this.mediaItems[index];
      if (!mediaItem) {
        mediaItem = new PostMediaItem;
        this.mediaItems.push(mediaItem);
      }
      mediaItem.setData(attachment, isSensitive);
    });
    this.shadowRoot?.replaceChildren(...this.mediaItems);
  }
}

// src/elements/post/postMedia.ts
var sheet13 = new CSSStyleSheet;
sheet13.replaceSync(`
:host {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
}
`);

class PostMedia extends CustomHTMLElement {
  static maxItemsInRow = 3;
  rows = [];
  constructor() {
    super(sheet13);
  }
  setData(attachments, isSensitive) {
    let chunked = chunkArray(attachments, PostMedia.maxItemsInRow);
    chunked.forEach((chunk, index) => {
      let row = this.rows[index];
      if (!row) {
        row = new MediaRow;
        this.rows.push(row);
        this.appendElements(row);
      }
      row.setData(chunk, isSensitive);
    });
  }
}

// src/elements/post/postTextContent.ts
var sheet14 = new CSSStyleSheet;
sheet14.replaceSync(`
:host {
	overflow-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

pre {
	white-space: pre-wrap;
}

p {
	margin: 0;
}

a {
	color: var(--accent);
}

/* akkoma sends the inline quote text (RE: <Link to quoted post>) in a span with this class */
.quote-inline {
	display: none;
}

/* but on quoted posts that are also quoting something, probably a good idea to show that it is */
/* TODO get this bit to work again */
.post-quote .quote-inline {
	display: inline;
}

${emojiCSS}
`);

class PostTextContent extends CustomHTMLElement {
  constructor() {
    super(sheet14);
  }
  setData(content, emojis, mentions) {
    this.replaceAll("content", content, PostTextContent.parseContent, emojis, mentions);
  }
  static parseContent(content, emojis, mentions) {
    let parsedNodes = formatInEmojis(content, emojis);
    PostTextContent.addOnClickListenersToMentions(parsedNodes, mentions);
    return parsedNodes;
  }
  static addOnClickListenersToMentions(elements, mentions) {
    elements.forEach((element) => PostTextContent.walk(element, mentions));
  }
  static walk(node, mentions) {
    const children = node.childNodes;
    children.forEach((child) => PostTextContent.walk(child, mentions));
    PostTextContent.interceptUrlMentions(node, mentions);
  }
  static interceptUrlMentions(node, mentions) {
    if (!(node instanceof HTMLAnchorElement) || node.className !== "u-url mention")
      return;
    const mention = mentions.find((mention2) => mention2.url === node.href);
    if (!mention)
      return;
    node.title = mention.acct;
    node.dataset["accountId"] = mention.id;
    node.addEventListener("click", this.redirectToAccountPageOnClick);
  }
  static redirectToAccountPageOnClick(e) {
    e.preventDefault();
    let targetElement;
    if (e.target instanceof HTMLSpanElement)
      targetElement = e.target.parentElement;
    else
      targetElement = e.target;
    if (!targetElement)
      return;
    history.pushState(null, "", pathToAccount(targetElement.dataset["accountId"]));
    window.dispatchEvent(new Event("popstate"));
  }
}

// src/userInstanceInfo.ts
var isAkkoma = true;

// src/elements/account/usernameAcct.ts
var sheet15 = new CSSStyleSheet;
sheet15.replaceSync(`
:host {
	display: flex;
	align-items: center;
}

.acct {
	display: flex;
	align-items: center;
	color: var(--accent);
}

.username {
	color: var(--text);
	margin: 0;
	display: flex;
	align-items: center;
}

.instance {
	color: var(--subtext);
}

.favicon {
	margin-left: 0.5rem;
	width: 16px;
	height: 16px;
	transition: transform 0.1s ease-in-out;
}

.favicon:hover {
	transform: scale(2);
}
`);

class UsernameAcct extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      acct: createElement("a", "acct"),
      username: createElement("span", "username"),
      instance: createElement("span", "instance"),
      favicon: isAkkoma ? createElement("img", "favicon") : ""
    };
    putChildrenInContainer(elements.acct, elements.username, elements.instance);
    let layout = [elements.acct, elements.favicon];
    super(sheet15, elements, layout);
  }
  setData(account) {
    let [username, instance] = account.acct.split("@");
    if (!instance)
      instance = userSelectedInstance;
    this.update("username", `@${username}`, setInnerText);
    this.update("instance", `@${instance}`, setInnerText);
    this.update("acct", account.id, UsernameAcct.setAcctHref);
    this.setFavicon(account.akkoma.instance);
  }
  static setAcctHref(acct, accountId) {
    setAnchorHref(acct, pathToAccount(accountId));
  }
  setFavicon(instance) {
    if (!isAkkoma)
      return;
    if (!instance || !instance.favicon)
      return;
    this.update("favicon", instance.favicon, setSrc);
    let title;
    if (instance.nodeinfo?.software?.version)
      title = `${instance.name} (${instance.nodeinfo.software.name} ${instance.nodeinfo.software.version})`;
    else
      title = instance.name;
    this.update("favicon", title, setTitle);
  }
}

// src/elements/post/postInfo.ts
var sheet16 = new CSSStyleSheet;
sheet16.replaceSync(`
:host {
	display: flex;
}

a {
	color: var(--accent);
}

.poster-text-info {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-left: 1rem;
}

.left-column {
	display: flex;
	flex-direction: column;
}

.right-column {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.display-none {
	display: none;
}

.post-visibility {
	fill: var(--subtext);
	height: 24px;
}

.times {
	text-align: right;
}
`);

class PostInfo extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      avatar: AvatarWithPreview.newClone().addClasses("display-none"),
      displayName: new AccountDisplayName,
      usernameAcct: new UsernameAcct,
      createdAt: newElement({ element: "span", className: "post-time" }),
      editedAt: newElement({ element: "span", className: "edit-time" }),
      visibility: newElement({ element: "span", className: "post-visibility" }),
      times: newElement({ element: "a", className: "times" })
    };
    elements.times.append(elements.createdAt, elements.editedAt);
    let leftCol = newElement({
      element: "div",
      className: "left-column",
      children: [elements.displayName, elements.usernameAcct]
    });
    let rightCol = newElement({
      element: "div",
      className: "right-column",
      children: [elements.times, elements.visibility]
    });
    let textInfo = newElement({ element: "div", className: "poster-text-info", children: [leftCol, rightCol] });
    let layout = [elements.avatar, textInfo];
    super(sheet16, elements, layout);
  }
  setData(post, shouldIncludeAvatar) {
    if (shouldIncludeAvatar)
      this.set("avatar", post.account);
    this.toggleClassOnElement("avatar", "display-none", !shouldIncludeAvatar);
    this.set("displayName", post.account.display_name, post.account.emojis);
    this.set("usernameAcct", post.account);
    this.update("createdAt", post.created_at, PostInfo.setCreatedAt);
    this.update("editedAt", post.edited_at, PostInfo.setEditedAt);
    this.update("times", post.id, PostInfo.setTimesHref);
    this.replaceChildrenOfElement("visibility", post.visibility, PostInfo.newPostVisibilityIcon);
  }
  static newPostVisibilityIcon(visibility2) {
    const icon = getIconForVisibility(visibility2);
    addClasses2(icon, "post-visibility");
    setTitle(icon, visibility2);
    return [icon];
  }
  static setCreatedAt(createdAtSpan, createdAt) {
    const date = new Date(createdAt);
    setInnerText(createdAtSpan, relativeTime(date));
    setTitle(createdAtSpan, asReadableDate(date));
  }
  static setEditedAt(editedAtSpan, editedAt) {
    const date = new Date(editedAt);
    setInnerText(editedAtSpan, ` (edited ${relativeTime(date)})`);
    setTitle(editedAtSpan, asReadableDate(date));
  }
  static setTimesHref(times, statusId) {
    setAnchorHref(times, `/${statusesPath}/${statusId}`);
  }
}

// src/elements/post/standardPost.ts
var sheet17 = new CSSStyleSheet;
sheet17.replaceSync(`
:host {
	${postCSS}
	display: flex;
}

:host(.quoted-post) {
	margin: 0;
	padding: 0.5rem;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
	border-radius: 8px;
}

:host(.quoted-post:hover) {
	border-color: var(--border-hover);
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
}

:host(.boosted-post),
:host(.boosted-post:hover) {
	padding: 0;
	margin: 0;
	background: none;
	width: 100%;
}

.post-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-inner-body {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-spoiler .post-inner-body {
	filter: blur(8px);
	/*height: 2ch;*/
	overflow: hidden;
	user-select: none;
}

.display-none {
	display: none;
}
`);

class StandardPost extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      avatar: AvatarWithPreview.newClone().addClasses("display-none"),
      posterInfo: PostInfo.newClone(),
      spoilerText: newElement({ element: "div", className: "spoiler-text" }),
      content: new PostTextContent,
      media: new PostMedia,
      quote: "",
      emojiReactions: EmojiReactions.newClone(),
      interactionsRow: PostInteractionsRow.newClone()
    };
    let innerBody = newElement({ element: "div", className: "post-inner-body", children: [elements.content, elements.media] });
    let body = newElement({
      element: "div",
      className: "post-body",
      children: [elements.posterInfo, elements.spoilerText, innerBody, elements.emojiReactions, elements.interactionsRow]
    });
    let layout = [elements.avatar, body];
    super(sheet17, elements, layout);
  }
  setData(post, includeSpaceForAvatarLine, isQuoted) {
    this.toggleClassOnElement("avatar", "display-none", !includeSpaceForAvatarLine);
    if (includeSpaceForAvatarLine)
      this.set("avatar", post.account, true);
    this.set("posterInfo", post, !includeSpaceForAvatarLine);
    this.toggleClassOnElement("spoilerText", "display-none", !post.spoiler_text);
    this.toggleClassOnElement("content", "display-none", !post.content);
    this.set("content", post.content, post.emojis, post.mentions);
    this.toggleClassOnElement("media", "display-none", !post.media_attachments.length);
    this.set("media", post.media_attachments, post.sensitive);
    if (post.quote) {
      if (!this.elements["quote"]) {
        let quote = StandardPost.newClone().addClasses("quoted-post");
        this.elements["quote"] = quote;
        this.elements["emojiReactions"].parentNode.insertBefore(quote, this.elements["emojiReactions"]);
      }
      this.elements["quote"].setData(post.quote, false, true);
    }
    this.toggleClassOnElement("emojiReactions", "display-none", !post.emoji_reactions?.length);
    this.set("emojiReactions", post.emoji_reactions);
    this.toggleClassOnElement("interactionsRow", "display-none", isQuoted);
    this.toggleClassOnElement("interactionsRow", "extra-margin", !includeSpaceForAvatarLine);
    this.set("interactionsRow", post, includeSpaceForAvatarLine);
  }
}

// src/elements/post/boost.ts
var sheet18 = new CSSStyleSheet;
sheet18.replaceSync(`
:host {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	${postCSS}
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
`);

class Boost extends CustomHTMLElement {
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    let elements = {
      boostedBy: new PostBoostedBy,
      post: new StandardPost().addClasses("boosted-post")
    };
    super(sheet18, elements);
  }
  setData(post) {
    if (!post.reblog)
      throw new Error("Post is not boosted");
    this.set("boostedBy", post);
    this.set("post", post.reblog);
  }
}

// src/elements/post/post.ts
var sheet19 = new CSSStyleSheet;
sheet19.replaceSync(`
:host {
	width: calc(100% - 1rem);
	/* todo root post should have top split 50/50 */
	padding: 0.5rem 0.5rem 0.5rem 0.5rem;
	margin: 0.5rem 0.5rem 0 0.5rem;
	display: flex;
	background: transparent;
	transition: background 0.2s ease-in-out;
	border-radius: 8px;
}

:host(.quoted-post) {
	margin: 0;
	padding: 0.5rem;
	width: 100%;
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
}

.boosted-post,
.boosted-post:hover {
	padding: 0;
	margin: 0;
	background: none;
}

.post-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-inner-body {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-spoiler .post-inner-body {
	filter: blur(8px);
	/*height: 2ch;*/
	overflow: hidden;
	user-select: none;
}
`);

class Post extends CustomHTMLElement {
  constructor() {
    super(...arguments);
  }
  static async build(post, inludeSpaceForAvatarLine = false, isQuoted = false) {
    if (post.reblog) {
      let boost2 = new Boost;
      boost2.setData(post);
      return boost2;
    } else {
      let standardPost3 = new StandardPost;
      standardPost3.setData(post, inludeSpaceForAvatarLine, isQuoted);
      return standardPost3;
    }
    let element = post.reblog ? Post.constructBoost(post) : Post.constructPost(inludeSpaceForAvatarLine, post, isQuoted);
    element.id = post.id;
    return element;
  }
  static fillMissingData(post) {
    return post;
  }
  setData() {
  }
  static constructBoost(post) {
    let boost2 = Boost.newClone();
    boost2.setData(post);
    return boost2;
  }
  static constructPost(inludeSpaceForAvatarLine, post, isQuoted) {
    let newPost = StandardPost.newClone();
    newPost.setData(post, inludeSpaceForAvatarLine, isQuoted);
    return newPost;
  }
}

// src/elements/post/quotedPost.ts
var sheet20 = new CSSStyleSheet;
sheet20.replaceSync(`
:host {
	border: 1px solid var(--border);
	border-radius: 8px;
}

.post {

}
`);

class QuotedPost extends CustomHTMLElement {
  constructor() {
    super(...arguments);
  }
  static async build(post) {
    return PostBoostedBy.newClone();
  }
  setData() {
  }
}

// src/defineCustomElements.ts
function defineCustomElements() {
  customElements.define("x-avatar", AccountAvatar);
  customElements.define("account-bio", AccountBio);
  customElements.define("display-name", AccountDisplayName);
  customElements.define("profile-preview", ProfilePreview);
  customElements.define("username-acct", UsernameAcct);
  customElements.define("avatar-with-preview", AvatarWithPreview);
  customElements.define("boost-post", Boost);
  customElements.define("boosted-by", PostBoostedBy);
  customElements.define("emoji-reaction", EmojiReaction);
  customElements.define("emoji-reactions-row", EmojiReactions);
  customElements.define("post-interactions-row", PostInteractionsRow);
  customElements.define("media-row", MediaRow);
  customElements.define("post-text-content", PostTextContent);
  customElements.define("x-post", Post);
  customElements.define("poster-info", PostInfo);
  customElements.define("post-interaction-item", PostInteractionItem);
  customElements.define("post-media", PostMedia);
  customElements.define("post-media-item", PostMediaItem);
  customElements.define("quoted-post", QuotedPost);
  customElements.define("standard-post", StandardPost);
}

// src/app.ts
async function main() {
  defineCustomElements();
  addEventListener("popstate", () => {
    console.log("popstate");
    doStuffForUrl();
  });
  doStuffForUrl();
}
async function doStuffForUrl() {
  const url = new URL(document.location.href);
  const path = url.pathname.split("/");
  timelineDiv.innerHTML = "";
  perfLastTime = performance.now();
  fetchIconsInAdvance().then(perfMessage("fetchIconsInAdvance"));
  switch (path[1]) {
    case accountsPath: {
      const accountId = path[2];
      fetchUserStatuses(accountId).then(perfMessage("fetchUserStatuses")).then(renderTimeline).then(perfMessage("renderTimeline"));
      break;
    }
    case statusesPath: {
      const statusId = path[2];
      const [status, context] = await fetchStatusAndContext(statusId).then(perfMessage("fetchStatusAndContext"));
      const postTrees = await putStatusInContext(status, context).then(buildPostTree).then(perfMessage("buildPostTree"));
      renderPostTree(postTrees[0]).then(perfMessage("renderPostTree")).then(putChildrenInCurryContainer(timelineDiv)).then(() => {
        scrollToIfReply(status);
        loadingPostsDiv.style.display = "none";
      });
      break;
    }
    default: {
      fetchFederatedTimeline().then(perfMessage("fetchFederatedTimeline")).then(renderTimeline).then(perfMessage("renderTimeline"));
      break;
    }
  }
}
async function fetchIconsInAdvance() {
  Object.values(Icon).map(fetchIcon);
}
var scrollToIfReply = function(status) {
  if (status.in_reply_to_id)
    scrollToElementWithId(status.id);
};
var scrollToElementWithId = function(id) {
  document.getElementById(id).scrollIntoView();
};
async function putStatusInContext(status, context) {
  return [...context.ancestors, status, ...context.descendants];
}
var renderTimeline = function(statuses) {
  timelineDiv.innerHTML = "";
  return Promise.all(statuses.map(fetchPostsUpwards)).then(perfMessage("fetchPostsUpwards")).then((posts) => Promise.all(posts.map(renderPostGroup))).then(perfMessage("renderPostGroup")).then(putChildrenInCurryContainer(timelineDiv));
};
async function fetchPostsUpwards(post3, heightAbove = 1) {
  if (post3.in_reply_to_id && heightAbove > 0) {
    return fetchStatusById(post3.in_reply_to_id).then((fetchedPost) => fetchPostsUpwards(fetchedPost, heightAbove - 1)).then((posts) => [...posts, post3]);
  } else
    return [post3];
}
async function renderPostGroup(posts) {
  const postContainer = aCreateElement("div", "post-container");
  if (posts[0].in_reply_to_id) {
    constructReplyTopLine(posts[0]).then(putChildInCurryContainer(await postContainer));
  }
  return Promise.all(posts.map((post3, index, { length }) => Post.build(post3, index !== length - 1))).then(putChildrenInCurryContainer(await postContainer));
}
async function renderPostTree(tree) {
  const postDiv = StandardPost.newClone();
  postDiv.setData(tree, tree.children && tree.children.length > 0, false);
  if (!tree.children || tree.children.length === 0) {
    return [await postDiv];
  } else if (tree.children.length === 1) {
    return [await postDiv, ...await renderPostTree(tree.children[0])];
  } else {
    return Promise.all(tree.children.map(renderPostTree)).then((children) => children.map(putChildrenInNewCurryContainer("post-child-container"))).then((childrenDivs) => Promise.all(childrenDivs.map(putChildrenInContainerWithLine))).then(putChildrenInNewCurryContainer("post-children-container")).then(async (childrenContainer) => {
      return [await postDiv, childrenContainer];
    });
  }
  async function putChildrenInContainerWithLine(childrenDiv) {
    return Promise.all([aCreateElement("div", "post-child-line-connector"), aCreateElement("div", "post-child-line")]).then(putChildrenInNewCurryContainer("post-child-line-container")).then((lineContainer) => putChildrenInNewContainer([lineContainer, childrenDiv], "post-child-container-outer"));
  }
}
async function constructReplyTopLine(post3) {
  let replyTo = post3.mentions.find((mention) => mention.id === post3.in_reply_to_account_id);
  if (!replyTo)
    replyTo = post3.account;
  let line = newElement({ element: "div", className: "avatar-line-top" });
  let icon = clone(getIcon(Icon.Reply));
  addClasses("post-replies-top-icon")(icon);
  let text = newElement({
    element: "a",
    className: "post-replies-top-text",
    href: `/${statusesPath}/${post3.in_reply_to_id}`,
    innerText: "Reply to " + replyTo.acct
  });
  return newElement({ element: "div", className: "post-replies-top", children: [line, icon, text] });
}
var buildPostTree = function(statuses) {
  const tree = [];
  for (let i = 0;i < statuses.length; i++) {
    if (statuses[i].in_reply_to_id) {
      const parent = statuses.filter((status) => status.id === statuses[i].in_reply_to_id).pop();
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(statuses[i]);
    } else {
      tree.push(statuses[i]);
    }
  }
  return tree;
};
var perfMessage = function(message) {
  return async function(value = undefined) {
    await value;
    console.log(message + " took " + (performance.now() - perfLastTime) + "ms");
    perfLastTime = performance.now();
    return value;
  };
};
var timelineDiv = document.getElementById("timeline-content");
var loadingPostsDiv = document.getElementById("loading-posts");
var perfLastTime = performance.now();
main().catch(console.error);
