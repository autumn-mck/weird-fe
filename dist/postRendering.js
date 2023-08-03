import { getIcon, getIconForVisibility } from "./assets.js";
import { getAccountDisplayNameHTML, formatInEmojis, relativeTime } from "./utils.js";
import * as consts from "./consts.js";
import { Icon } from "./models/icons.js";
export async function constructPost(post, isRepliedTo = false, isQuoted = false) {
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
        reblogIco.innerHTML = await getIcon(Icon.Boost);
        reblogDiv.appendChild(reblogIco);
        const rebloggedBy = document.createElement("p");
        rebloggedBy.innerHTML = "Boosted by " + getAccountDisplayNameHTML(post.account);
        reblogDiv.appendChild(rebloggedBy);
        const reblogTime = document.createElement("p");
        reblogTime.textContent = relativeTime(new Date(post.created_at));
        reblogTime.className = "reblogged-time";
        reblogDiv.appendChild(reblogTime);
        postBody.appendChild(reblogDiv);
        const rebloggedPostDiv = await constructPost(post.reblog);
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
        const posterInfo = await constructPosterInfo(post, isRepliedTo);
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
                    throw new Error("Unknown media type: " + attachment.type);
                }
                mediaItem.src = attachment.url;
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
            quoteIco.innerHTML = await getIcon(Icon.Quote);
            quoteDiv.appendChild(quoteIco);
            const quotePostDiv = await constructPost(post.quote, false, true);
            quotePostDiv.className += " quoted-post";
            quoteDiv.appendChild(quotePostDiv);
            postBody.appendChild(quoteDiv);
        }
        const emojiReactionsRow = constructEmojiReactionsRow(post);
        if (emojiReactionsRow)
            postBody.appendChild(emojiReactionsRow);
        if (!isQuoted) {
            const interactionRow = await constructInteractionRow(post);
            postBody.appendChild(interactionRow);
        }
    }
    postDiv.appendChild(postBody);
    return postDiv;
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
async function constructInteractionRow(post) {
    async function constructInteractionItem(icon, className, spinny, text) {
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
        itemIconLabel.innerHTML = await getIcon(icon);
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
    const replies = await constructInteractionItem(Icon.Reply, "replies", true, String(post.replies_count));
    interactionRow.appendChild(replies);
    const repeats = await constructInteractionItem(Icon.Boost, "repeats", true, String(post.reblogs_count));
    interactionRow.appendChild(repeats);
    const quote = await constructInteractionItem(Icon.Quote, "quote");
    interactionRow.appendChild(quote);
    const favourites = await constructInteractionItem(Icon.Favourite, "favourites", true, String(post.favourites_count));
    interactionRow.appendChild(favourites);
    const react = await constructInteractionItem(Icon.AddReaction, "react", true);
    interactionRow.appendChild(react);
    const more = await constructInteractionItem(Icon.More, "more");
    interactionRow.appendChild(more);
    return interactionRow;
}
async function constructPosterInfo(post, isRepliedTo = false) {
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
    postAcct.href = `/${consts.accountsPath}/${post.account.id}`;
    postAcct.className = "post-acct";
    const acctUsername = document.createElement("span");
    acctUsername.innerText = "@" + username;
    acctUsername.className = "poster-username";
    postAcct.appendChild(acctUsername);
    // todo: is there any other case where instance wouldn't be defined, other than being on the same instance?
    if (!instance) {
        instance = consts.userSelectedInstance;
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
    postVisibility.innerHTML = await getIconForVisibility(post.visibility);
    col2.appendChild(postVisibility);
    posterTextInfo.appendChild(col2);
    return postInfoTop;
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
//# sourceMappingURL=postRendering.js.map