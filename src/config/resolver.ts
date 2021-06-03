import path from 'path';

export type Props = {
  title: string;
  description: string;
  header: {
    imageFileName?: string;
  };
  footer: {
    text?: string;
    imageFileName?: string;
    imageLinkHref?: string;
  };
  baseUrl: string;
  eyecatchPhrase?: string;
  postsPath: string;
  defaultThumbnailFileName: string;
  rootOpenGraphImageFileName: string;
  rss: {
    imageFileName: string;
    copyright?: string;
    language?: string;
    categories?: string[];
  };
  googleAnalyticsId?: string;
};

export type Config = {
  title: string;
  description: string;
  header: {
    imageFileName?: string;
  };
  footer: {
    text?: string;
    imageFileName?: string;
    imageLinkHref?: string;
  };
  eyecatchPhrase?: string;
  baseUrl: string;
  postsDirectory: string;
  defaultThumbnailFileName: string;
  rootOpenGraphImageFileName: string;
  rss: {
    imageFileName: string;
    copyright?: string;
    language?: string;
    categories?: string[];
  };
  googleAnalyticsId?: string;
  isPreviewMode: boolean;
};

export const resolver = (props: Props): Config => {
  const title: string = props.title;
  const description: string = props.description;
  const header = props.header;
  const footer = props.footer;
  const baseUrl: string = props.baseUrl;
  const eyecatchPhrase: string | undefined = props.eyecatchPhrase;
  const postsDirectory: string = path.join(process.cwd(), props.postsPath);
  const defaultThumbnailFileName: string = props.defaultThumbnailFileName;
  const rootOpenGraphImageFileName: string = props.rootOpenGraphImageFileName;
  const rss = props.rss;
  const googleAnalyticsId: string | undefined = props.googleAnalyticsId;

  // If VERCEL_ENV is 'preview' or undefined, running with preview mode.
  // On preview mode, posts yet not published will be shown.
  const mode: string | undefined = process.env.VERCEL_ENV
  const isPreviewMode: boolean = (mode === 'preview' || typeof mode === 'undefined')

  return {
    title,
    description,
    header,
    footer,
    baseUrl,
    eyecatchPhrase,
    postsDirectory,
    defaultThumbnailFileName,
    rootOpenGraphImageFileName,
    rss,
    googleAnalyticsId,
    isPreviewMode,
  };
};
