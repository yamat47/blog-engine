import Link from 'next/link'
import { headerImageFilePath } from 'api/url';
import { config } from 'config';

export const Header = () => {
  const siteTitle = config.title;
  const eyecatchPhrase = config.eyecatchPhrase;

  return (
    <header className='pt-8 pb-4'>
      {headerImageFilePath && (
        <div className='flex justify-center mb-4'>
          <Link href="/">
            <a className='inline-block'>
              <img
                className='w-12 md:w-16'
                src={headerImageFilePath}
                alt='Header image'
              />
            </a>
          </Link>
        </div>
      )}
      <div className='flex justify-center'>
        <Link href="/">
          <a className='inline-block'>
            <h2 className='text-xl font-bold md:text-2xl'>
              {siteTitle}
            </h2>
          </a>
        </Link>
      </div>
      {eyecatchPhrase && (
        <p className='mt-4 px-2 text-sm text-center text-gray-500'>
          {eyecatchPhrase}
        </p>
      )}
    </header>
  );
};
