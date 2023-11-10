import { MediaAttatchment } from "../../models/mediaAttatchment";
import { chunkArray } from "../../utils";
import CustomHTMLElement from "../customElement";
import MediaRow from "./postMediaRow";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
}
`);

export default class PostMedia extends CustomHTMLElement {
	public static override tagName = "post-media";
	private static maxItemsInRow = 3;

	private rows: MediaRow[] = [];

	constructor() {
		super(sheet);
	}

	public setData(attachments: MediaAttatchment[], isSensitive: boolean) {
		// todo ???
		let chunked = chunkArray(attachments, PostMedia.maxItemsInRow);
		chunked.forEach((chunk, index) => {
			let row = this.rows[index];
			if (!row) {
				row = new MediaRow();
				this.rows.push(row);
				this.appendElements(row);
			}

			row.setData(chunk, isSensitive);
		});
	}
}
