import { clone, fetchAsync, parseSVG } from "./utils.js";
import { IconSet } from "./models/iconSet.js";
import { Icon } from "./models/icons.js";
import { Visibility } from "./models/visibility.js";
import { putChildInNewCurryContainer } from "./curryingUtils.js";

const icons: { [key: string]: Promise<HTMLElement> } = {};

export async function getIcon(icon: Icon): Promise<HTMLElement> {
	const iconSet = IconSet.MaterialSymbols;
	if (!icons[icon]) {
		icons[icon] = fetchAsync(`/assets/svgs/${iconSet}/${icon}.svg`).then(parseSVG).then(putChildInNewCurryContainer("svg"));
	}

	return icons[icon]!;
}

export async function getIconForVisibility(visibility: Visibility): Promise<HTMLElement> {
	return getIconEnumForVisibility(visibility).then(getIcon).then(clone);
}

async function getIconEnumForVisibility(visibility: Visibility) {
	switch (visibility) {
		case Visibility.Public:
			return Icon.VisibilityPublic;
		case Visibility.Unlisted:
			return Icon.VisibilityUnlisted;
		case Visibility.Local:
			return Icon.VisibilityLocal;
		case Visibility.Followers:
			return Icon.VisibilityFollowers;
		case Visibility.Direct:
			return Icon.VisibilityDirect;

		default:
			throw new Error("Unknown visibility: " + visibility);
	}
}
