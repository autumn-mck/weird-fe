import { Status } from "./models/status";
import { getIcon, getIconForVisibility } from "./assets.js";
import { getAccountDisplayNameHTML, formatInEmojis, relativeTime, createElement } from "./utils.js";
import { Icon } from "./models/icons.js";
import { generateProfilePreview, constructAcct } from "./profileRendering.js";
import { MediaAttatchment } from "./models/mediaAttatchment";
import * as consts from "./consts.js";

export async function constructPost(post: Status, inludeSpaceForAvatarLine = false, isQuoted = false) {
	const postDiv = createElement("div", "post");
	postDiv.id = "post-" + post.id;
	const postBody = createElement("div", "post-body");

	if (post.reblog) {
		const boostInfo = await constructBoostInfo(post);
		if (boostInfo) postBody.appendChild(boostInfo);

		const boostedPost = await constructPost(post.reblog);
		boostedPost.className += " boosted-post";
		postBody.appendChild(boostedPost);
	} else {
		if (inludeSpaceForAvatarLine) {
			const avatarDiv = await createAvatarDiv(post);
			const avatarLine = createElement("div", "avatar-line");
			avatarDiv.appendChild(avatarLine);
			postDiv.appendChild(avatarDiv);
		}

		const posterInfo = await constructPosterInfo(post, !inludeSpaceForAvatarLine);
		postBody.appendChild(posterInfo);

		const content = createElement("p", "post-content");
		content.innerHTML = formatInEmojis(post.content, post.emojis);
		const media = contstructMedia(post.media_attachments, post.sensitive);

		const postInnerBody = createElement("div", "post-inner-body");
		postInnerBody.appendChild(content);
		if (media) postInnerBody.appendChild(media);

		// todo handle properly
		if (post.spoiler_text) {
			const spoilerText = createElement("p", "post-spoiler-text");
			spoilerText.innerText = post.spoiler_text;
			postBody.appendChild(spoilerText);

			postBody.className += " post-spoiler";
		}

		postBody.appendChild(postInnerBody);

		let postPoll = constructPostPoll(post);
		if (postPoll) postBody.appendChild(postPoll);

		if (post.quote) {
			const quoteDiv = createElement("div", "post-quote");
			const quotePostDiv = await constructPost(post.quote, false, true);
			quotePostDiv.className += " quoted-post";
			quoteDiv.appendChild(quotePostDiv);

			postBody.appendChild(quoteDiv);
		}

		if (!isQuoted) {
			const emojiReactionsRow = constructEmojiReactionsRow(post.emoji_reactions);
			if (emojiReactionsRow) postBody.appendChild(emojiReactionsRow);

			const interactionRow = await constructInteractionRow(post);
			postBody.appendChild(interactionRow);
		}
	}
	postDiv.appendChild(postBody);

	return postDiv;
}

async function constructBoostInfo(post: Status) {
	if (!post.reblog) return null;

	const boostIco = await getIcon(Icon.Boost);
	boostIco.className += " boosted-by-ico";

	const rebloggedBy = createElement("p", "boosted-by");
	rebloggedBy.innerHTML = "Boosted by " + getAccountDisplayNameHTML(post.account);

	const reblogTime = createElement("p", "boosted-time");
	reblogTime.textContent = relativeTime(new Date(post.created_at));

	const boostedByDiv = createElement("div", "boosted-by-container");
	boostedByDiv.appendChild(boostIco);
	boostedByDiv.appendChild(rebloggedBy);
	boostedByDiv.appendChild(reblogTime);

	return boostedByDiv;
}

function contstructMedia(attatchments: MediaAttatchment[], isSensitive: boolean) {
	if (!attatchments || attatchments.length < 1) return null;

	let mediaRows: HTMLDivElement[] = [];
	const maxItemsInRow = 3;
	for (let i = 0; i < attatchments.length; i++) {
		if (i % maxItemsInRow === 0) {
			mediaRows.push(createElement("div", "post-media-row") as HTMLDivElement);
		}

		const attachmentContainer = createElement("div", "post-media-item-container");
		const attachment = attatchments[i]!;
		let mediaItem: HTMLImageElement | HTMLVideoElement | HTMLAudioElement;

		// todo handle better
		if (attachment.type === "image") {
			mediaItem = document.createElement("img");
		} else if (attachment.type === "video") {
			mediaItem = document.createElement("video");
			mediaItem.controls = true;
		} else if (attachment.type === "gifv") {
			mediaItem = document.createElement("video");
			mediaItem.controls = true;
		} else if (attachment.type === "audio") {
			mediaItem = document.createElement("audio");
			mediaItem.controls = true;
		} else {
			throw new Error("Unknown media type: " + attachment.type);
		}

		mediaItem.src = attachment.url;
		mediaItem.className = "post-media-item";

		if (isSensitive) {
			mediaItem.className += " post-media-item-sensitive";
		}

		attachmentContainer.appendChild(mediaItem);
		mediaRows[Math.floor(i / maxItemsInRow)]!.appendChild(attachmentContainer);
	}

	const media = createElement("div", "post-media");
	for (let i = 0; i < mediaRows.length; i++) {
		media.appendChild(mediaRows[i]!);
	}
	return media;
}

