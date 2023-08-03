import { Account } from "./account.js";
import { CustomEmoji } from "./customEmoji.js";
import { MediaAttatchment } from "./mediaAttatchment.js";
import { Visibility } from "./visibility.js";

export class Status {
	id!: string;
	uri!: string;
	created_at!: string; // Date
	account!: Account;
	content!: string; // HTML
	visibility!: Visibility;
	sensitive!: boolean;
	spoiler_text!: string; // TODO: just "" if not sensitive?
	media_attachments!: MediaAttatchment[];
	// completely ignoring the optional application field, akkoma doesn't even seem to return it
	mentions!: StatusMention[];
	tags!: StatusTag[];
	emojis!: CustomEmoji[];
	reblogs_count!: number;
	favourites_count!: number;
	replies_count!: number;
	url!: string | null;
	in_reply_to_id!: string | null;
	in_reply_to_account_id!: string | null;
	reblog!: Status | null; // this feels like a confusing way of doing things but sure
	poll!: any | null;
	card!: any | null;
	language!: string | null;
	text!: string | null;
	edited_at!: string | null; // Date

	favourited?: boolean;
	reblogged?: boolean;
	muted?: boolean;
	bookmarked?: boolean;
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
