import { fetchJsonAsync } from "./utils.js";
import { constructPost } from "./postRendering.js";
import * as consts from "./consts.js";
const timelineDiv = document.getElementById("timeline");
/**
 * Main function
 */
async function main() {
    document.location;
    const data = await getDataForUrl();
    timelineDiv.innerHTML = "";
    data.forEach(async (post) => {
        const postContainer = document.createElement("div");
        postContainer.className = "post-container";
        const postDiv = await constructPost(post);
        if (post.in_reply_to_id) {
            const postReplyTo = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + post.in_reply_to_id);
            console.log(postReplyTo);
            const postReplyToDiv = await constructPost(postReplyTo, true);
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