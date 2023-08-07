import { getAccountDisplayNameHTML, formatInEmojis, relativeTime, createElement } from "./utils.js";
import * as consts from "./consts.js";
export async function generateProfilePreview(account) {
    const accountDisplayName = getAccountDisplayNameHTML(account);
    const accountBio = formatInEmojis(account.note, account.emojis);
    const accountCreatedAt = relativeTime(new Date(account.created_at));
    const displayName = createElement("div", "profile-preview-name");
    displayName.innerHTML = accountDisplayName;
    const bio = createElement("div", "profile-preview-bio");
    bio.innerHTML = accountBio;
    const createdAt = createElement("div", "profile-preview-created-at");
    createdAt.textContent = accountCreatedAt;
    const profilePreviewText = createElement("div", "profile-preview-text");
    profilePreviewText.append(displayName, bio, createdAt);
    const accountAvatar = createElement("img", "preview-avatar");
    accountAvatar.src = account.avatar;
    accountAvatar.loading = "lazy";
    const profilePreviewContent = createElement("div", "profile-preview-content");
    profilePreviewContent.append(accountAvatar, profilePreviewText);
    const headerImg = createElement("img", "preview-header");
    headerImg.src = account.header;
    headerImg.loading = "lazy";
    const profilePreview = createElement("div", "profile-preview");
    profilePreview.append(headerImg, profilePreviewContent);
    return profilePreview;
}
export function constructAcct(account) {
    let [username, instance] = account.acct.split("@");
    // assuming that the only case where instance wouldn't be defined here is if the account is on the user's own instance
    if (!instance)
        instance = consts.userSelectedInstance;
    const acctUsername = createElement("span", "poster-username");
    acctUsername.innerText = "@" + username;
    const acctInstance = createElement("span", "poster-instance");
    acctInstance.innerText = "@" + instance;
    const acct = createElement("a", "acct");
    acct.href = `/${consts.accountsPath}/${account.id}`;
    acct.appendChild(acctUsername);
    acct.appendChild(acctInstance);
    if (account.akkoma) {
        const posterInstanceFavicon = getInstanceFavicon(account.akkoma.instance);
        if (posterInstanceFavicon)
            acct.appendChild(posterInstanceFavicon);
    }
    return acct;
}
function getInstanceFavicon(instance) {
    if (!instance || !instance.favicon)
        return null;
    const posterInstanceFavicon = createElement("img", "post-instance-favicon");
    posterInstanceFavicon.src = instance.favicon;
    posterInstanceFavicon.width = 16;
    posterInstanceFavicon.height = 16;
    let title = instance.name;
    if (instance.nodeinfo && instance.nodeinfo.software && instance.nodeinfo.software.name && instance.nodeinfo.software.version) {
        title += " (" + instance.nodeinfo.software.name + " " + instance.nodeinfo.software.version + ")";
    }
    posterInstanceFavicon.title = title;
    posterInstanceFavicon.ariaHidden = "true";
    return posterInstanceFavicon;
}
//# sourceMappingURL=profileRendering.js.map