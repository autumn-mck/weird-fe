import { CustomEmoji } from "./customEmoji";

export class Account {
	id!: string;
	username!: string;
	acct!: string;
	url!: string; // URL
	display_name!: string;
	note!: string; // HTML (their bio)
	avatar!: string; // URL
	avatar_static!: string; // URL
	header!: string; // URL
	header_static!: string; // URL
	locked!: boolean;
	fields!: Field[];
	emojis!: CustomEmoji[];
	bot!: boolean;
	group!: boolean;
	discoverable!: boolean | null;
	noindex?: boolean;
	moved?: Account | null; // null if account suspended
	suspended?: boolean;
	limited?: boolean;
	created_at!: string; // Date
	last_status_at!: string | null; // Date, null if no statuses
	statuses_count!: number;
	followers_count!: number;
	following_count!: number;

	fqn?: string; // fully qualified name, e.g. "user@domain", even when local user
	pleroma?: any;
	akkoma?: any;
	source?: any;
}

export class Field {
	name!: string;
	value!: string; // HTML
	verified_at!: string | null; // Date
}
