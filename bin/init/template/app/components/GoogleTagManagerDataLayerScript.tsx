/* eslint-disable react/no-danger */
import { NextPage } from 'next'

type Props = {
  googleAnalyticsId: string;
};

export const GoogleTagManagerDataLayerScript: NextPage<Props> = ({ googleAnalyticsId }: Props) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalyticsId}', {
        page_path: window.location.pathname,
      });
    `,
      }}
    />
  );
};
