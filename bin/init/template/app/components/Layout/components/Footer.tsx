import { footerImageFilePath, footerLinkHref } from 'api/url';
import { config } from 'config';

export const Footer = () => {
  const footerText: string | undefined = config.footer.text;

  return (
    <footer className='py-4 mx-auto'>
      {footerText}
      {(footerText && footerImageFilePath) && (
        <span className='inline-block w-4'/>
      )}
      {footerImageFilePath && (
        <a href={footerLinkHref} target='_blank' rel='noopener'>
          <img
            className='inline-block h-8'
            src={footerImageFilePath}
            alt='Footer image'
          />
        </a>
      )}
    </footer>
  );
};
