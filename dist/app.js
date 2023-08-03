import { escapeHTML, fetchAsync, fetchJsonAsync, relativeTime } from "./genericFunctions.js";
const userSelectedInstance = "0w0.is";
const userSelectedInstanceUrl = "https://" + userSelectedInstance;
const accountsPath = "users";
const timelineDiv = document.getElementById("timeline");
let favouriteSvg, repeatSvg, replySvg, elipsisSvg, reactSvg, quoteSvg, visilitySvgs;
/**
 * Main function
 */
async function main() {
    document.location;
    await fetchAssets();
    const data = await getDataForUrl();
    timelineDiv.innerHTML = "";
    data.forEach(async (post) => {
        const postContainer = document.createElement("div");
        postContainer.className = "post-container";
        const postDiv = constructPost(post);
        if (post.in_reply_to_id) {
            const postReplyTo = await fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/statuses/" + post.in_reply_to_id);
            console.log(postReplyTo);
            const postReplyToDiv = constructPost(postReplyTo, true);
            postReplyToDiv.className += " post-replied-to";
            postContainer.appendChild(postReplyToDiv);
        }
        postContainer.appendChild(postDiv);
        timelineDiv.appendChild(postContainer);
    });
}
async function getDataForUrl() {
    let data;
    const url = new URL(document.location.href);
    const path = url.pathname.split("/");
    if (path[1] === accountsPath) {
        const account = path[2];
        //data = await fetchJsonAsync(instance + "/api/v1/accounts/" + account);
        data = await fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/accounts/" + account + "/statuses");
    }
    else {
        data = fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/timelines/public");
    }
    return data;
}
async function fetchAssets() {
    // TODO: Use other icon sets? eg https://tabler.io/docs/icons
    favouriteSvg = await fetchAsync("/assets/svgs/star.svg");
    repeatSvg = await fetchAsync("/assets/svgs/repeat.svg");
    replySvg = await fetchAsync("/assets/svgs/reply.svg");
    elipsisSvg = await fetchAsync("/assets/svgs/elipsis.svg");
    reactSvg = await fetchAsync("/assets/svgs/react.svg");
    quoteSvg = await fetchAsync("/assets/svgs/quote.svg");
    visilitySvgs = {
        public: await fetchAsync("/assets/svgs/public.svg"),
        unlisted: await fetchAsync("/assets/svgs/unlisted.svg"),
        private: await fetchAsync("/assets/svgs/followers.svg"),
        local: await fetchAsync("/assets/svgs/local.svg"),
        direct: await fetchAsync("/assets/svgs/direct.svg"),
    };
}
function constructPost(post, isRepliedTo = false, isQuoted = false) {
    console.log(post);
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    const postBody = document.createElement("div");
    postBody.className = "post-body";
    if (post.reblog) {
        const reblogDiv = document.createElement("div");
        reblogDiv.className = "boosted-by";
        const reblogIco = document.createElement("div");
        reblogIco.className = "boosted-by-ico";
        reblogIco.innerHTML = repeatSvg;
        reblogDiv.appendChild(reblogIco);
        const rebloggedBy = document.createElement("p");
        rebloggedBy.innerHTML = "Boosted by " + getAccountDisplayNameHTML(post.account);
        reblogDiv.appendChild(rebloggedBy);
        const reblogTime = document.createElement("p");
        reblogTime.textContent = relativeTime(new Date(post.created_at));
        reblogTime.className = "reblogged-time";
        reblogDiv.appendChild(reblogTime);
        postBody.appendChild(reblogDiv);
        const rebloggedPostDiv = constructPost(post.reblog);
        rebloggedPostDiv.className += " reblogged-post";
        postBody.appendChild(rebloggedPostDiv);
    }
    else {
        if (isRepliedTo) {
            const avatarDiv = createAvatarDiv(post);
            const avatarLine = document.createElement("div");
            avatarLine.className = "avatar-line";
            avatarDiv.appendChild(avatarLine);
            postDiv.appendChild(avatarDiv);
        }
        const posterInfo = constructPosterInfo(post, isRepliedTo);
        postBody.appendChild(posterInfo);
        const postInnerBody = document.createElement("div");
        postInnerBody.className = "post-inner-body";
        const content = document.createElement("p");
        content.innerHTML = formatInEmojis(post.content, post.emojis);
        content.className = "post-content";
        postInnerBody.appendChild(content);
        const media = document.createElement("div");
        media.className = "post-media";
        if (post.media_attachments.length > 0) {
            post.media_attachments.forEach((attachment) => {
                let mediaItem;
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
                    mediaItem = document.createElement("a");
                }
                mediaItem.src = attachment.remote_url;
                mediaItem.className = "post-media-item";
                if (post.sensitive) {
                    mediaItem.className += " post-media-item-sensitive";
                }
                media.appendChild(mediaItem);
            });
        }
        postInnerBody.appendChild(media);
        if (post.spoiler_text) {
            const spoilerText = document.createElement("p");
            spoilerText.innerText = post.spoiler_text;
            spoilerText.className = "post-spoiler-text";
            postBody.appendChild(spoilerText);
            postBody.className += " post-spoiler";
        }
        postBody.appendChild(postInnerBody);
        let postPoll = constructPostPoll(post);
        if (postPoll)
            postBody.appendChild(postPoll);
        if (post.quote) {
            const quoteDiv = document.createElement("div");
            quoteDiv.className = "post-quote";
            const quoteIco = document.createElement("div");
            quoteIco.className = "post-quote-ico";
            quoteIco.innerHTML = quoteSvg;
            quoteDiv.appendChild(quoteIco);
            const quotePostDiv = constructPost(post.quote, false, true);
            quotePostDiv.className += " quoted-post";
            quoteDiv.appendChild(quotePostDiv);
            postBody.appendChild(quoteDiv);
        }
        const emojiReactionsRow = constructEmojiReactionsRow(post);
        if (emojiReactionsRow)
            postBody.appendChild(emojiReactionsRow);
        if (!isQuoted) {
            const interactionRow = constructInteractionRow(post);
            postBody.appendChild(interactionRow);
        }
    }
    postDiv.appendChild(postBody);
    return postDiv;
}
function constructPostPoll(post) {
    if (post.poll) {
        const pollDiv = document.createElement("div");
        // TODO: polls
        return pollDiv;
    }
    return null;
}
function createAvatarDiv(post) {
    const avatarDiv = document.createElement("div");
    avatarDiv.className = "post-avatar-div";
    const avatarImg = document.createElement("img");
    avatarImg.src = post.account.avatar;
    avatarImg.width = 48;
    avatarImg.height = 48;
    avatarImg.className = "post-avatar";
    avatarDiv.appendChild(avatarImg);
    return avatarDiv;
}
function constructPosterInfo(post, isRepliedTo = false) {
    const postInfoTop = document.createElement("div");
    postInfoTop.className = "post-info-top";
    if (!isRepliedTo) {
        const avatarDiv = createAvatarDiv(post);
        postInfoTop.appendChild(avatarDiv);
    }
    const posterTextInfo = document.createElement("div");
    posterTextInfo.className = "poster-text-info";
    postInfoTop.appendChild(posterTextInfo);
    const col1 = document.createElement("div");
    col1.className = "poster-info-column-1";
    const displayName = document.createElement("p");
    displayName.className = "post-display-name";
    displayName.innerHTML = getAccountDisplayNameHTML(post.account);
    col1.appendChild(displayName);
    let [username, instance] = post.account.acct.split("@");
    const postAcct = document.createElement("a");
    postAcct.href = `/${accountsPath}/${post.account.id}`;
    postAcct.className = "post-acct";
    const acctUsername = document.createElement("span");
    acctUsername.innerText = "@" + username;
    acctUsername.className = "poster-username";
    postAcct.appendChild(acctUsername);
    // todo: is there any other case where instance wouldn't be defined, other than being on the same instance?
    if (!instance) {
        instance = userSelectedInstance;
    }
    const acctInstance = document.createElement("span");
    acctInstance.innerText = "@" + instance;
    acctInstance.className = "poster-instance";
    postAcct.appendChild(acctInstance);
    if (post.account.akkoma) {
        const posterInstanceFavicon = document.createElement("img");
        posterInstanceFavicon.src = post.account.akkoma.instance.favicon;
        posterInstanceFavicon.width = 16;
        posterInstanceFavicon.height = 16;
        posterInstanceFavicon.className = "post-instance-favicon";
        let title = post.account.akkoma.instance.name;
        if (post.account.akkoma.instance.nodeinfo.software &&
            post.account.akkoma.instance.nodeinfo.software.name &&
            post.account.akkoma.instance.nodeinfo.software.version) {
            title +=
                " (" +
                    post.account.akkoma.instance.nodeinfo.software.name +
                    " " +
                    post.account.akkoma.instance.nodeinfo.software.version +
                    ")";
        }
        posterInstanceFavicon.title = title;
        posterInstanceFavicon.ariaHidden = "true";
        postAcct.appendChild(posterInstanceFavicon);
    }
    col1.appendChild(postAcct);
    posterTextInfo.appendChild(col1);
    const col2 = document.createElement("div");
    col2.className = "poster-info-column-2";
    const postTime = document.createElement("p");
    postTime.className = "post-time";
    const postTimeDate = new Date(post.created_at);
    postTime.innerText = relativeTime(postTimeDate);
    postTime.className = "post-time";
    col2.appendChild(postTime);
    const postVisibility = document.createElement("p");
    postVisibility.className = "post-visibility";
    postVisibility.title = post.visibility;
    postVisibility.innerHTML = visilitySvgs[post.visibility];
    col2.appendChild(postVisibility);
    posterTextInfo.appendChild(col2);
    return postInfoTop;
}
function getAccountDisplayNameHTML(account) {
    let displayNameHtml = escapeHTML(account.display_name);
    return formatInEmojis(displayNameHtml, account.emojis);
}
function constructEmojiReactionsRow(post) {
    if (!post.emoji_reactions)
        return null;
    const emojiReactionsRow = document.createElement("div");
    emojiReactionsRow.className = "emoji-reactions-row";
    const emojiReactions = post.emoji_reactions;
    emojiReactions.forEach((emojiReaction) => {
        const emojiReactionDiv = document.createElement("div");
        emojiReactionDiv.className = "emoji-reaction-div";
        if (emojiReaction.url) {
            const emojiReactionImg = document.createElement("img");
            emojiReactionImg.src = emojiReaction.url;
            emojiReactionImg.width = 24;
            emojiReactionImg.height = 24;
            emojiReactionImg.className = "emoji-reaction-img";
            emojiReactionImg.title = emojiReaction.name;
            emojiReactionDiv.appendChild(emojiReactionImg);
        }
        else {
            const emojiReactionSpan = document.createElement("span");
            emojiReactionSpan.innerText = emojiReaction.name;
            emojiReactionSpan.className = "emoji-reaction-span";
            emojiReactionDiv.appendChild(emojiReactionSpan);
        }
        const emojiReactionCount = document.createElement("span");
        emojiReactionCount.innerText = emojiReaction.count;
        emojiReactionCount.className = "emoji-reaction-count";
        emojiReactionDiv.appendChild(emojiReactionCount);
        emojiReactionsRow.appendChild(emojiReactionDiv);
    });
    return emojiReactionsRow;
}
function constructInteractionRow(post) {
    function constructInteractionItem(icon, className, spinny, text) {
        const item = document.createElement("div");
        item.className = "interaction-row-item";
        const hiddenCheckbox = document.createElement("input");
        hiddenCheckbox.type = "checkbox";
        const checkboxId = "interaction-row-item-hidden-checkbox-" + className + "-" + post.id;
        hiddenCheckbox.id = checkboxId;
        hiddenCheckbox.className = "interaction-row-item-hidden-checkbox";
        item.appendChild(hiddenCheckbox);
        const itemIconLabel = document.createElement("label");
        itemIconLabel.htmlFor = checkboxId;
        itemIconLabel.className = "interaction-row-item-icon interaction-row-item-icon-" + className;
        if (spinny) {
            itemIconLabel.className += " spinny-interaction-row-item-icon";
        }
        itemIconLabel.innerHTML = icon;
        item.appendChild(itemIconLabel);
        if (text) {
            const itemText = document.createElement("p");
            itemText.className = "interaction-row-item-text";
            itemText.innerText = text;
            item.appendChild(itemText);
        }
        return item;
    }
    const interactionRow = document.createElement("div");
    interactionRow.className = "interaction-bar";
    const replies = constructInteractionItem(replySvg, "replies", true, String(post.replies_count));
    interactionRow.appendChild(replies);
    const repeats = constructInteractionItem(repeatSvg, "repeats", true, String(post.reblogs_count));
    interactionRow.appendChild(repeats);
    const quote = constructInteractionItem(quoteSvg, "quote");
    interactionRow.appendChild(quote);
    const favourites = constructInteractionItem(favouriteSvg, "favourites", true, String(post.favourites_count));
    interactionRow.appendChild(favourites);
    const react = constructInteractionItem(reactSvg, "react", true);
    interactionRow.appendChild(react);
    const more = constructInteractionItem(elipsisSvg, "more");
    interactionRow.appendChild(more);
    return interactionRow;
}
function formatInEmojis(string, emojis) {
    for (const emoji of emojis) {
        const emojiHtml = escapeHTML(emoji.shortcode);
        const emojiImg = `<img src="${emoji.url}" height="20px" alt="${emojiHtml}" title="${emojiHtml}" class="emoji" />`;
        string = string.replaceAll(`:${emojiHtml}:`, emojiImg);
    }
    return string;
}
// Run the main function
main().catch(console.error);
//# sourceMappingURL=app.js.map