import { fetchJsonAsync, createElement } from "./utils.js";
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
    console.log("fetching posts being replied to...");
    let startTime = performance.now();
    Promise.all(statuses.map((post) => fetchPostsUpwards(post))).then((posts) => {
        let endTime = performance.now();
        console.log("fetched posts replied to in " + (endTime - startTime) + "ms");
        startTime = performance.now();
        console.log("rendering posts...");
        Promise.all(posts.map(renderPostGroup)).then((postDivs) => {
            endTime = performance.now();
            console.log("rendered posts in " + (endTime - startTime) + "ms");
            timelineDiv.innerHTML = "";
            postDivs.forEach((postDiv) => timelineDiv.appendChild(postDiv));
        });
    });
}
async function fetchPostsUpwards(post, heightAbove = 1) {
    const posts = [];
    if (post.in_reply_to_id) {
        if (heightAbove > 0) {
            const postAbove = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + post.in_reply_to_id);
            const postsAbove = await fetchPostsUpwards(postAbove, heightAbove - 1);
            posts.push(...postsAbove);
        }
    }
    posts.push(post);
    return posts;
}
async function renderPostGroup(posts) {
    const postContainer = createElement("div", "post-container");
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postDiv = await constructPost(post, i !== posts.length - 1);
        if (i === 0 && post.in_reply_to_id) {
            postDiv.className += " post-reply-top";
            const repliesTopDiv = await constructReplyTopLine(post);
            postContainer.appendChild(repliesTopDiv);
        }
        postContainer.appendChild(postDiv);
    }
    return Promise.resolve(postContainer);
}
async function renderPostTree(tree) {
    const postDiv = await constructPost(tree, tree.children && tree.children.length > 0);
    if (!tree.children || tree.children.length === 0)
        return [postDiv];
    else if (tree.children.length === 1) {
        return [postDiv, ...(await renderPostTree(tree.children[0]))];
    }
    else {
        let childrenContainer = createElement("div", "post-children-container");
        for (let i = 0; i < tree.children.length; i++) {
            let children = await renderPostTree(tree.children[i]);
            let childrenDiv = createElement("div", "post-child-container");
            children.forEach((child) => {
                childrenDiv.appendChild(child);
            });
            let lineContainer = createElement("div", "post-child-line-container");
            lineContainer.appendChild(createElement("div", "post-child-line-connector"));
            lineContainer.appendChild(createElement("div", "post-child-line"));
            let postChildOuter = createElement("div", "post-child-container-outer");
            postChildOuter.appendChild(lineContainer);
            postChildOuter.appendChild(childrenDiv);
            childrenContainer.appendChild(postChildOuter);
        }
        return [postDiv, childrenContainer];
    }
}
async function constructReplyTopLine(post) {
    const avatarLineContainer = createElement("div", "avatar-line-container");
    avatarLineContainer.appendChild(createElement("div", "avatar-line-top"));
    const replyIco = await getIcon(Icon.Reply);
    replyIco.className = "post-replies-top-icon";
    const repliesTopText = createElement("a", "post-replies-top-text");
    repliesTopText.href = "/" + consts.statusesPath + "/" + post.id;
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
    if (path[1] === consts.accountsPath) {
        // todo: be more careful with this? currently too tired to check if this could possibly be a security issue
        // (writing code while being too tired to check its security risks is a flawless idea)
        const accountId = path[2];
        // todo also display account information
        //data = await fetchJsonAsync(instance + "/api/v1/accounts/" + account);
        let data = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/accounts/" + accountId + "/statuses");
        renderTimeline(data);
    }
    else if (path[1] === consts.statusesPath) {
        const statusId = path[2];
        let startTime = performance.now();
        let status = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + statusId);
        let context = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + statusId + "/context");
        let endTime = performance.now();
        console.log("fetched post and context in " + (endTime - startTime) + "ms");
        console.log(context);
        startTime = performance.now();
        let statuses = context.ancestors;
        statuses.push(status);
        statuses.push(...context.descendants);
        let tree = buildPostTree(statuses);
        console.log(tree);
        endTime = performance.now();
        console.log("built post tree in " + (endTime - startTime) + "ms");
        startTime = performance.now();
        timelineDiv.innerHTML = "";
        let postDivs = await renderPostTree(tree[0]);
        postDivs.forEach((postDiv) => timelineDiv.appendChild(postDiv));
        endTime = performance.now();
        console.log("rendered posts in " + (endTime - startTime) + "ms");
        if (status.in_reply_to_id !== null)
            document.getElementById("post-" + statusId).scrollIntoView();
        loadingPostsDiv.style.display = "none";
    }
    else {
        let data = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/timelines/public");
        renderTimeline(data);
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