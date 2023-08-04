import { CustomEmoji } from "./customEmoji";

export class Account {
	id!: string;
	/** username without domain */
	username!: string;
	/** username with domain when remote, but does not include domain if local ("webfinger account URI") */
	acct!: string;
	/** URL to their remote or local account */
	url!: string;
	/** can include custom emoji */
	display_name!: string;
	/** HTML
	 * (their account bio, can include custom emoji)
	 */
	note!: string;
	/** URL of image */
	avatar!: string;
	/** URL of image */
	avatar_static!: string;
	/** URL of image */
	header!: string;
	/** URL of image */
	header_static!: string;
	locked!: boolean;
	fields!: Field[];
	emojis!: CustomEmoji[];
	bot!: boolean;
	group!: boolean;
	discoverable!: boolean | null;
	/** as in has opted out of being indexed by search engines */
	noindex?: boolean;
	moved?: Account | null;
	suspended?: boolean;
	limited?: boolean;
	/** date */
	created_at!: string;
	/** date, or null if no (known) statuses */
	last_status_at!: string | null;
	statuses_count!: number;
	followers_count!: number;
	following_count!: number;

	/** fully qualified name, e.g. "user@domain", even when local user
	 * (is this akkoma/pleroma specific? not mastodon)
	 */
	fqn?: string;
	pleroma?: any;
	akkoma?: any;
	source?: any;
}

export class Field {
	name!: string;
	/** HTML */
	value!: string;
	/** date */
	verified_at!: string | null;
}
