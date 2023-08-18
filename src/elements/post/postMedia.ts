import { putChildrenInNewCurryContainer } from "../../curryingUtils.js";
import { MediaAttatchment } from "../../models/mediaAttatchment.js";
import { chunkArray } from "../../utils.js";
import CustomHTMLElement from "../customElement.js";
import PostMediaItem from "./postMediaItem.js";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
}

.row {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	width: auto;
	max-width: 100%;
}
`);

export default class PostMedia extends CustomHTMLElement {
	static async build(attachments: MediaAttatchment[], isSensitive: boolean): Promise<CustomHTMLElement> {
		const maxItemsInRow = 3;

		return Promise.all(attachments.map((attatchment) => PostMediaItem.build(attatchment, isSensitive)))
			.then((mediaItems) => chunkArray(mediaItems, maxItemsInRow) as unknown as HTMLElement[][])
			.then((mediaRows) => Promise.all(mediaRows.map(putChildrenInNewCurryContainer("row"))))
			.then(this.createNew);
	}

	protected static createNew(elements: (Node | string)[]): CustomHTMLElement {
		return new PostMedia(sheet, elements);
	}
}
