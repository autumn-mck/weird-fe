import { Status } from "./models/status";
import { fetchJsonAsync, createElement } from "./utils.js";
import { constructPost } from "./postRendering.js";
import { getIcon } from "./assets.js";
import * as consts from "./consts.js";
import { Icon } from "./models/icons.js";
import { Context } from "./models/context";

const timelineDiv = document.getElementById("timeline-content")!;

/**
 * Main function
 */
async function main() {
	doStuffForUrl();
}

function renderTimeline(statuses: Status[]) {
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

async function fetchPostsUpwards(post: Status, heightAbove: number = 1): Promise<Status[]> {
	const posts: Status[] = [];

	if (post.in_reply_to_id) {
		if (heightAbove > 0) {
			const postAbove: Status = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + post.in_reply_to_id);
			const postsAbove = await fetchPostsUpwards(postAbove, heightAbove - 1);
			posts.push(...postsAbove);
		}
	}

	posts.push(post);
	return posts;
}

async function renderPostGroup(posts: Status[]): Promise<HTMLDivElement> {
	const postContainer = createElement("div", "post-container") as HTMLDivElement;

	for (let i = 0; i < posts.length; i++) {
		const post = posts[i]!;

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

async function constructReplyTopLine(post: Status) {
	const avatarLineContainer = createElement("div", "avatar-line-container");
	avatarLineContainer.appendChild(createElement("div", "avatar-line-top"));

	const replyIco = await getIcon(Icon.Reply);
	replyIco.className = "post-replies-top-icon";

	const repliesTopText = createElement("a", "post-replies-top-text") as HTMLAnchorElement;
	repliesTopText.href = "/" + consts.statusesPath + "/" + post.id;
	let replyTo = post.mentions.find((mention) => mention.id === post.in_reply_to_account_id);
	// if mention not found, assume they're replying to themselves
	if (!replyTo) replyTo = post.account;

	repliesTopText.innerText = "Reply to " + replyTo!.acct;

	const repliesTopDiv = document.createElement("div");
	repliesTopDiv.className = "post-replies-top";
	repliesTopDiv.appendChild(avatarLineContainer);
	repliesTopDiv.appendChild(replyIco);

	repliesTopDiv.appendChild(repliesTopText);
	return repliesTopDiv;
}

async function doStuffForUrl() {
	let data;
	const url = new URL(document.location.href);
	const path = url.pathname.split("/");

	if (path[1] === consts.accountsPath) {
		// todo: be more careful with this? currently too tired to check if this could possibly be a security issue
		// (writing code while being too tired to check its security risks is a flawless idea)
		const accountId = path[2];
		// todo also display account information
		//data = await fetchJsonAsync(instance + "/api/v1/accounts/" + account);
		let data: Status[] = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/accounts/" + accountId + "/statuses");
		renderTimeline(data);
	} else if (path[1] === consts.statusesPath) {
		const statusId = path[2];
		let data: Context = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + statusId + "/context");
		let statuses = data.ancestors.concat(data.descendants);
		timelineDiv.innerHTML = "";
		timelineDiv.appendChild(await renderPostGroup(statuses));
	} else {
		let data: Status[] = await fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/timelines/public");
		renderTimeline(data);
	}

	return data;
}

// Run the main function
main().catch(console.error);
