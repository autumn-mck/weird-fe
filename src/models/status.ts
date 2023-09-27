import { Account } from "./account";
import { CustomEmoji } from "./customEmoji";
import { MediaAttatchment } from "./mediaAttatchment";
import { Visibility } from "./visibility";

export class Status {
	id!: string;
	/** "URI of the status used for federation" */
	uri!: string;
	/** datetime */
	created_at!: string;
	account!: Account;
	/** HTML (may include custom emojis) */
	content!: string;
	visibility!: Visibility;
	// todo, what exactly is the difference between sensitive and spoiler_text?
	sensitive!: boolean;
	spoiler_text!: string; // TODO: just "" if not sensitive?
	media_attachments!: MediaAttatchment[];
	// completely ignoring the optional application field, akkoma doesn't even seem to return it, and i don't see any reason to bother displaying it even if it is there
	mentions!: StatusMention[];
	/** any hashtags used */
	tags!: StatusTag[];
	emojis!: CustomEmoji[];
	reblogs_count!: number;
	favourites_count!: number;
	replies_count!: number;
	/** "a link to the status's html representation" todo difference between uri and url? */
	url!: string | null;
	in_reply_to_id!: string | null;
	in_reply_to_account_id!: string | null;
	/** the status being boosted (if a boost) */
	reblog!: Status | null; // this feels like a confusing way of doing things but sure
	poll!: any | null;
	/** "preview card for links included within status content" - todo what is this? */
	card!: any | null;
	/** two-letter language code */
	language!: string | null;
	/** "plain-text source" - todo is this always actually plaintext */
	text!: string | null;
	/** datetime */
	edited_at!: string | null;

	favourited?: boolean;
	reblogged?: boolean;
	muted?: boolean;
	bookmarked?: boolean;
	/** todo: is apparently only for if the authorised user has pinned their own post? */
	pinned?: boolean;
	filtered?: any[];

	pleroma?: any;
	akkoma?: any;

	quote?: Status | null;
	quote_id?: string | null;
	emoji_reactions?: any[]; // not a CustomEmoji, because of course not (eg uses name instead of shortcode)
}

export class StatusMention {
	id!: string;
	username!: string;
	url!: string;
	acct!: string;
}

export class StatusTag {
	name!: string;
	url!: string;
}

export type StatusTreeNode = Status & { children: StatusTreeNode[] };
