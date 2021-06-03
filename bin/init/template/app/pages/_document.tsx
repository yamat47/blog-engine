import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GoogleTagManagerScript } from 'components/GoogleTagManagerScript';
import { GoogleTagManagerDataLayerScript } from 'components/GoogleTagManagerDataLayerScript';
import { config } from 'config';

const googleAnalyticsId: string | undefined = config.googleAnalyticsId;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          {googleAnalyticsId && (
            <GoogleTagManagerScript googleAnalyticsId={googleAnalyticsId} />
          )}
          {googleAnalyticsId && (
            <GoogleTagManagerDataLayerScript googleAnalyticsId={googleAnalyticsId} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
