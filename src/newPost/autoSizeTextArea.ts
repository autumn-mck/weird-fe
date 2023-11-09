import autosize from "autosize";

export default class AutoSize extends HTMLTextAreaElement {
	constructor() {
		super();
		autosize(this);
	}
}
