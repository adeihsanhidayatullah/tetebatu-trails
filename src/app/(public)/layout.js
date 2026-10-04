import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton/WhatsAppButton';
import { LanguageProvider } from '@/context/LanguageContext';
import { getSiteConfig } from '@/lib/data';
import { cookies } from 'next/headers';

export default async function PublicLayout({ children }) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('tetebatu_lang')?.value;
  const initialLang = langCookie === 'id' || langCookie === 'en' ? langCookie : 'en';
  const config = getSiteConfig();

  return (
    <LanguageProvider initialLang={initialLang}>
      <Navbar />
      <main>{children}</main>
      <Footer config={config} />
      <WhatsAppFloatingButton />
    </LanguageProvider>
  );
}
