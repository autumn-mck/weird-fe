import { fetchAsync } from "./utils.js";
import { IconSet } from "./models/iconSet.js";
import { Icon } from "./models/icons.js";
import { Visibility } from "./models/visibility.js";

let icons: { [key: string]: HTMLDivElement } = {};

export async function getIcon(icon: Icon): Promise<HTMLDivElement> {
	const iconSet = IconSet.MaterialSymbols;
	if (!icons[icon]) {
		const svg = await fetchAsync("/assets/svgs/" + iconSet + "/" + icon + ".svg");
		const div = document.createElement("div");
		div.innerHTML = svg;
		icons[icon] = div;
	}

	return icons[icon]!.cloneNode(true) as HTMLDivElement;
}

export async function getIconForVisibility(visibility: Visibility): Promise<HTMLDivElement> {
	switch (visibility) {
		case Visibility.Public:
			return await getIcon(Icon.VisibilityPublic);
		case Visibility.Unlisted:
			return await getIcon(Icon.VisibilityUnlisted);
		case Visibility.Local:
			return await getIcon(Icon.VisibilityLocal);
		case Visibility.Followers:
			return await getIcon(Icon.VisibilityFollowers);
		case Visibility.Direct:
			return await getIcon(Icon.VisibilityDirect);

		default:
			throw new Error("Unknown visibility: " + visibility);
	}
}
