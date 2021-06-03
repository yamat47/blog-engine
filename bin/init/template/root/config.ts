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

export const applicationConfig: ApplicationConfig = {
  // Blog title.
  // title: 'My awesome blog.',
  title: 'クラッソーネ開発者ブログ',

  // Blog description using for opengraph information and RSS feed.
  // description: 'This is my awesome blog.',
  description: '株式会社クラッソーネの開発者ブログです。',

  header: {
    // File name of header image.
    imageFileName: 'header.png',
  },

  footer: {
    // Text for footer.
    // text: 'Hosted by',
    text: 'Produced by',

    // File name of footer image.
    imageFileName: 'footer.png',

    // Href for footer image.
    // imageLinkHref: 'https://google.com',
    imageLinkHref: 'https://www.crassone.co.jp',
  },

  // Blog homepage url.
  // baseUrl: 'https://blog.example.com',
  baseUrl: 'https://tech.crassone.jp',

  // Text showing on global header.
  // eyecatchPhrase: 'Today you are the youngest you will ever be for the rest of your life.',
  eyecatchPhrase: 'クラッソーネの開発者がエンジニアリングに関することもそうでないことも綴っています！',

  // Path for article pages directory.
  // postsPath: '/posts',

  // Path for default thumbnail image.
  // defaultThumbnailFileName: 'thumbnail.png',

  // File name for root page opengraph image.
  // rootOpenGraphImageFileName: 'ogp.png',

  rss: {
    // File name for RSS feed.
    // imageFileName: 'rss.png',

    // Copyright information for RSS feed.
    // copyright: 'Awesome blog author',
    copyright: 'Crassone co., ltd.',

    // Language for RSS feed.
    language: 'ja',

    // Categories of RSS feed.
    // categories: ['Software Engineering', 'Ruby on Rails'],
    categories: ['Software Engineering'],
  },

  // Google Analytics ID like G-1234HOGEFUGA.
  // If this value is set Google Analytics count is running.
  // googleAnalyticsId: G-1234HOGEFUGA,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
};
