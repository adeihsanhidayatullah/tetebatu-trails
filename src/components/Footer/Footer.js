'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer({ config }) {
  const { t } = useLanguage();
  const address = config?.contact?.address || 'Future Retreat, Tetebatu, Lombok Timur, NTB';

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span className="footer-brand">{config?.siteName || 'Tetebatu Trails'}</span>
          <p style={{ marginTop: 4 }}>{address}</p>
          <p style={{ marginTop: 6, fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: 460 }}>
            {t.footer.tagline}
          </p>
        </div>
        <ul className="footer-links">
          <li><Link href="/paket">{t.nav.packages}</Link></li>
          <li><Link href="/tentang">{t.nav.about}</Link></li>
          <li><Link href="/kontak">{t.nav.contact}</Link></li>
        </ul>
      </div>
    </footer>
  );
}
