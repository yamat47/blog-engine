import RSS from 'rss';
import { getSortedPublishedPostsData } from 'api';
import { FeedItem, convertToFeedItem } from 'api/feed';
import { feedUrl, feedImageUrl } from 'api/url';
import { config } from 'config';

export const generateFeedXml = async () => {
  const baseUrl: string = config.baseUrl;

  const feed = new RSS({
    title: config.title,
    description: config.description,
    site_url: baseUrl,
    feed_url: feedUrl,
    image_url: feedImageUrl,
    copyright: config.rss.copyright,
    language: config.rss.language,
    categories: config.rss.categories,
  });

  const postsData = await getSortedPublishedPostsData();

  postsData.forEach(postData => {
    const feedItem: FeedItem = convertToFeedItem(postData);
    feed.item(feedItem);
  })

  return feed.xml();
};
