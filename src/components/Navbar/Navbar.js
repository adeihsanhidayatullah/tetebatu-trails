'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, switchLang, t } = useLanguage();

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/paket', label: t.nav.packages },
    { href: '/tentang', label: t.nav.about },
    { href: '/kontak', label: t.nav.contact },
  ];

  const renderLangSwitcher = (extraClass = '') => (
    <div className={`navbar-lang-pill ${extraClass}`} role="group" aria-label="Language selection">
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => switchLang('en')}
        title="English"
        aria-pressed={lang === 'en'}
      >
        <span className="lang-flag">🇬🇧</span>
        <span>EN</span>
      </button>
      <span className="lang-divider">|</span>
      <button
        type="button"
        className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
        onClick={() => switchLang('id')}
        title="Bahasa Indonesia"
        aria-pressed={lang === 'id'}
      >
        <span className="lang-flag">🇮🇩</span>
        <span>ID</span>
      </button>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand">
          Tetebatu Trails
        </Link>

        {/* Right group for navigation and language switcher */}
        <div className="navbar-right-group">
          <ul className={`navbar-links${open ? ' open' : ''}`}>
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="navbar-mobile-lang-wrap">
              {renderLangSwitcher('mobile-drawer-lang')}
            </li>
          </ul>

          {/* Desktop Lang Switcher */}
          {renderLangSwitcher('desktop-lang')}

          {/* Mobile Controls: Quick Lang Switcher + Hamburger */}
          <div className="navbar-mobile-controls">
            {renderLangSwitcher('mobile-quick-lang')}
            <button
              className="navbar-menu-btn"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
