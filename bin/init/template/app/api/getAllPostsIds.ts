import fs from 'fs'
import { config } from 'config';

export type AllPostsIds = string[];

export const getAllPostsIds = (): AllPostsIds => {
  const postFileNames = fs.readdirSync(config.postsDirectory)

  return postFileNames.map(name => name.replace(/\.md$/, ''))
};
