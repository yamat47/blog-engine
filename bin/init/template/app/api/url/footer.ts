import { config } from 'config';

const getFooterImageFilePath = (): string | undefined => {
  const imageBasePath: string = '/images';
  const footerImageFileName: string | undefined = config.footer.imageFileName;

  if (footerImageFileName) {
    return `${imageBasePath}/${footerImageFileName}`;
  }
};

export const footerImageFilePath: string | undefined = getFooterImageFilePath();
export const footerLinkHref: string | undefined = config.footer.imageLinkHref;
