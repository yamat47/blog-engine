import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import { Layout } from 'components/Layout'
import ShareButtons from 'components/ShareButtons'
import Time from 'components/Time'
import { AuthorBlock } from 'components/AuthorBlock'
import { config } from 'config';
import { AllPostsIds, getAllPostsIds, PostData, getPostData } from 'api';
import { getPostUrl, getPostThumbnailPath, getPostThumbnailUrl, getOpenGraphImageUrl } from 'api/url';

type Path = {
  params: {
    id: string;
  }
};

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  postData: PostData
};

export default function Post({ postData }: Props) {
  const pageUrl = getPostUrl(postData);
  const pageTitle = postData.title;
  const siteTitle = config.title;
  const ogTitle = `${postData.title} | ${siteTitle}`;
  const thumbnailPath = getPostThumbnailPath(postData);
  const ogpImagePath = getOpenGraphImageUrl(postData);

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogpImagePath} />
        <script src="https://platform.twitter.com/widgets.js" />
      </Head>
      <article className='max-w-screen-md mx-auto px-2 md:px-4 lg:px-8' >
        <header className='mt-3 md:mt-6 mb-6 md:mb-12'>
          <Image
            src={thumbnailPath}
            alt={postData.title}
            width={1200}
            height={630}
            className='mb-2'
          />
          <div className='flex justify-start mb-1'>
            <span className='text-gray-500'>
              <Time dateString={postData.date} />
            </span>
          </div>
          <h1 className='text-3xl font-semibold mb-2'>
            {postData.title}
          </h1>
          <div className='flex justify-between mb-12'>
            <AuthorBlock id={postData.author} />
            <ShareButtons title={pageTitle} url={pageUrl} className='hidden sm:flex' />
          </div>
        </header>
        <div className='markdown' dangerouslySetInnerHTML={{ __html: postData.htmlText }} />
        <hr className='mt-8 mb-4' />
        <ShareButtons title={pageTitle} url={pageUrl} />
      </article>
      <Link href="/">
        <a className='block border-t border-b border-gray-300 mt-6 mb-4 py-2 text-center'>
          <span className='text-sm font-semibold'>記事一覧</span>
        </a>
      </Link>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postIds: AllPostsIds = getAllPostsIds();
  const paths: Path[] = postIds.map(postId => { return { params: { id: postId } } });

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const postData: PostData = await getPostData(params.id);

  return postData.isPublished ? { props: { postData } } : { notFound: true };
};
