import { formatInEmojis, aCreateElement } from "./utils.js";
import {
	putChildrenInNewCurryContainer,
	setInnerHTML,
	addClasses,
	putChildInNewCurryContainer,
	putChildInCurryContainer,
	setId,
} from "./curryingUtils.js";

import { Status } from "./models/status";
import { MediaAttatchment } from "./models/mediaAttatchment";
import { Account } from "./models/account";

import BoostedBy from "./elements/post/boostedBy.js";
import InteractionsRow from "./elements/post/interactionsRow.js";
import AvatarWithPreview from "./elements/post/avatarWithPreview.js";
import PosterInfo from "./elements/post/posterInfo.js";
import PostMediaItem from "./elements/post/postMediaItem.js";
import EmojiReaction from "./elements/post/emojiReaction.js";

export async function constructPost(post: Status, inludeSpaceForAvatarLine = false, isQuoted = false) {
	return await (post.reblog ? constructBoost(post) : constructStandardPost(inludeSpaceForAvatarLine, post, isQuoted))
		.then(putChildrenInNewCurryContainer("post"))
		.then(setId("post-" + post.id));
}

function constructStandardPost(inludeSpaceForAvatarLine: boolean, post: Status, isQuoted: boolean) {
	return Promise.all([
		createPostAvatarDiv(inludeSpaceForAvatarLine, post.account),
		constructStandardPostBody(post, inludeSpaceForAvatarLine, isQuoted),
	]);
}

function constructStandardPostBody(post: Status, inludeSpaceForAvatarLine: boolean, isQuoted: boolean): Promise<HTMLElement> {
	return Promise.all([
		PosterInfo.build(post, !inludeSpaceForAvatarLine),
		createPostSpoiler(post.spoiler_text),
		createPostInnerBody(post),

		!isQuoted ? constructEmojiReactionsRow(post.emoji_reactions) : "",
		!isQuoted ? InteractionsRow.build(post) : "",
	])
		.then(putChildrenInNewCurryContainer("post-body"))
		.then((postBody) => {
			if (post.spoiler_text) postBody.className += " post-spoiler";
			return postBody;
		});
}

function constructBoost(post: Status): Promise<HTMLElement[]> {
	return Promise.all([constructBoostInfo(post), constructPost(post.reblog!).then(addClasses("boosted-post"))])
		.then(putChildrenInNewCurryContainer("post-body"))
		.then((body) => [body]);
}

function createPostInnerBody(post: Status): Promise<HTMLElement> {
	return Promise.all([
		aCreateElement("p", "post-content").then(setInnerHTML(formatInEmojis(post.content, post.emojis))),
		contstructMedia(post.media_attachments, post.sensitive),
		constructPostPoll(post),
		createPostQuoteDiv(post.quote),
	]).then(putChildrenInNewCurryContainer("post-inner-body"));
}

async function createPostSpoiler(spoiler: string) {
	if (!spoiler) return "";
	else return aCreateElement("p", "post-spoiler-text").then(setInnerHTML(spoiler));
}

async function createPostQuoteDiv(postQuote: Status | null | undefined) {
	if (!postQuote) return "";
	else
		return constructPost(postQuote, false, true).then(addClasses("quoted-post")).then(putChildInNewCurryContainer("post-quote"));
}

async function createPostAvatarDiv(inludeSpaceForAvatarLine: boolean, account: Account): Promise<HTMLElement | string> {
	if (!inludeSpaceForAvatarLine) return "";
	else
		return aCreateElement("div", "avatar-line").then(
			putChildInCurryContainer(await AvatarWithPreview.build(account, inludeSpaceForAvatarLine))
		);
}

async function constructBoostInfo(post: Status) {
	if (!post.reblog) return "";

	console.log(post);

	return BoostedBy.build(post);
}

async function contstructMedia(attachments: MediaAttatchment[], isSensitive: boolean) {
	const maxItemsInRow = 3;

	if (!attachments || attachments.length < 1) return "";
	else
		return Promise.all(attachments.map((attatchment) => PostMediaItem.build(attatchment, isSensitive)))
			.then((mediaItems) => chunkArray(mediaItems, maxItemsInRow) as unknown as HTMLElement[][])
			.then((mediaRows) => Promise.all(mediaRows.map(putChildrenInNewCurryContainer("post-media-row"))))
			.then(putChildrenInNewCurryContainer("post-media"));
}

async function chunkArray(array: any[], chunkSize: number) {
	return array.map((_item, index) => (index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null)).filter(Boolean);
}

function constructEmojiReactionsRow(emojiReactions: any[] | undefined) {
	if (!emojiReactions || emojiReactions.length < 1) return "";

	return Promise.all(emojiReactions.map(EmojiReaction.build)).then(putChildrenInNewCurryContainer("emoji-reactions-row"));
}

function constructPostPoll(post: Status) {
	if (!post.poll) return "";

	return aCreateElement("div", "post-poll").then(setInnerHTML("TODO: polls"));
}
