import { fetchIcon } from "./assets";
import { Icon } from "./models/icons";
import { fetchFederatedTimeline, fetchStatusAndContext, fetchStatusById, fetchUserStatuses } from "./fetchStuff";
import { aCreateElement, putChildrenInNewContainer } from "./utils";
import {
	addClasses,
	putChildInCurryContainer,
	putChildrenInCurryContainer,
	putChildrenInNewCurryContainer,
} from "./curryingUtils";

import Status from "./models/status";
import { StatusTreeNode } from "./models/status";
import { Context } from "./models/context";

import * as consts from "./consts";
import Post from "./elements/post/post";
import StandardPost from "./elements/post/standardPost";
import { defineCustomElements } from "./defineCustomElements";
import { newElement } from "./domUtils";

const timelineDiv = document.getElementById("timeline-content")!;
const loadingPostsDiv = document.getElementById("loading-posts")!;

let perfLastTime = performance.now();

/**
 * Main function
 */
async function main() {
	defineCustomElements();

	addEventListener("popstate", () => {
		console.log("popstate");

		doStuffForUrl();
	});

	doStuffForUrl();
}

async function doStuffForUrl() {
	const url = new URL(document.location.href);
	const path = url.pathname.split("/");
	timelineDiv.innerHTML = "";

	perfLastTime = performance.now();

	fetchIconsInAdvance().then(perfMessage("fetchIconsInAdvance"));

	switch (path[1]) {
		case consts.accountsPath: {
			const accountId = path[2]!;
			// todo also display account information, also filter posts n stuff
			fetchUserStatuses(accountId)
				.then(perfMessage("fetchUserStatuses"))
				.then(renderTimeline)
				.then(perfMessage("renderTimeline"));
			break;
		}
		case consts.statusesPath: {
			const statusId = path[2]!;

			const [status, context] = await fetchStatusAndContext(statusId).then(perfMessage("fetchStatusAndContext"));
			const postTrees = await putStatusInContext(status, context)
				.then(buildPostTree)
				.then(perfMessage("buildPostTree"));
			// todo handle quotes

			// /statuses/AYb499YWRvchIjmLiq is a good test
			// /statuses/AammWAgAOKljJYADEu currently breaks
			renderPostTree(postTrees[0]!)
				.then(perfMessage("renderPostTree"))
				.then(putChildrenInCurryContainer(timelineDiv))
				.then(() => {
					scrollToIfReply(status);
					loadingPostsDiv.style.display = "none";
				});

			break;
		}
		default: {
			// todo default should really be an actual 404 page
			fetchFederatedTimeline()
				.then(perfMessage("fetchFederatedTimeline"))
				.then(renderTimeline)
				.then(perfMessage("renderTimeline"));
			break;
		}
	}
}

async function fetchIconsInAdvance() {
	Object.values(Icon).map(fetchIcon);
}

function scrollToIfReply(status: Status) {
	if (status.in_reply_to_id) scrollToElementWithId(status.id);
}

function scrollToElementWithId(id: string) {
	document.getElementById(id)!.scrollIntoView();
}

async function putStatusInContext(status: Status, context: Context) {
	return [...context.ancestors, status, ...context.descendants];
}

function renderTimeline(statuses: Status[]) {
	timelineDiv.innerHTML = "";

	return Promise.all(statuses.map(fetchPostsUpwards))
		.then(perfMessage("fetchPostsUpwards"))
		.then((posts) => Promise.all(posts.map(renderPostGroup)))
		.then(perfMessage("renderPostGroup"))
		.then(putChildrenInCurryContainer(timelineDiv));
}

async function fetchPostsUpwards(post: Status, heightAbove: number = 1): Promise<Status[]> {
	if (post.in_reply_to_id && heightAbove > 0) {
		return fetchStatusById(post.in_reply_to_id)
			.then((fetchedPost) => fetchPostsUpwards(fetchedPost, heightAbove - 1))
			.then((posts) => [...posts, post]);
	} else return [post];
}

async function renderPostGroup(posts: Status[]): Promise<HTMLElement> {
	const postContainer = aCreateElement("div", "post-container");

	if (posts[0]!.in_reply_to_id) {
		constructReplyTopLine(posts[0]!).then(putChildInCurryContainer(await postContainer));
	}

	return Promise.all(posts.map((post, index, { length }) => Post.build(post, index !== length - 1))).then(
		putChildrenInCurryContainer(await postContainer)
	);
}

async function renderPostTree(tree: StatusTreeNode): Promise<HTMLElement[]> {
	const postDiv = StandardPost.newClone();
	postDiv.setData(tree, tree.children && tree.children.length > 0, false);

	if (!tree.children || tree.children.length === 0) {
		return [postDiv];
	} else if (tree.children.length === 1) {
		return [postDiv, ...(await renderPostTree(tree.children[0]!))];
	} else {
		return Promise.all(tree.children.map(renderPostTree))
			.then((children) => children.map(putChildrenInNewCurryContainer("post-child-container")))
			.then((childrenDivs) => Promise.all(childrenDivs.map(putChildrenInContainerWithLine)))
			.then(putChildrenInNewCurryContainer("post-children-container"))
			.then(async (childrenContainer) => {
				return [postDiv, childrenContainer];
			});
	}

	async function putChildrenInContainerWithLine(childrenDiv: HTMLElement) {
		return Promise.all([
			aCreateElement("div", "post-child-line-connector"),
			aCreateElement("div", "post-child-line"),
		])
			.then(putChildrenInNewCurryContainer("post-child-line-container"))
			.then((lineContainer) =>
				putChildrenInNewContainer([lineContainer, childrenDiv], "post-child-container-outer")
			);
	}
}

async function constructReplyTopLine(post: Status) {
	let replyTo = post.mentions.find((mention) => mention.id === post.in_reply_to_account_id);
	// if mention not found, assume they're replying to themselves
	if (!replyTo) replyTo = post.account;

	const line = newElement({ element: "div", className: "avatar-line-top" });
	const icon = newElement({ element: "custom-icon", icon: Icon.Reply });
	addClasses("post-replies-top-icon")(icon);
	const text = newElement({
		element: "a",
		className: "post-replies-top-text",
		href: `/${consts.statusesPath}/${post.in_reply_to_id}`,
		innerText: "Reply to " + replyTo.acct,
	});

	return newElement({
		element: "div",
		className: "post-replies-top",
		children: [line, icon, text],
	});
}

function buildPostTree(statuses: Status[]): StatusTreeNode[] {
	const tree = [] as StatusTreeNode[];
	for (let i = 0; i < statuses.length; i++) {
		if (statuses[i]!.in_reply_to_id) {
			const parent = statuses
				.filter((status) => status.id === statuses[i]!.in_reply_to_id)
				.pop() as StatusTreeNode;
			if (!parent.children) {
				parent.children = [];
			}
			parent.children.push(statuses[i]! as StatusTreeNode);
		} else {
			tree.push(statuses[i]! as StatusTreeNode);
		}
	}
	return tree;
}

function perfMessage(message: string) {
	return async function <T>(value: T) {
		await value;
		console.log(message + " took " + (performance.now() - perfLastTime) + "ms");
		perfLastTime = performance.now();
		return value;
	};
}

// Run the main function
main().catch(console.error);
