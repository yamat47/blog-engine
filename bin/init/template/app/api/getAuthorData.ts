export type Author = {
  id: string;
  name: string;
  avatarFileName?: string;
};

const AUTHORS: Author[] = [
  { id: 'yamat47', name: 'Takuya Yamaguchi', avatarFileName: 'yamat47.jpg' },
  { id: 'non-avatar-author', name: 'Non Avatar Author' }
]

export const getAuthorData = (id: string): Author | undefined => {
  return AUTHORS.find(author => author.id === id)
};
