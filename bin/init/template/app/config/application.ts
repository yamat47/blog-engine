type ApplicationConfig = {
  title?: string;
  description?: string;
  baseUrl: string;
  eyecatchPhrase?: string;
  header: {
    imageFileName?: string;
  },
  footer: {
    text?: string;
    imageFileName?: string;
    imageLinkHref?: string;
  };
  postsPath?: string;
  defaultThumbnailFileName?: string;
  rootOpenGraphImageFileName?: string;
  rss: {
    imageFileName?: string;
    copyright?: string;
    language?: string;
    categories?: string[];
  };
  googleAnalyticsId?: string;
};

const config = require('./application.yml');

export const applicationConfig: ApplicationConfig = config;
