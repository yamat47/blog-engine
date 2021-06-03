import matter from 'gray-matter';
import removeMd from 'remove-markdown';
import remark from 'remark';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import externalLinks from 'remark-external-links';
import remarkEmbdder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import linkCard from 'remark-link-card';

export type Result = {
  title: string;
  date: string;
  author: string;
  thumbnail?: string;
  plainText: string;
  htmlText: string;
};

export type MatterResultData = Pick<Result, 'title' | 'date' | 'author' | 'thumbnail'>;

export const convertMarkdown = async (markdown: string): Promise<Result> => {
  const matterResult = matter(markdown);
  const plainText: string = removeMd(matterResult.content);

  const remarkProcessed = await remark()
    .use(gfm)
    .use(breaks)
    .use(html)
    .use(highlight)
    .use(externalLinks)
    .use(remarkEmbdder, { transformers: [oembedTransformer] })
    .use(linkCard, { shortenUrl: true })
    .process(matterResult.content);

  const htmlText: string = remarkProcessed.toString();

  return {
    plainText,
    htmlText,
    ...(matterResult.data as MatterResultData)
  }
};
