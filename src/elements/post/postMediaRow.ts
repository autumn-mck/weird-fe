import { MediaAttatchment } from "../../models/mediaAttatchment";
import CustomHTMLElement from "../customElement";
import PostMediaItem from "./postMediaItem";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	width: auto;
	max-width: 100%;
}
`);

export default class MediaRow extends CustomHTMLElement {
	protected static override baseToClone: MediaRow;
	public static newClone() {
		if (!this.baseToClone) this.baseToClone = new this();
		return this.baseToClone.cloneNode(true) as MediaRow;
	}

	private mediaItems: PostMediaItem[] = [];

	constructor() {
		super(sheet);
	}

	public setData(attachments: MediaAttatchment[], isSensitive: boolean) {
		attachments.forEach((attachment, index) => {
			let mediaItem = this.mediaItems[index];
			if (!mediaItem) {
				mediaItem = new PostMediaItem();
				this.mediaItems.push(mediaItem);
			}

			mediaItem.setData(attachment, isSensitive);
		});

		this.shadowRoot?.replaceChildren(...this.mediaItems);
	}
}
