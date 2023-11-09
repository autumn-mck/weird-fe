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
import QuotedPost from "./elements/post/quotedPost";
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
	customElements.define("auto-size", AutoSize, { extends: "textarea" });
	customElements.define("language-selector", LanguageSelector);
	customElements.define("post-format-selector", PostFormatSelector);

	customElements.define("custom-icon", CustomIcon);

	customElements.define("account-avatar", AccountAvatar);
	customElements.define("account-bio", AccountBio);
	customElements.define("display-name", AccountDisplayName);
	customElements.define("profile-preview", ProfilePreview);
	customElements.define("username-acct", UsernameAcct);

	customElements.define("avatar-with-preview", AvatarWithPreview);
	customElements.define("boost-post", Boost);
	customElements.define("boosted-by", PostBoostedBy);
	customElements.define("emoji-reaction", EmojiReaction);
	customElements.define("emoji-reactions-row", EmojiReactions);
	customElements.define("post-interactions-row", PostInteractionsRow);
	customElements.define("media-row", MediaRow);
	customElements.define("post-text-content", PostTextContent);
	customElements.define("post-content-warning", PostContentWarning);
	customElements.define("post-info", PostInfo);
	customElements.define("post-interaction-item", PostInteractionItem);
	customElements.define("post-media", PostMedia);
	customElements.define("post-media-item", PostMediaItem);
	customElements.define("quoted-post", QuotedPost);
	customElements.define("standard-post", StandardPost);
}
