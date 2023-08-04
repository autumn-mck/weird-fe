export class MediaAttatchment {
	id!: number;
	type!: string; // todo make enum? or no reason to
	url!: string;
	/** scaled down preview, although same as url on akkoma */
	preview_url!: string;
	/** null when local */
	remote_url!: string | null;
	// akkoma docs says it doesn't include meta and blurhash as it doesn't process remote images, but it seems to for me? is this because i'm using media proxy?
	meta!: any;
	description!: string;
	blurhash!: string;
}
