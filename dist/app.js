import { fetchJsonAsync } from "./utils.js";
import { constructPost } from "./postRendering.js";
import * as consts from "./consts.js";
const timelineDiv = document.getElementById("timeline-content");
/**
 * Main function
 */
async function main() {
    document.location;
    let startTime = performance.now();
    const data = await getDataForUrl();
    let endTime = performance.now();
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
    const postDiv = await constructPost(post);
    if (post.in_reply_to_id) {
        const postReplyTo = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + post.in_reply_to_id);
        console.log(postReplyTo);
        const postReplyToDiv = await constructPost(postReplyTo, true);
        postReplyToDiv.className += " post-replied-to";
        if (postReplyTo.in_reply_to_id) {
            postReplyToDiv.className += " post-reply-top";
            const repliesTopDiv = document.createElement("div");
            repliesTopDiv.className = "post-replies-top";
            const avatarLineContainer = document.createElement("div");
            avatarLineContainer.className = "avatar-line-container";
            const avatarLine = document.createElement("div");
            avatarLine.className = "avatar-line-top";
            avatarLineContainer.appendChild(avatarLine);
            repliesTopDiv.appendChild(avatarLineContainer);
            const repliesTopText = document.createElement("span");
            repliesTopText.className = "post-replies-top-text";
            console.log(postReplyTo.mentions);
            console.log(postReplyTo.in_reply_to_id);
            const replyTo = postReplyTo.mentions.find((mention) => mention.id === postReplyTo.in_reply_to_account_id);
            repliesTopText.innerText = "Reply to " + replyTo.acct;
            repliesTopDiv.appendChild(repliesTopText);
            postContainer.appendChild(repliesTopDiv);
        }
        postContainer.appendChild(postReplyToDiv);
    }
    postContainer.appendChild(postDiv);
    return Promise.resolve(postContainer);
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