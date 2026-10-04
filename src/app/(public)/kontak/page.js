import { getSiteConfig } from '@/lib/data';
import ContactPageClient from '@/components/Contact/ContactPageClient';

export const metadata = {
  title: 'Hubungi Kami | Tetebatu Trails',
  description: 'Hubungi tim Tetebatu Trails. WhatsApp, email, atau temui kami di basecamp Tetebatu, Lombok Timur.',
};

export default function ContactPage() {
  const config = getSiteConfig();

  return <ContactPageClient config={config} />;
}
