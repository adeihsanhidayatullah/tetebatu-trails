'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PackageCard from '@/components/PackageCard/PackageCard';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

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
    all: 'Semua Paket',
    nature: '🌿 Alam & Trekking',
    culture: '🎋 Budaya & Kerajinan',
  };

  return (
    <div className="packages-page-wrapper">
      {/* 1. Page Hero Banner with Image & High-Contrast Title */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-content">
            <nav className="page-hero-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Beranda</Link>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">Paket Wisata</span>
            </nav>

            <div className="page-hero-badge">
              <span className="pulse-indicator"></span>
              <span>Pilihan Petualangan Lokal Tetebatu</span>
            </div>

            <h1 className="page-hero-title">
              Paket Wisata & Trekking Tetebatu
            </h1>

            <p className="page-hero-desc">
              Temukan keindahan tersembunyi di kaki Gunung Rinjani. Mulai dari trekking air terjun alami
              Jeruk Manis, jelajah pematang sawah terasering berhawa sejuk, hingga tradisi anyaman bambu
              Loyok dan tenun ikat Pringgasela bersama pemandu lokal asli.
            </p>

            <div className="page-hero-features">
              <span className="page-hero-pill">💧 Air Terjun Alami</span>
              <span className="page-hero-pill">🌾 Terasering Kaki Rinjani</span>
              <span className="page-hero-pill">🎋 Anyaman Bambu Loyok</span>
              <span className="page-hero-pill">🧵 Tenun Tradisional</span>
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
              <h3>Daftar Paket Tersedia</h3>
              <p>
                Menampilkan <strong>{filtered.length}</strong> dari <strong>{packages.length}</strong> paket wisata
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
              <p>Memuat daftar paket wisata...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada paket wisata dalam kategori ini.</p>
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
