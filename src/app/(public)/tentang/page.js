import { getSiteConfig } from '@/lib/data';
import AboutPageClient from '@/components/About/AboutPageClient';

export const metadata = {
  title: 'Tentang Kami | Tetebatu Trails',
  description: 'Mengenal tim pemandu lokal di balik Tetebatu Trails. Pemandu warga asli dari lereng Gunung Rinjani, Lombok Timur.',
};

export default function AboutPage() {
  const config = getSiteConfig();

  return <AboutPageClient config={config} />;
}
