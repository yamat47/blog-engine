import path from 'path';
import fs from 'fs';
import { config } from 'config';
import { Result, convertMarkdown } from 'api';

type PostBase = {
  id: string;
  thumbnail: string;
};

type PostPublished = {
  isPublished: boolean;
};

export type PostData = Result & PostBase & PostPublished;

export const getPostData = async (id: string): Promise<PostData> => {
  const postPath: string = path.join(config.postsDirectory, `${id}.md`);
  const markdown: string = fs.readFileSync(postPath, 'utf8');

  const converted = await convertMarkdown(markdown);

  // Post is published if at least one of these conditions is met:
  //   * Application is running on preview mode.
  //   * post.date is later than now.
  const isPublished: boolean = config.isPreviewMode || new Date(converted.date) <= new Date();

  // Use default thumbnail image when thumbnail file name is not configured on post.
  const thumbnail = converted.thumbnail || config.defaultThumbnailFileName;

  return { id, isPublished, thumbnail, ...converted }
};
