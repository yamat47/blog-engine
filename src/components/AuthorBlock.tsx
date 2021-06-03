import { NextPage } from 'next'
import Image from 'next/image'
import { Author, getAuthorData } from 'api/getAuthorData';
import { getAuthorImagePath } from 'api/url';

type Props = {
  id: string;
};

export const AuthorBlock: NextPage<Props> = ({ id }: Props) => {
  const author: Author | undefined = getAuthorData(id);

  if (!author) {
    console.error(`Author can't be found with id: ${id}`);
    return null;
  }

  const authorImagesPath: string = getAuthorImagePath(author);

  return (
    <span className='flex items-center'>
      <Image
        src={authorImagesPath}
        alt='Twitter'
        width={32}
        height={32}
        className='rounded-full'
      />
      <span className='ml-2 text-gray-700'>{author.name}</span>
    </span>
  );
};
