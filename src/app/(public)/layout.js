import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton/WhatsAppButton';

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
