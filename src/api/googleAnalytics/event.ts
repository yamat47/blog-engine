import { config } from 'config';

type Props = {
  action: string;
  category: string;
  label: string;
  value: string;
};

const googleAnalyticsId: string | undefined = config.googleAnalyticsId;

export const event = ({ action, category, label, value = '' }: Props) => {
  if (!googleAnalyticsId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  })
};
