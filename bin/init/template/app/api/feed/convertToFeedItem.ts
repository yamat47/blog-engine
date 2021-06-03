import { PostData } from 'api';
import { detectMimetype } from 'api/feed';
import { getPostUrl, getPostThumbnailPath, getPostThumbnailUrl } from 'api/url';
import { config } from 'config';

export type FeedItem = {
  title: string;
  description: string;
  url: string;
  guid: string;
  author: string;
  date: Date;
  enclosure: {
    url: string;
    type: string;
  };
};

export const convertToFeedItem = (postData: PostData): FeedItem => {
  const thumbnailPath: string = getPostThumbnailPath(postData);
  const thumbnailUrl: string = getPostThumbnailUrl(postData);
  const thumbnailMimetype: string = detectMimetype(thumbnailPath);

  return {
    title: postData.title,
    description: postData.plainText,
    url: getPostUrl(postData),
    guid: postData.id,
    author: postData.author,
    date: new Date(postData.date),
    enclosure: {
      url: thumbnailUrl,
      type: thumbnailMimetype,
    }
  };
};