function constructEmojiReactionsRow(emojiReactions: any[] | undefined) {
	if (!emojiReactions || emojiReactions.length < 1) return null;

	const emojiReactionsRow = createElement("div", "emoji-reactions-row");

	emojiReactions.forEach((emojiReaction) => {
		emojiReactionsRow.appendChild(constructEmojiReaction(emojiReaction));
	});

	return emojiReactionsRow;
}

function constructEmojiReaction(emojiReaction: any) {
	let emojiReactionElement: HTMLImageElement | HTMLSpanElement;
	if (emojiReaction.url) {
		emojiReactionElement = createElement("img", "emoji emoji-reaction-img");
		(emojiReactionElement as HTMLImageElement).src = emojiReaction.url;
		emojiReactionElement.title = ":" + emojiReaction.name + ":";
	} else {
		emojiReactionElement = createElement("span", "emoji emoji-reaction-span");
		emojiReactionElement.innerText = emojiReaction.name;
	}

	const emojiReactionCount = createElement("span", "emoji-reaction-count");
	emojiReactionCount.innerText = emojiReaction.count;

	const emojiReactionDiv = createElement("div", "emoji-reaction-div");
	emojiReactionDiv.appendChild(emojiReactionElement);
	emojiReactionDiv.appendChild(emojiReactionCount);

	return emojiReactionDiv;
}

async function constructInteractionRow(post: Status) {
	async function constructInteractionItem(icon: Icon, className: string, spinny?: boolean, text?: string) {
		const item = createElement("div", "interaction-row-item");

		const checkboxId = "interaction-hidden-checkbox-" + className + "-" + post.id;
		const hiddenCheckbox = createElement("input", "interaction-hidden-checkbox") as HTMLInputElement;
		hiddenCheckbox.type = "checkbox";
		hiddenCheckbox.id = checkboxId;
		item.appendChild(hiddenCheckbox);

		const itemIconLabel = createElement("label", "interaction-icon interaction-icon-" + className) as HTMLLabelElement;
		itemIconLabel.htmlFor = checkboxId;
		if (spinny) {
			itemIconLabel.className += " spinny-interaction-icon";
		}
		itemIconLabel.appendChild(await getIcon(icon));
		item.appendChild(itemIconLabel);

		if (text) {
			const itemText = createElement("p", "interaction-text");
			itemText.innerText = text;
			item.appendChild(itemText);
		}

		return item;
	}

	const replies = await constructInteractionItem(Icon.Reply, "replies", true, String(post.replies_count));
	const repeats = await constructInteractionItem(Icon.Boost, "repeats", true, String(post.reblogs_count));
	const quote = await constructInteractionItem(Icon.Quote, "quote");
	const favourites = await constructInteractionItem(Icon.Favourite, "favourites", true, String(post.favourites_count));
	const react = await constructInteractionItem(Icon.AddReaction, "react", true);
	const more = await constructInteractionItem(Icon.More, "more");

	const interactionRow = createElement("div", "interaction-bar");
	interactionRow.append(replies, repeats, quote, favourites, react, more);

	return interactionRow;
}

async function constructPosterInfo(post: Status, shouldIncludeAvatar: boolean) {
	const postInfoTop = createElement("div", "post-info-top");

	if (shouldIncludeAvatar) {
		const avatarDiv = await createAvatarDiv(post);
		postInfoTop.appendChild(avatarDiv);
	}

	const displayName = createElement("p", "post-display-name");
	displayName.innerHTML = getAccountDisplayNameHTML(post.account);

	const col1 = createElement("div", "poster-info-column-1");
	col1.appendChild(displayName);
	col1.appendChild(constructAcct(post.account));

	const postTime = createElement("a", "post-time") as HTMLAnchorElement;
	postTime.innerText = relativeTime(new Date(post.created_at));
	postTime.href = "/" + consts.statusesPath + "/" + post.id;

	const postVisibility = await getIconForVisibility(post.visibility);
	postVisibility.className += " post-visibility";
	postVisibility.title = post.visibility;

	const col2 = createElement("div", "poster-info-column-2");
	col2.appendChild(postTime);
	col2.appendChild(postVisibility);

	const posterTextInfo = createElement("div", "poster-text-info");
	posterTextInfo.appendChild(col1);
	posterTextInfo.appendChild(col2);
	postInfoTop.appendChild(posterTextInfo);

	return postInfoTop;
}

function constructPostPoll(post: Status) {
	if (post.poll) {
		const pollDiv = createElement("div", "post-poll");
		// TODO: polls

		return pollDiv;
	}

	return null;
}

async function createAvatarDiv(post: Status) {
	const avatarDiv = createElement("div", "post-avatar-div");
	const avatarImg = createElement("img", "post-avatar") as HTMLImageElement;
	avatarImg.src = post.account.avatar;
	avatarDiv.appendChild(avatarImg);

	const testDiv = createElement("div", "profile-preview-container");
	testDiv.appendChild(await generateProfilePreview(post.account));
	avatarDiv.appendChild(testDiv);

	return avatarDiv;
}
