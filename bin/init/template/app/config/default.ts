export type DefaultConfig = {
  title: string;
  description: string;
  postsPath: string;
  defaultThumbnailFileName: string;
  rootOpenGraphImageFileName: string;
  rss: {
    imageFileName: string;
  };
};

export const defaultConfig: DefaultConfig = {
  title: 'My awesome blog.',
  description: 'This is my awesome blog.',
  postsPath: '/posts',
  defaultThumbnailFileName: 'thumbnail.png',
  rootOpenGraphImageFileName: 'thumbnail.png',
  rss: {
    imageFileName: 'rss.png',
  },
};
