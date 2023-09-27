import { clone, fetchAsync, parseSVG } from "./utils";
import { IconSet } from "./models/iconSet";
import { Icon } from "./models/icons";
import { Visibility } from "./models/visibility";
import { putChildInNewCurryContainer } from "./curryingUtils";

const icons: { [key: string]: HTMLElement } = {};

export function getIcon(icon: Icon): HTMLElement {
	// todo why does this function not do the cloning????
	return icons[icon]!;
}

export async function fetchIcon(icon: Icon): Promise<HTMLElement> {
	const iconSet = IconSet.MaterialSymbols;
	if (!icons[icon]) {
		icons[icon] = await fetchAsync(`/assets/svgs/${iconSet}/${icon}.svg`).then(parseSVG).then(putChildInNewCurryContainer("svg"));
	}

	return icons[icon]!;
}

export function getIconClone(iconType: Icon) {
	return clone(getIcon(iconType));
}

export function getIconForVisibility(visibility: Visibility) {
	const icon = getIconEnumForVisibility(visibility);
	return clone(getIcon(icon));
}

function getIconEnumForVisibility(visibility: Visibility) {
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
