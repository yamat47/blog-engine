import { NextPage } from 'next'

type Props = {
  googleAnalyticsId: string;
};

export const GoogleTagManagerScript: NextPage<Props> = ({ googleAnalyticsId }: Props) => {
  return (
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
    />
  );
};
