export class Account {
    id;
    /** username without domain */
    username;
    /** username with domain when remote, but does not include domain if local ("webfinger account URI") */
    acct;
    /** URL to their remote or local account */
    url;
    /** can include custom emoji */
    display_name;
    /** HTML
     * (their account bio, can include custom emoji)
     */
    note;
    /** URL of image */
    avatar;
    /** URL of image */
    avatar_static;
    /** URL of image */
    header;
    /** URL of image */
    header_static;
    locked;
    fields;
    emojis;
    bot;
    group;
    discoverable;
    /** as in has opted out of being indexed by search engines */
    noindex;
    moved;
    suspended;
    limited;
    /** date */
    created_at;
    /** date, or null if no (known) statuses */
    last_status_at;
    statuses_count;
    followers_count;
    following_count;
    /** fully qualified name, e.g. "user@domain", even when local user
     * (is this akkoma/pleroma specific? not mastodon)
     */
    fqn;
    pleroma;
    akkoma;
    source;
}
export class Field {
    name;
    /** HTML */
    value;
    /** date */
    verified_at;
}
//# sourceMappingURL=account.js.map