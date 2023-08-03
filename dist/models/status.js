export class Status {
    id;
    uri;
    created_at; // Date
    account;
    content; // HTML
    visibility;
    sensitive;
    spoiler_text; // TODO: just "" if not sensitive?
    media_attachments;
    // completely ignoring the optional application field, akkoma doesn't even seem to return it
    mentions;
    tags;
    emojis;
    reblogs_count;
    favourites_count;
    replies_count;
    url;
    in_reply_to_id;
    in_reply_to_account_id;
    reblog; // this feels like a confusing way of doing things but sure
    poll;
    card;
    language;
    text;
    edited_at; // Date
    favourited;
    reblogged;
    muted;
    bookmarked;
    pinned;
    filtered;
    pleroma;
    akkoma;
    quote;
    quote_id;
    emoji_reactions; // not a CustomEmoji, because of course not (eg uses name instead of shortcode)
}
export class StatusMention {
    id;
    username;
    url;
    acct;
}
export class StatusTag {
    name;
    url;
}
//# sourceMappingURL=status.js.map