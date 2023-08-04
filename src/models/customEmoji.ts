export class CustomEmoji {
	shortcode!: string;
	url!: string;
	static_url!: string;
	visible_in_picker!: boolean;
	/** spec says this isn't optional, but at least in statuses on akkoma it's not present */
	category?: string;
}
