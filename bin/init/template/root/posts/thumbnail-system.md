---
title: 'Thumbnail System'
date: '2021/06/06 0:00:00'
author: 'yamat47'
thumbnail: 'thumbnail-system.jpg'
---
## How to configure a thumbnail image (or fallback to default image)
This posts' content (`/posts/thumbnail-system.md`) contains thumbnail information:

> ```
> thumbnail: 'thumbnail-system.jpg'
> ```

then `/images/thumbnails/thumbnail-system.jpg` is set as this post's thumbnail image.

Otherwise, if `thumbnail` is not specified at post's metadata section `/images/thumbnails/thumbnail.png` is used for thumbnail.
You can edit default thumbnail image file name on `config.yml`.

## Where is the thumbnail image used ?
Thumbnail is used at three places.

1. Posts list page (root page).
1. Post page (like this page).
1. `og:image` for [Open Graph protocol](https://ogp.me/).
