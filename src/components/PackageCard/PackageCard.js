'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PackageCard({ pkg }) {
  const { lang, t } = useLanguage();

  const isId = lang === 'id';
  const name = isId ? (pkg.name_id || pkg.name) : pkg.name;
  const description = isId ? (pkg.description_id || pkg.description) : pkg.description;
  const duration = isId ? (pkg.duration_id || pkg.duration) : pkg.duration;
  const priceLabel = isId ? (pkg.priceLabel_id || pkg.priceLabel) : pkg.priceLabel;
  const includes = isId ? (pkg.includes_id || pkg.includes) : pkg.includes;

  const categoryLabels = {
    nature: isId ? '🌿 Alam & Trekking' : '🌿 Nature & Treks',
    culture: isId ? '🎋 Budaya & Kerajinan' : '🎋 Culture & Crafts',
    adventure: isId ? '🧗 Petualangan' : '🧗 Adventure',
  };

  const categoryLabel = categoryLabels[pkg.category] || pkg.category;

  return (
    <div className="pkg-card">
      <div className="pkg-card-img-wrap">
        <img
          src={pkg.image}
          alt={name}
          className="pkg-card-img"
          loading="lazy"
        />
        <div className="pkg-card-badges">
          <span className="pkg-card-badge-category">{categoryLabel}</span>
          <span className="pkg-card-badge-duration">⏱️ {duration}</span>
        </div>
      </div>

      <div className="pkg-card-body">
        <h3 className="pkg-card-title">
          <Link href={`/paket/${pkg.slug}`}>{name}</Link>
        </h3>
        
        <p className="pkg-card-desc">{description}</p>

        {includes && includes.length > 0 && (
          <div className="pkg-card-highlights">
            <span className="pkg-card-highlights-title">{t.common.includes}</span>
            <ul className="pkg-card-highlights-list">
              {includes.slice(0, 2).map((item, idx) => (
                <li key={idx}>
                  <span className="pkg-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pkg-card-footer">
        <div className="pkg-card-pricing">
          <span className="pkg-card-price-label">{t.common.rate}</span>
          <span className="pkg-card-price">{priceLabel || `IDR ${pkg.price?.toLocaleString('id-ID')}`}</span>
        </div>
        <Link href={`/paket/${pkg.slug}`} className="btn-card-action">
          {t.common.viewDetails}
        </Link>
      </div>
    </div>
  );
}
