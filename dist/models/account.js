export class Account {
    id;
    username;
    acct;
    url; // URL
    display_name;
    note; // HTML (their bio)
    avatar; // URL
    avatar_static; // URL
    header; // URL
    header_static; // URL
    locked;
    fields;
    emojis;
    bot;
    group;
    discoverable;
    noindex;
    moved; // null if account suspended
    suspended;
    limited;
    created_at; // Date
    last_status_at; // Date, null if no statuses
    statuses_count;
    followers_count;
    following_count;
    fqn; // fully qualified name, e.g. "user@domain", even when local user
    pleroma;
    akkoma;
    source;
}
export class Field {
    name;
    value; // HTML
    verified_at; // Date
}
//# sourceMappingURL=account.js.map