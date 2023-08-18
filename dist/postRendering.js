import Post from "./elements/post/post.js";
export async function constructPost(post, inludeSpaceForAvatarLine = false, isQuoted = false) {
    return Post.build(post, inludeSpaceForAvatarLine, isQuoted);
}
//# sourceMappingURL=postRendering.js.map