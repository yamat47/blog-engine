import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs';
import { Layout } from 'components/Layout';
import { AuthorBlock } from 'components/AuthorBlock'
import { PostData, getSortedPublishedPostsData } from 'api';
import { generateFeedXml } from 'api/feed';
import { getPostPath, getPostThumbnailPath, getOpenGraphImageUrl } from 'api/url';
import { config } from 'config';

type Props = {
  allPostsData: PostData[];
};

export default function Home({ allPostsData }: Props) {
  const siteTitle = config.title;
  const ogpImageUrl = getOpenGraphImageUrl();

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta property="og:title" content={siteTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogpImageUrl} />
      </Head>
      <div className='px-2 md:px-4 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {allPostsData.map(postData => {
          const { id, title, plainText, author } = postData;
          const thumbnailPath = getPostThumbnailPath(postData);

          return (
            <Link href={getPostPath(postData)} key={id}>
              <a className='group'>
                <article>
                  <div className='flex flex-shrink-0 relative justify-center items-center w-full mb-2 border group-hover:opacity-50'>
                    <img
                      src={thumbnailPath}
                      alt={title}
                    />
                  </div>
                  <h1 className='font-semibold mb-2'>
                    {title}
                  </h1>
                  <p className='text-sm font-light text-gray-500 mb-2'>
                    {plainText.substring(0, 50)}...
                  </p>
                  <footer>
                    <AuthorBlock id={author} />
                  </footer>
                </article>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPublishedPostsData()

  const rss = await generateFeedXml();
  fs.writeFileSync('./public/rss.xml', rss)

  return {
    props: {
      allPostsData
    }
  }
}
