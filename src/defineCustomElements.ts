import PostInteractionItem from "./elements/post/postInteractionItem";
import PostBoostedBy from "./elements/post/postBoostedBy";
import UsernameAcct from "./elements/account/usernameAcct";
import PostInteractionsRow from "./elements/post/postInteractionsRow";
import ProfilePreview from "./elements/account/profilePreview";
import AccountAvatar from "./elements/account/accountAvatar";
import AvatarWithPreview from "./elements/post/avatarWithPreview";
import PostInfo from "./elements/post/postInfo";
import AccountDisplayName from "./elements/account/accountDisplayName";
import PostMediaItem from "./elements/post/postMediaItem";
import EmojiReaction from "./elements/post/emojiReaction";
import PostTextContent from "./elements/post/postTextContent";
import EmojiReactions from "./elements/post/emojiReactions";
import PostMedia from "./elements/post/postMedia";
import StandardPost from "./elements/post/standardPost";
import Boost from "./elements/post/boost";
import MediaRow from "./elements/post/postMediaRow";
import AccountBio from "./elements/account/accountBio";
import PostContentWarning from "./elements/post/postContentWarning";
import AutoSize from "./newPost/autoSizeTextArea";
import CustomIcon from "./elements/customIcon";
import LanguageSelector from "./newPost/languageSelector";
import PostFormatSelector from "./newPost/postFormatSelector";

export function defineCustomElements() {
	const elements = [
		AutoSize,
		LanguageSelector,
		PostFormatSelector,
		CustomIcon,
		AccountAvatar,
		AccountBio,
		AccountDisplayName,
		ProfilePreview,
		UsernameAcct,
		AvatarWithPreview,
		Boost,
		PostBoostedBy,
		EmojiReaction,
		EmojiReactions,
		PostInteractionsRow,
		MediaRow,
		PostTextContent,
		PostContentWarning,
		PostInfo,
		PostInteractionItem,
		PostMedia,
		PostMediaItem,
		StandardPost,
	];

	elements.forEach((element) => {
		if ("extends" in element) {
			customElements.define(element.tagName, element, { extends: element.extends });
		} else {
			customElements.define(element.tagName, element);
		}
	});
}
