import { getIcon } from "./assets.js";
import { Icon } from "./models/icons.js";
import { fetchFederatedTimeline, fetchStatusAndContext, fetchStatusById, fetchUserStatuses } from "./fetchStuff.js";
import { aCreateElement, clone, putChildrenInNewContainer } from "./utils.js";
import { addClasses, putChildInCurryContainer, putChildInNewCurryContainer, putChildrenInCurryContainer, putChildrenInNewCurryContainer, setAnchorHref, setInnerText, } from "./curryingUtils.js";
import * as consts from "./consts.js";
import InteractionItem from "./elements/post/postInteractionItem.js";
import BoostedBy from "./elements/post/boostedBy.js";
import UsernameAcct from "./elements/account/usernameAcct.js";
import InteractionsRow from "./elements/post/interactionsRow.js";
import ProfilePreview from "./elements/account/profilePreview.js";
import Avatar from "./elements/account/avatar.js";
import AvatarWithPreview from "./elements/post/avatarWithPreview.js";
import PosterInfo from "./elements/post/posterInfo.js";
import DisplayName from "./elements/account/displayName.js";
import PostMediaItem from "./elements/post/postMediaItem.js";
import EmojiReaction from "./elements/post/emojiReaction.js";
import PostTextContent from "./elements/post/postTextContent.js";
import QuotedPost from "./elements/post/quotedPost.js";
import EmojiReactionsRow from "./elements/post/emojiReactionsRow.js";
import PostMedia from "./elements/post/postMedia.js";
import Post from "./elements/post/post.js";
const timelineDiv = document.getElementById("timeline-content");
const loadingPostsDiv = document.getElementById("loading-posts");
let perfLastTime = performance.now();
/**
 * Main function
 */
