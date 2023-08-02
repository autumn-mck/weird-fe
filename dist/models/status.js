var Visibility;
(function (Visibility) {
    Visibility["Public"] = "public";
    Visibility["Unlisted"] = "unlisted";
    Visibility["Local"] = "local";
    Visibility["Private"] = "private";
    Visibility["Direct"] = "direct";
})(Visibility || (Visibility = {}));
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
    emoji_reactions;
}
//# sourceMappingURL=status.js.map