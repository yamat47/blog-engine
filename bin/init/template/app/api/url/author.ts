import { Author } from 'api';

export const getAuthorImagePath = (author: Author): string => {
  const imagesBasePath: string = '/images';
  const authorImagesPath: string = `${imagesBasePath}/authors`;
  const avatarFileName: string = author.avatarFileName || 'default.png';

  return `${authorImagesPath}/${avatarFileName}`;
};
