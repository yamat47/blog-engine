import { config } from 'config';

const googleAnalyticsId: string | undefined = config.googleAnalyticsId;

export const pageview = (path: string) => {
  if (!googleAnalyticsId) {
    return;
  }

  window.gtag('config', googleAnalyticsId, { page_path: path });
};
