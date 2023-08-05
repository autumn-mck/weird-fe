import { Account } from "./models/account.js";
import { getAccountDisplayNameHTML, formatInEmojis, relativeTime } from "./utils.js";

export async function generateProfilePreviewHTML(account: Account) {
	const accountDisplayName = getAccountDisplayNameHTML(account);
	const accountBio = formatInEmojis(account.note, account.emojis);
	const accountCreatedAt = relativeTime(new Date(account.created_at));

	const accountAvatarHTML = `<img src="${account.avatar}" alt="" class="preview-avatar" loading="lazy" />`;
	const accountHeaderHTML = `<img src="${account.header}" alt="" class="preview-header" loading="lazy" />`;

	return `
	<div class="profile-preview">
		${accountHeaderHTML}
		<div class="profile-preview-content">
			${accountAvatarHTML}
			<div class="profile-preview-text">
				<div class="profile-preview-name">${accountDisplayName}</div>
				<div class="profile-preview-bio">${accountBio}</div>
				<div class="profile-preview-created-at">${accountCreatedAt}</div>
			</div>
		</div>
	</div>
	`;
}
