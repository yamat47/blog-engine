import { PostData, getAllPostsData } from 'api';

export const getPublishedPostsData = async (): Promise<PostData[]> => {
  const allPostsData: PostData[] = await getAllPostsData();

  return allPostsData.filter(postData => postData.isPublished);
};
