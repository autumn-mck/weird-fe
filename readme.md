## weird-fe

This was a very experimental attempt to write my own frontend for akkoma(/anything else supporting the mastodon API)

Written partly to experiment with whatever ideas I found interesting at the time, meaning the frontend is served as a completely static site, and heavily uses [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for rendering the UI. It was great see how powerful they and the shadow DOM can be, but also work with them enough to see their downsides and why frameworks are much more commonly used. Written almost entirely from scratch to gain more experience working with a limited set of tools and see how things work as low a level is possible for a web app.

It was also a good excuse to try a more functional approach to programming, with the benefits of pure functions and the utility of currying

Supports:

-   Viewing posts (with attatchments, content warnings, etc)
-   Viewing replies to a post in a threaded view
-   Viewing a user's posts
-   Viewing an instance's federated timeline
-   Emoji reactions
-   Quote posts
-   Akkoma's subset of MFM

![Screenshot of a thread of replies to a post](/Screenshot_20231030_005417_Fennec.png)

(yes, there's an irony in a discussion of a different fedi client as my only screenshot - for some reason it's the only screenshot I have, and I'm no longer running my own instance to test it with)

Icons from [material-symbols](https://github.com/marella/material-symbols/tree/main/material-symbols), Apache-2.0
