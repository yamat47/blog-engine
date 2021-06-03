import Head from 'next/head'
import Link from 'next/link'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { feedPath } from 'api/url';
import { config } from 'config';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const siteTitle = config.title;
  const siteDescription = config.description;

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" title={siteTitle} href={feedPath} />
        <meta name="description" content={siteDescription} />
        <meta property="og:url" content="" />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>
      <Header/>
      <main className='container flex-auto pt-4 mx-auto mt-4 border-t-4 border-red-500'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}
