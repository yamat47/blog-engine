import { config } from 'config';

const getHeaderImageFilePath = (): string | undefined => {
  const imageBasePath: string = '/images';
  const headerImageFileName: string | undefined = config.header.imageFileName;

  if (headerImageFileName) {
    return `${imageBasePath}/${headerImageFileName}`;
  }
};

export const headerImageFilePath: string | undefined = getHeaderImageFilePath();
