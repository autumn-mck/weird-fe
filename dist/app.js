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
    const loopResult = Promise.all(data.map(renderPost));
    loopResult.then((posts) => {
        timelineDiv.innerHTML = "";
        posts.forEach((post) => {
            timelineDiv.appendChild(post);
        });
        endTime = performance.now();
        console.log("rendered posts in " + (endTime - startTime) + "ms");
    });
}
async function renderPost(post) {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    const postDivs = await renderPostUpwards(post, 1, false);
    postDivs.forEach((postDiv) => {
        postContainer.appendChild(postDiv);
    });
    return Promise.resolve(postContainer);
}
async function renderPostUpwards(post, heightAbove, inludeSpaceForAvatarLine = true) {
    const postDiv = (await constructPost(post, inludeSpaceForAvatarLine));
    if (post.in_reply_to_id) {
        if (heightAbove > 0) {
            const postAbove = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + post.in_reply_to_id);
            const posts = await renderPostUpwards(postAbove, heightAbove - 1);
            posts[posts.length - 1].className += " post-replied-to";
            posts.push(postDiv);
            return posts;
        }
        else {
            postDiv.className += " post-reply-top";
            const repliesTopDiv = await constructReplyTopLine(post);
            return [repliesTopDiv, postDiv];
        }
    }
    return [postDiv];
}
async function constructReplyTopLine(post) {
    const avatarLineContainer = createElement("div", "avatar-line-container");
    avatarLineContainer.appendChild(createElement("div", "avatar-line-top"));
    const replyIco = await getIcon(Icon.Reply);
    replyIco.className = "post-replies-top-icon";
    const repliesTopText = createElement("a", "post-replies-top-text");
    repliesTopText.href = "/" + consts.statusesPath + "/" + post.id;
    const replyTo = post.mentions.find((mention) => mention.id === post.in_reply_to_account_id);
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