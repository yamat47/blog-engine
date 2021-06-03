import path from 'path';

export const detectMimetype = (filePath: string): string => {
  const extname: string = path.extname(filePath);

  switch (extname) {
    case '.png':
      return 'image/png';
      break;
    case '.jpeg':
    case '.jpg':
      return 'image/jpeg';
      break
    default:
      console.error(`Can't detect Mimetype if ${filePath}.`)
      return '';
  }
};
