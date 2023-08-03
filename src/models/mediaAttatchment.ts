export class MediaAttatchment {
	id!: number;
	type!: string; // todo make enum?
	url!: string;
	preview_url!: string;
	remote_url!: string | null;
	meta!: any;
	description!: string;
	blurhash!: string;
}
