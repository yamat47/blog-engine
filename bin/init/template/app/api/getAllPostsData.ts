import { AllPostsIds, getAllPostsIds, PostData, getPostData } from 'api';

export const getAllPostsData = async (): Promise<PostData[]> => {
  const allPostsIds = getAllPostsIds();
  const promises = allPostsIds.map(postId => getPostData(postId));

  return await Promise.all(promises);
};
