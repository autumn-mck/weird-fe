import { aCreateElement } from "./utils.js";
import { putChildrenInNewCurryContainer, addClasses, setId, setInnerText } from "./curryingUtils.js";

import { Status } from "./models/status";

import BoostedBy from "./elements/post/boostedBy.js";
import InteractionsRow from "./elements/post/interactionsRow.js";
import AvatarWithPreview from "./elements/post/avatarWithPreview.js";
import PosterInfo from "./elements/post/posterInfo.js";
import PostTextContent from "./elements/post/postTextContent.js";
import QuotedPost from "./elements/post/quotedPost.js";
import EmojiReactionsRow from "./elements/post/emojiReactionsRow.js";
import PostMedia from "./elements/post/postMedia.js";

export async function constructPost(post: Status, inludeSpaceForAvatarLine = false, isQuoted = false) {
	return await (post.reblog ? constructBoost(post) : constructStandardPost(inludeSpaceForAvatarLine, post, isQuoted))
		.then(putChildrenInNewCurryContainer("post"))
		.then(setId("post-" + post.id));
}

function constructStandardPost(inludeSpaceForAvatarLine: boolean, post: Status, isQuoted: boolean) {
	return Promise.all([
		inludeSpaceForAvatarLine ? AvatarWithPreview.build(post.account, inludeSpaceForAvatarLine) : "",
		constructStandardPostBody(post, inludeSpaceForAvatarLine, isQuoted),
	]);
}

function constructStandardPostBody(post: Status, inludeSpaceForAvatarLine: boolean, isQuoted: boolean): Promise<HTMLElement> {
	return Promise.all([
		PosterInfo.build(post, !inludeSpaceForAvatarLine),
		post.spoiler_text ? aCreateElement("p", "post-spoiler-text").then(setInnerText(post.spoiler_text)) : "",
		createPostInnerBody(post),

		!isQuoted && post.emoji_reactions && post.emoji_reactions.length > 0 ? EmojiReactionsRow.build(post.emoji_reactions) : "",
		!isQuoted ? InteractionsRow.build(post) : "",
	])
		.then(putChildrenInNewCurryContainer("post-body"))
		.then((postBody) => {
			if (post.spoiler_text) postBody.className += " post-spoiler";
			return postBody;
		});
}

function constructBoost(post: Status): Promise<HTMLElement[]> {
	return Promise.all([BoostedBy.build(post), constructPost(post.reblog!).then(addClasses("boosted-post"))])
		.then(putChildrenInNewCurryContainer("post-body"))
		.then((body) => [body]);
}

function createPostInnerBody(post: Status): Promise<HTMLElement> {
	return Promise.all([
		PostTextContent.build(post.content, post.emojis),
		post.media_attachments && post.media_attachments.length > 0 ? PostMedia.build(post.media_attachments, post.sensitive) : "",
		post.poll ? "TODO: poll" : "",
		post.quote ? QuotedPost.build(post.quote) : "",
	]).then(putChildrenInNewCurryContainer("post-inner-body"));
}
