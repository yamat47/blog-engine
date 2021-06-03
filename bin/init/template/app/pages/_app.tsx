import 'tailwindcss/tailwind.css'
import 'highlight.js/styles/github.css'
import '@yamat47/markdown-css/markdown.css'
import '../styles/global.css'
import '../styles/markdown/remark-link-card.css'
import '../styles/markdown/speakerdeck.css'
import '../styles/markdown/twitter.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { pageview } from 'api/googleAnalytics';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />
}
