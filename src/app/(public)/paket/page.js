'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PackageCard from '@/components/PackageCard/PackageCard';
import { useLanguage } from '@/context/LanguageContext';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { lang, t } = useLanguage();

  const isId = lang === 'id';

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(json => {
        if (json.success) setPackages(json.data);
      })
      .catch(err => console.error('Failed to load packages:', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(packages.map(p => p.category))];
  const filtered = filter === 'all' ? packages : packages.filter(p => p.category === filter);

  const categoryNames = {
    all: t.packagesPage.filterAll,
    nature: t.packagesPage.filterNature,
    culture: t.packagesPage.filterCulture,
    adventure: t.packagesPage.filterAdventure,
  };

  return (
    <div className="packages-page-wrapper">
      {/* 1. Page Hero Banner with Image & High-Contrast Title */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-content">
            <nav className="page-hero-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">{t.nav.home}</Link>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">{t.nav.packages}</span>
            </nav>

            <div className="page-hero-badge">
              <span className="pulse-indicator"></span>
              <span>{t.packagesPage.badge}</span>
            </div>

            <h1 className="page-hero-title">
              {t.packagesPage.title}
            </h1>

            <p className="page-hero-desc">
              {t.packagesPage.subtitle}
            </p>

            <div className="page-hero-features">
              <span className="page-hero-pill">{isId ? '💧 Air Terjun Alami' : '💧 Hidden Waterfalls'}</span>
              <span className="page-hero-pill">{isId ? '🌾 Terasering Kaki Rinjani' : '🌾 Rinjani Rice Terraces'}</span>
              <span className="page-hero-pill">{isId ? '🎋 Anyaman Bambu Loyok' : '🎋 Loyok Bamboo Craft'}</span>
              <span className="page-hero-pill">{isId ? '🧵 Tenun Tradisional' : '🧵 Traditional Weaving'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <section className="section packages-list-section">
        <div className="container">
          {/* Section Subheader & Filter Bar */}
          <div className="packages-filter-header">
            <div className="packages-count-info">
              <h3>{isId ? 'Daftar Paket Tersedia' : 'Available Tour Packages'}</h3>
              <p>
                {isId ? (
                  <>Menampilkan <strong>{filtered.length}</strong> dari <strong>{packages.length}</strong> paket wisata</>
                ) : (
                  <>Showing <strong>{filtered.length}</strong> of <strong>{packages.length}</strong> packages</>
                )}
              </p>
            </div>

            {/* Filter Bar with Smooth Horizontal Touch Scroll */}
            <div className="filter-bar-wrap">
              <div className="filter-bar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-btn${filter === cat ? ' active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {categoryNames[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1))}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid / States */}
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>{isId ? 'Memuat daftar paket wisata...' : 'Loading tour packages...'}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <p>{isId ? 'Belum ada paket wisata dalam kategori ini.' : 'No packages found in this category.'}</p>
            </div>
          ) : (
            <div className="pkg-grid">
              {filtered.map(pkg => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
