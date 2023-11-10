import { createElement, pathToAccount } from "../../utils";
import { setAnchorHref, putChildrenInContainer, setInnerText, setSrc, setTitle } from "../../domUtils";
import { Account } from "../../models/account";
import * as consts from "../../consts";
import CustomHTMLElement from "../customElement";
import { isAkkoma } from "../../userInstanceInfo";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
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

export default class UsernameAcct extends CustomHTMLElement {
	public static override tagName = "username-acct";
	protected static override baseToClone: UsernameAcct;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as UsernameAcct;
	}

	constructor() {
		const elements = {
			acct: createElement("a", "acct"),
			username: createElement("span", "username"),
			instance: createElement("span", "instance"),
			favicon: isAkkoma ? (createElement("img", "favicon") as HTMLImageElement) : "",
		};

		putChildrenInContainer(elements.acct, elements.username, elements.instance);
		const layout = [elements.acct, elements.favicon];

		super(sheet, elements, layout);
	}

	public setData(account: Account) {
		let [username, instance] = account.acct.split("@");

		// assuming that the only case where instance wouldn't be defined here is if the account is on the user's own instance
		if (!instance) instance = consts.userSelectedInstance;

		this.update("username", `@${username}`, setInnerText);
		this.update("instance", `@${instance}`, setInnerText);
		this.update("acct", account.id, UsernameAcct.setAcctHref);

		this.setFavicon(account.akkoma.instance);
	}

	private static setAcctHref(acct: HTMLElement, accountId: string) {
		setAnchorHref(acct, pathToAccount(accountId));
	}

	private setFavicon(instance: any) {
		if (!isAkkoma) return;
		if (!instance || !instance.favicon) return;

		this.update("favicon", instance.favicon, setSrc);

		let title;
		if (instance.nodeinfo?.software?.version)
			title = `${instance.name} (${instance.nodeinfo.software.name} ${instance.nodeinfo.software.version})`;
		else title = instance.name;

		this.update("favicon", title, setTitle);
	}
}
