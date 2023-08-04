export class Status {
    id;
    /** "URI of the status used for federation" */
    uri;
    /** datetime */
    created_at;
    account;
    /** HTML (may include custom emojis) */
    content;
    visibility;
    // todo, what exactly is the difference between sensitive and spoiler_text?
    sensitive;
    spoiler_text; // TODO: just "" if not sensitive?
    media_attachments;
    // completely ignoring the optional application field, akkoma doesn't even seem to return it, and i don't see any reason to bother displaying it even if it is there
    mentions;
    /** any hashtags used */
    tags;
    emojis;
    reblogs_count;
    favourites_count;
    replies_count;
    /** "a link to the status's html representation" todo difference between uri and url? */
    url;
    in_reply_to_id;
    in_reply_to_account_id;
    /** the status being boosted (if a boost) */
    reblog; // this feels like a confusing way of doing things but sure
    poll;
    /** "preview card for links included within status content" - todo what is this? */
    card;
    /** two-letter language code */
    language;
    /** "plain-text source" - todo is this always actually plaintext */
    text;
    /** datetime */
    edited_at;
    favourited;
    reblogged;
    muted;
    bookmarked;
    /** todo: is apparently only for if the authorised user has pinned their own post? */
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