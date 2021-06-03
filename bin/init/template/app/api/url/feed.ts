import { config } from 'config';

const getFeedPath = (): string => {
  return '/rss.xml';
};

const getFeedUrl = (): string => {
  const baseUrl = config.baseUrl;
  const feedPath = getFeedPath();

  return `${baseUrl}${feedPath}`;
};

const getFeedImagePath = (): string => {
  const imageBasePath: string = '/images';
  const feedImageFileName: string = config.rss.imageFileName;

  return `${imageBasePath}/${feedImageFileName}`;
};

const getFeedImageUrl = (): string => {
  const baseUrl: string = config.baseUrl;
  const feedImagePath: string = getFeedImagePath();

  return `${baseUrl}${feedImagePath}`;
};

export const feedPath: string = getFeedPath();
export const feedUrl: string = getFeedUrl();
export const feedImageUrl: string = getFeedImageUrl();
