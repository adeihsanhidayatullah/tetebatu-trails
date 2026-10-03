import Link from 'next/link';

export default function PackageCard({ pkg }) {
  const categoryLabels = {
    nature: '🌿 Alam & Trekking',
    culture: '🎋 Budaya & Kerajinan',
  };

  const categoryLabel = categoryLabels[pkg.category] || pkg.category;

  return (
    <div className="pkg-card">
      <div className="pkg-card-img-wrap">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="pkg-card-img"
          loading="lazy"
        />
        <div className="pkg-card-badges">
          <span className="pkg-card-badge-category">{categoryLabel}</span>
          <span className="pkg-card-badge-duration">⏱️ {pkg.duration}</span>
        </div>
      </div>

      <div className="pkg-card-body">
        <h3 className="pkg-card-title">
          <Link href={`/paket/${pkg.slug}`}>{pkg.name}</Link>
        </h3>
        
        <p className="pkg-card-desc">{pkg.description}</p>

        {pkg.includes && pkg.includes.length > 0 && (
          <div className="pkg-card-highlights">
            <span className="pkg-card-highlights-title">Termasuk dalam paket:</span>
            <ul className="pkg-card-highlights-list">
              {pkg.includes.slice(0, 2).map((item, idx) => (
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
          <span className="pkg-card-price-label">Tarif</span>
          <span className="pkg-card-price">{pkg.priceLabel || `IDR ${pkg.price?.toLocaleString('id-ID')}`}</span>
        </div>
        <Link href={`/paket/${pkg.slug}`} className="btn-card-action">
          Detail Paket →
        </Link>
      </div>
    </div>
  );
}
