import { addClasses, setImgSrc } from "../../curryingUtils.js";
import CustomHTMLElement from "../customElement.js";
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
	border-radius: 8px;
	border: 1px solid var(--border);
	max-width: 100%;
	height: 18rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
	min-width: 20%;
	width: auto;
}

.post-media-item {
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
    static async build(attachment, isSensitive) {
        return this.#constructMediaDomItem(attachment)
            .then(setImgSrc(attachment.url))
            .then(addClasses("post-media-item"))
            .then((mediaItem) => {
            if (isSensitive)
                mediaItem.className += " sensitive";
            return mediaItem;
        })
            .then(this.createNew);
    }
    static async #constructMediaDomItem(attachment) {
        let mediaItem;
        // todo handle better
        if (attachment.type === "image") {
            mediaItem = document.createElement("img");
        }
        else if (attachment.type === "video") {
            mediaItem = document.createElement("video");
            mediaItem.controls = true;
        }
        else if (attachment.type === "gifv") {
            mediaItem = document.createElement("video");
            mediaItem.controls = true;
        }
        else if (attachment.type === "audio") {
            mediaItem = document.createElement("audio");
            mediaItem.controls = true;
        }
        else {
            console.log(attachment);
            throw new Error("Unknown media type: " + attachment.type);
        }
        return mediaItem;
    }
    static createNew(element) {
        return new PostMediaItem(sheet, [element]);
    }
}
//# sourceMappingURL=postMediaItem.js.map