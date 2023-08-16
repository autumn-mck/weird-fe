import { getAccountDisplayNameHTML, formatInEmojis, relativeTime, aCreateElement } from "./utils.js";
import * as consts from "./consts.js";
import { addClasses, putChildrenInCurryContainer, putChildrenInNewCurryContainer, setAnchorHref, setImgSrc, setInnerHTML, setInnerText, setTitle, } from "./curryingUtils.js";
export async function generateProfilePreview(account) {
    const accountBio = formatInEmojis(account.note, account.emojis);
    const accountCreatedAt = relativeTime(new Date(account.created_at));
    return Promise.all([
        aCreateElement("img", "preview-header").then(setImgSrc(account.header)),
        Promise.all([
            aCreateElement("img", "preview-avatar").then(setImgSrc(account.avatar)),
            Promise.all([
                constructDisplayName(account).then(addClasses("profile-preview-name")),
                aCreateElement("p").then(setInnerHTML(accountBio)).then(addClasses("profile-preview-bio")),
                aCreateElement("p").then(setInnerText(accountCreatedAt)).then(addClasses("profile-preview-created-at")),
            ]).then(putChildrenInNewCurryContainer("profile-preview-text")),
        ]).then(putChildrenInNewCurryContainer("profile-preview-content")),
    ]).then(putChildrenInNewCurryContainer("profile-preview"));
}
export function constructAcct(account) {
    let [username, instance] = account.acct.split("@");
    // assuming that the only case where instance wouldn't be defined here is if the account is on the user's own instance
    if (!instance)
        instance = consts.userSelectedInstance;
    return aCreateElement("a", "acct")
        .then(setAnchorHref(`/${consts.accountsPath}/${account.id}`))
        .then((acct) => {
        Promise.all([
            aCreateElement("span", "poster-username").then(setInnerText("@" + username)),
            aCreateElement("span", "poster-instance").then(setInnerText("@" + instance)),
            account.akkoma ? getInstanceFavicon(account.akkoma.instance) : "",
        ]).then(putChildrenInCurryContainer(acct));
        return acct;
    });
}
export async function constructDisplayName(account) {
    return aCreateElement("p").then(setInnerHTML(getAccountDisplayNameHTML(account)));
}
function getInstanceFavicon(instance) {
    if (!instance || !instance.favicon)
        return "";
    let title = instance.name;
    if (instance.nodeinfo && instance.nodeinfo.software && instance.nodeinfo.software.name && instance.nodeinfo.software.version) {
        title += " (" + instance.nodeinfo.software.name + " " + instance.nodeinfo.software.version + ")";
    }
    return aCreateElement("img", "post-instance-favicon").then(setImgSrc(instance.favicon)).then(setTitle(title));
}
//# sourceMappingURL=profileRendering.js.map