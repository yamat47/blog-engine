import { PostData } from 'api';
import { config } from 'config';

export const getPostPath = (postData: PostData): string => {
  return `/posts/${postData.id}`;
};

export const getPostUrl = (postData: PostData): string => {
  const postPath: string = getPostPath(postData);

  return `${config.baseUrl}${postPath}`;
};

export const getPostThumbnailPath = (postData: PostData): string => {
  const imageBasePath = '/images';
  const thumbnailBasePath = `${imageBasePath}/thumbnails`;

  return `${thumbnailBasePath}/${postData.thumbnail}`;
};

export const getPostThumbnailUrl = (postData: PostData): string => {
  const thumbnailPath: string = getPostThumbnailPath(postData);

  return `${config.baseUrl}${thumbnailPath}`;
};