async function main() {
    defineCustomElements();
    doStuffForUrl();
}
function defineCustomElements() {
    customElements.define("x-avatar", Avatar);
    customElements.define("display-name", DisplayName);
    customElements.define("profile-preview", ProfilePreview);
    customElements.define("username-acct", UsernameAcct);
    customElements.define("avatar-with-preview", AvatarWithPreview);
    customElements.define("boosted-by", BoostedBy);
    customElements.define("emoji-reaction", EmojiReaction);
    customElements.define("emoji-reactions-row", EmojiReactionsRow);
    customElements.define("post-interactions-row", InteractionsRow);
    customElements.define("post-text-content", PostTextContent);
    customElements.define("x-post", Post);
    customElements.define("poster-info", PosterInfo);
    customElements.define("post-interaction-item", InteractionItem);
    customElements.define("post-media", PostMedia);
    customElements.define("post-media-item", PostMediaItem);
    customElements.define("quoted-post", QuotedPost);
}
async function doStuffForUrl() {
    const url = new URL(document.location.href);
    const path = url.pathname.split("/");
    perfLastTime = performance.now();
    switch (path[1]) {
        case consts.accountsPath: {
            const accountId = path[2];
            // todo also display account information, also filter posts n stuff
            fetchUserStatuses(accountId)
                .then(perfMessage("fetchUserStatuses"))
                .then(renderTimeline)
                .then(perfMessage("renderTimeline"));
            break;
        }
        case consts.statusesPath: {
            const statusId = path[2];
            const [status, context] = await fetchStatusAndContext(statusId).then(perfMessage("fetchStatusAndContext"));
            const postTrees = await putStatusInContext(status, context).then(buildPostTree).then(perfMessage("buildPostTree"));
            // todo handle quotes
            // /statuses/AYb499YWRvchIjmLiq is a good test
            renderPostTree(postTrees[0])
                .then(perfMessage("renderPostTree"))
                .then(putChildrenInCurryContainer(timelineDiv))
                .then(() => {
                scrollToIfReply(status);
                loadingPostsDiv.style.display = "none";
            });
            break;
        }
        default: {
            fetchFederatedTimeline()
                .then(perfMessage("fetchFederatedTimeline"))
                .then(renderTimeline)
                .then(perfMessage("renderTimeline"));
            break;
        }
    }
}
function scrollToIfReply(status) {
    if (status.in_reply_to_id)
        scrollToElementWithId("post-" + status.id);
}
function scrollToElementWithId(id) {
    document.getElementById(id).scrollIntoView();
}
async function putStatusInContext(status, context) {
    return [...context.ancestors, status, ...context.descendants];
}
function renderTimeline(statuses) {
    timelineDiv.innerHTML = "";
    return Promise.all(statuses.map(fetchPostsUpwards))
        .then(perfMessage("fetchPostsUpwards"))
        .then((posts) => Promise.all(posts.map(renderPostGroup)))
        .then(perfMessage("renderPostGroup"))
        .then(putChildrenInCurryContainer(timelineDiv));
}
async function fetchPostsUpwards(post, heightAbove = 1) {
    if (post.in_reply_to_id && heightAbove > 0) {
        return fetchStatusById(post.in_reply_to_id)
            .then((fetchedPost) => fetchPostsUpwards(fetchedPost, heightAbove - 1))
            .then((posts) => [...posts, post]);
    }
    else
        return [post];
}
async function renderPostGroup(posts) {
    const postContainer = aCreateElement("div", "post-container");
    if (posts[0].in_reply_to_id) {
        constructReplyTopLine(posts[0]).then(putChildInCurryContainer(await postContainer));
    }
    return Promise.all(posts.map((post, index, { length }) => Post.build(post, index !== length - 1))).then(putChildrenInCurryContainer(await postContainer));
}
async function renderPostTree(tree) {
    const postDiv = Post.build(tree, tree.children && tree.children.length > 0);
    if (!tree.children || tree.children.length === 0) {
        return [await postDiv];
    }
    else if (tree.children.length === 1) {
        return [await postDiv, ...(await renderPostTree(tree.children[0]))];
    }
    else {
        return Promise.all(tree.children.map(renderPostTree))
            .then((children) => children.map(putChildrenInNewCurryContainer("post-child-container")))
            .then((childrenDivs) => Promise.all(childrenDivs.map(putChildrenInContainerWithLine)))
            .then(putChildrenInNewCurryContainer("post-children-container"))
            .then(async (childrenContainer) => {
            return [await postDiv, childrenContainer];
        });
    }
    async function putChildrenInContainerWithLine(childrenDiv) {
        return Promise.all([aCreateElement("div", "post-child-line-connector"), aCreateElement("div", "post-child-line")])
            .then(putChildrenInNewCurryContainer("post-child-line-container"))
            .then((lineContainer) => putChildrenInNewContainer([lineContainer, childrenDiv], "post-child-container-outer"));
    }
}
async function constructReplyTopLine(post) {
    let replyTo = post.mentions.find((mention) => mention.id === post.in_reply_to_account_id);
    // if mention not found, assume they're replying to themselves
    if (!replyTo)
        replyTo = post.account;
    return Promise.all([
        aCreateElement("div", "avatar-line-top")
            .then(putChildInNewCurryContainer("avatar-line-container"))
            .then(perfMessage("avatar-line-container")),
        getIcon(Icon.Reply).then(clone).then(addClasses("post-replies-top-icon")),
        aCreateElement("a", "post-replies-top-text")
            .then(setAnchorHref(`/${consts.statusesPath}/${post.in_reply_to_id}`))
            .then(setInnerText("Reply to " + replyTo.acct)),
    ]).then(putChildrenInNewCurryContainer("post-replies-top"));
}
function buildPostTree(statuses) {
    const tree = [];
    for (let i = 0; i < statuses.length; i++) {
        if (statuses[i].in_reply_to_id) {
            const parent = statuses.filter((status) => status.id === statuses[i].in_reply_to_id).pop();
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(statuses[i]);
        }
        else {
            tree.push(statuses[i]);
        }
    }
    return tree;
}
function perfMessage(message) {
    return async function (value = undefined) {
        await value;
        console.log(message + " took " + (performance.now() - perfLastTime) + "ms");
        perfLastTime = performance.now();
        return value;
    };
}
// Run the main function
main().catch(console.error);
//# sourceMappingURL=app.js.map