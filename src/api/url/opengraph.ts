import { PostData } from 'api';
import { getPostThumbnailPath } from 'api/url';
import { config } from 'config';

type OpenGraphImageSource = PostData;

const getDefaultOpenGraphImagePath = (): string => {
  const imageBasePath = '/images';
  const rootOpenGraphImageFileName = config.rootOpenGraphImageFileName;

  return `${imageBasePath}/${rootOpenGraphImageFileName}`;
};

const getPostDataOpenGraphImagePath = (postData: PostData): string => {
  return getPostThumbnailPath(postData);
};

const getOpenGraphImagePath = (source?: OpenGraphImageSource): string => {
  if (typeof source === 'undefined') {
    return getDefaultOpenGraphImagePath();
  } else if ('title' in source) {
    return getPostDataOpenGraphImagePath(source);
  } else {
    console.error("Can't detect opengraph image path.");
    return '';
  }
};

export const getOpenGraphImageUrl = (source?: OpenGraphImageSource): string => {
  const baseUrl = config.baseUrl;
  const opengraphImagePath: string = getOpenGraphImagePath(source);

  return `${baseUrl}${opengraphImagePath}`;
};
