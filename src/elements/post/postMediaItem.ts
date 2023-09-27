import { addClasses, setSrc } from "../../domUtils";
import { MediaAttatchment } from "../../models/mediaAttatchment";
import CustomHTMLElement from "../customElement";

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
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

export default class PostMediaItem extends CustomHTMLElement {
	private element: HTMLElement | undefined;

	private src: string | undefined;
	private isSensitive = false;

	constructor() {
		super(sheet);
	}

	public setData(attachment: MediaAttatchment, isSensitive: boolean) {
		if (this.src !== attachment.url) {
			this.element = PostMediaItem.constructMediaDomItem(attachment);
			// todo loop gif etc?
			this.shadowRoot?.replaceChildren(this.element);
		}

		if (this.isSensitive !== isSensitive) {
			this.isSensitive = isSensitive;
			this.element?.classList.toggle("sensitive");
		}
	}

	private static constructMediaDomItem(attachment: MediaAttatchment) {
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
				// todo don't just error
				throw new Error("Unknown media type: " + attachment.type);
		}

		if (PostMediaItem.shouldEnableMediaControls(attachment.type)) {
			(element as HTMLMediaElement).controls = true;
		}

		setSrc(element, attachment.url);
		addClasses(element, "media");

		return element;
	}

	private static shouldEnableMediaControls(attachmentType: string) {
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
