import { fetchJsonAsync, createElement, putChildrenInContainer } from "./utils.js";
import { constructPost } from "./postRendering.js";
import { getIcon } from "./assets.js";
import * as consts from "./consts.js";
import { Icon } from "./models/icons.js";
const timelineDiv = document.getElementById("timeline-content");
const loadingPostsDiv = document.getElementById("loading-posts");
/**
 * Main function
 */
async function main() {
    doStuffForUrl();
}
function renderTimeline(statuses) {
    timelineDiv.innerHTML = "constructing posts...";
    Promise.all(statuses.map(fetchPostsUpwards))
        .then((posts) => {
        return Promise.all(posts.map(renderPostGroup));
    })
        .then((postDivs) => {
        timelineDiv.innerHTML = "";
        postDivs.forEach((postDiv) => timelineDiv.appendChild(postDiv));
    });
}
async function fetchPostsUpwards(post, heightAbove = 1) {
    if (post.in_reply_to_id && heightAbove > 0) {
        const postAbove = await fetchPostById(post.in_reply_to_id);
        const posts = await fetchPostsUpwards(postAbove, heightAbove - 1);
        posts.push(post);
        return posts;
    }
    else
        return [post];
}
async function fetchPostById(id) {
    return await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + id);
}
async function fetchContextByPostId(id) {
    return await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + id + "/context");
}
async function renderPostGroup(posts) {
    const postContainer = createElement("div", "post-container");
    if (posts[0].in_reply_to_id) {
        const repliesTopDiv = await constructReplyTopLine(posts[0]);
        postContainer.appendChild(repliesTopDiv);
    }
    return Promise.all(posts.map((post, index, { length }) => constructPost(post, index !== length - 1))).then((postDivs) => {
        postDivs.forEach((postDiv) => {
            postContainer.appendChild(postDiv);
        });
        return Promise.resolve(postContainer);
    });
}
async function renderPostTree(tree) {
    const postDiv = await constructPost(tree, tree.children && tree.children.length > 0);
    if (!tree.children || tree.children.length === 0) {
        return [postDiv];
    }
    else if (tree.children.length === 1) {
        return [postDiv, ...(await renderPostTree(tree.children[0]))];
    }
    else {
        return Promise.all(tree.children.map(renderPostTree))
            .then((children) => children.map((child) => putChildrenInContainer(child, "post-child-container")))
            .then((childrenDivs) => childrenDivs.map(putChildrenInContainerWithLine))
            .then((childrenDivs) => putChildrenInContainer(childrenDivs, "post-children-container"))
            .then((childrenContainer) => {
            return [postDiv, childrenContainer];
        });
    }
    function putChildrenInContainerWithLine(childrenDiv) {
        let lineContainer = createElement("div", "post-child-line-container");
        lineContainer.appendChild(createElement("div", "post-child-line-connector"));
        lineContainer.appendChild(createElement("div", "post-child-line"));
        let postChildOuter = createElement("div", "post-child-container-outer");
        postChildOuter.appendChild(lineContainer);
        postChildOuter.appendChild(childrenDiv);
        return postChildOuter;
    }
}
async function constructReplyTopLine(post) {
    const avatarLineContainer = createElement("div", "avatar-line-container");
    avatarLineContainer.appendChild(createElement("div", "avatar-line-top"));
    const replyIco = await getIcon(Icon.Reply);
    replyIco.className = "post-replies-top-icon";
    const repliesTopText = createElement("a", "post-replies-top-text");
    repliesTopText.href = "/" + consts.statusesPath + "/" + post.in_reply_to_id;
    let replyTo = post.mentions.find((mention) => mention.id === post.in_reply_to_account_id);
    // if mention not found, assume they're replying to themselves
    if (!replyTo)
        replyTo = post.account;
    repliesTopText.innerText = "Reply to " + replyTo.acct;
    const repliesTopDiv = document.createElement("div");
    repliesTopDiv.className = "post-replies-top";
    repliesTopDiv.appendChild(avatarLineContainer);
    repliesTopDiv.appendChild(replyIco);
    repliesTopDiv.appendChild(repliesTopText);
    return repliesTopDiv;
}
async function doStuffForUrl() {
    const url = new URL(document.location.href);
    const path = url.pathname.split("/");
    switch (path[1]) {
        case consts.accountsPath:
            const accountId = path[2];
            // todo also display account information, also filter posts n stuff
            let accountStatuses = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/accounts/" + accountId + "/statuses");
            renderTimeline(accountStatuses);
            break;
        case consts.statusesPath:
            const statusId = path[2];
            Promise.all([fetchPostById(statusId), fetchContextByPostId(statusId)])
                .then(([status, context]) => [status, [...context.ancestors, status, ...context.descendants]])
                .then(([status, flatStatuses]) => [status, buildPostTree(flatStatuses)])
                .then(async ([status, tree]) => [status, await renderPostTree(tree[0])])
                .then(async ([status, postDivs]) => {
                postDivs.forEach((postDiv) => timelineDiv.appendChild(postDiv));
                return status;
            })
                .then((status) => {
                if (status.in_reply_to_id !== null)
                    document.getElementById("post-" + status.id).scrollIntoView();
                loadingPostsDiv.style.display = "none";
            });
            break;
        default:
            let timelinePosts = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/timelines/public");
            renderTimeline(timelinePosts);
            break;
    }
}
function buildPostTree(statuses) {
    let tree = [];
    for (let i = 0; i < statuses.length; i++) {
        if (statuses[i].in_reply_to_id) {
            let parent = statuses.filter((status) => status.id === statuses[i].in_reply_to_id).pop();
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
// Run the main function
main().catch(console.error);
//# sourceMappingURL=app.js.map