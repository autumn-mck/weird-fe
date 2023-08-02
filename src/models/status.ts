enum Visibility {
	Public = "public",
	Unlisted = "unlisted",
	Local = "local", // TODO is this correct
	Private = "private",
	Direct = "direct",
}

export class Status {
	id!: string;
	uri!: string;
	created_at!: string; // Date
	account!: any;
	content!: string; // HTML
	visibility!: Visibility;
	sensitive!: boolean;
	spoiler_text!: string; // TODO: just "" if not sensitive?
	media_attachments!: any[];
	// completely ignoring the optional application field, akkoma doesn't even seem to return it
	mentions!: any[];
	tags!: any[];
	emojis!: any[];
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

	quote?: any | null;
	quote_id?: any | null;
	emoji_reactions?: any[];
}
