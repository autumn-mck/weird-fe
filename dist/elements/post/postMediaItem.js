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
        return PostMediaItem.constructMediaDomItem(attachment)
            .then(PostMediaItem.enableMediaControlsIfNeeded(attachment.type))
            .then(PostMediaItem.markSensitiveIfNeeded(isSensitive))
            .then(setImgSrc(attachment.url))
            .then(addClasses("post-media-item"))
            .then(PostMediaItem.createNew);
    }
    static markSensitiveIfNeeded(isSensitive) {
        return function (mediaItem) {
            if (isSensitive)
                mediaItem.className += " sensitive";
            return mediaItem;
        };
    }
    static async constructMediaDomItem(attachment) {
        switch (attachment.type) {
            case "image":
                return document.createElement("img");
            case "gifv":
            case "video":
                return document.createElement("video");
            case "audio":
                return document.createElement("audio");
            default:
                console.log(attachment);
                throw new Error("Unknown media type: " + attachment.type);
        }
    }
    static enableMediaControlsIfNeeded(attachmentType) {
        return function (mediaItem) {
            switch (attachmentType) {
                case "video":
                case "gifv":
                case "audio":
                    mediaItem.setAttribute("controls", "");
                    return mediaItem;
                default:
                    return mediaItem;
            }
        };
    }
    static createNew(element) {
        return new PostMediaItem(sheet, [element]);
    }
}
//# sourceMappingURL=postMediaItem.js.map