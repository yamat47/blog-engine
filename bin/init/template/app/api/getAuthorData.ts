export type Author = {
  id: string;
  name: string;
  avatarFileName?: string;
};

const AUTHORS: Author[] = [
  { id: 'satoshi_matsumoto', name: 'マツモトサトシ', avatarFileName: 'satoshi_matsumoto.png' },
  { id: 'shogo_tahara', name: '田原 聖悟', avatarFileName: 'shogo_tahara.jpg' },
  { id: 'takahiro_nagamoto', name: '永元 雄宙', avatarFileName: 'takahiro_nagamoto.png' },
  { id: 'takuya_yamaguchi', name: '山口 拓弥', avatarFileName: 'takuya_yamaguchi.jpg' },
  { id: 'kousuke_kanno', name: '菅野 幸助', avatarFileName: 'kousuke_kanno.jpg' },
  { id: 'keiichiro_fukamachi', name: '深町 佳一朗', avatarFileName: 'keiichiro_fukamachi.jpg' },
]

export const getAuthorData = (id: string): Author | undefined => {
  return AUTHORS.find(author => author.id === id)
};
