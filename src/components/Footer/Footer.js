import Link from 'next/link';
import { getSiteConfig } from '@/lib/data';

export default function Footer() {
  const config = getSiteConfig();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span className="footer-brand">{config.siteName}</span>
          <p style={{ marginTop: 4 }}>{config.contact.address}</p>
        </div>
        <ul className="footer-links">
          <li><Link href="/paket">Packages</Link></li>
          <li><Link href="/tentang">About</Link></li>
          <li><Link href="/kontak">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
}
