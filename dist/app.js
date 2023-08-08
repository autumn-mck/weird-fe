import { fetchJsonAsync, createElement } from "./utils.js";
import { constructPost } from "./postRendering.js";
import { getIcon } from "./assets.js";
import * as consts from "./consts.js";
import { Icon } from "./models/icons.js";
const timelineDiv = document.getElementById("timeline-content");
/**
 * Main function
 */
async function main() {
    document.location;
    let startTime = performance.now();
    const data = await getDataForUrl();
    let endTime = performance.now();
    timelineDiv.innerHTML = "constructing posts...";
    console.log("fetched data in " + (endTime - startTime) + "ms");
    startTime = performance.now();
    console.log("fetching posts being replied to...");
    startTime = performance.now();
    Promise.all(data.map((post) => fetchPostsUpwards(post))).then((posts) => {
        endTime = performance.now();
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
async function getDataForUrl() {
    let data;
    const url = new URL(document.location.href);
    const path = url.pathname.split("/");
    if (path[1] === consts.accountsPath) {
        const account = path[2];
        //data = await fetchJsonAsync(instance + "/api/v1/accounts/" + account);
        data = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/accounts/" + account + "/statuses");
    }
    else {
        data = fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/timelines/public");
    }
    return data;
}
// Run the main function
main().catch(console.error);
//# sourceMappingURL=app.js.map