import autosize from "autosize";

export default class AutoSize extends HTMLTextAreaElement {
	public static tagName = "auto-size";
	public static extends = "textarea";
	constructor() {
		super();
		autosize(this);
	}
}
