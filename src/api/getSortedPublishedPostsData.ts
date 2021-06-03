import { PostData, getPublishedPostsData } from 'api';

export const getSortedPublishedPostsData = async (): Promise<PostData[]> => {
  const publishedPostsData: PostData[] = await getPublishedPostsData();

  return publishedPostsData.sort((a, b) => { return a.date < b.date ? 1 : -1; })
};
