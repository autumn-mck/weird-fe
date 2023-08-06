import { Account } from "./models/account.js";
import { getAccountDisplayNameHTML, formatInEmojis, relativeTime } from "./utils.js";

export async function generateProfilePreview(account: Account) {
	const accountDisplayName = getAccountDisplayNameHTML(account);
	const accountBio = formatInEmojis(account.note, account.emojis);
	const accountCreatedAt = relativeTime(new Date(account.created_at));

	const profilePreview = document.createElement("div");
	profilePreview.className = "profile-preview";

	const accountHeader = document.createElement("img");
	accountHeader.src = account.header;
	accountHeader.className = "preview-header";
	accountHeader.loading = "lazy";

	const profilePreviewContent = document.createElement("div");
	profilePreviewContent.className = "profile-preview-content";

	const accountAvatar = document.createElement("img");
	accountAvatar.src = account.avatar;
	accountAvatar.className = "preview-avatar";
	accountAvatar.loading = "lazy";

	const profilePreviewText = document.createElement("div");
	profilePreviewText.className = "profile-preview-text";

	const profilePreviewName = document.createElement("div");
	profilePreviewName.className = "profile-preview-name";
	profilePreviewName.innerHTML = accountDisplayName;

	const profilePreviewBio = document.createElement("div");
	profilePreviewBio.className = "profile-preview-bio";
	profilePreviewBio.innerHTML = accountBio;

	const profilePreviewCreatedAt = document.createElement("div");
	profilePreviewCreatedAt.className = "profile-preview-created-at";
	profilePreviewCreatedAt.innerHTML = accountCreatedAt;

	profilePreviewText.appendChild(profilePreviewName);
	profilePreviewText.appendChild(profilePreviewBio);
	profilePreviewText.appendChild(profilePreviewCreatedAt);

	profilePreviewContent.appendChild(accountAvatar);

	profilePreviewContent.appendChild(profilePreviewText);

	profilePreview.appendChild(accountHeader);
	profilePreview.appendChild(profilePreviewContent);

	return profilePreview;
}
