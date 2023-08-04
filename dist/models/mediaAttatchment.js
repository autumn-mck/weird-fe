export class MediaAttatchment {
    id;
    type; // todo make enum? or no reason to
    url;
    /** scaled down preview, although same as url on akkoma */
    preview_url;
    /** null when local */
    remote_url;
    // akkoma docs says it doesn't include meta and blurhash as it doesn't process remote images, but it seems to for me? is this because i'm using media proxy?
    meta;
    description;
    blurhash;
}
//# sourceMappingURL=mediaAttatchment.js.map