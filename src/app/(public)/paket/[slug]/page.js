import Link from 'next/link';
import { getPackageBySlug, getActivePackages } from '@/lib/data';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { notFound } from 'next/navigation';
import PackageCard from '@/components/PackageCard/PackageCard';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: 'Package Not Found' };
  return {
    title: `${pkg.name} | Tetebatu Trails`,
    description: pkg.description,
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) notFound();

  const waLink = generateWhatsAppLink(pkg.name);

  const allPackages = getActivePackages();
  const related = allPackages
    .filter(p => p.category === pkg.category && p.slug !== pkg.slug)
    .slice(0, 3);

  const categoryLabels = {
    nature: '🌿 Alam & Trekking',
    culture: '🎋 Budaya & Kerajinan',
  };

  return (
    <div className="section page-section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Beranda</Link>
          <span className="crumb-sep">/</span>
          <Link href="/paket">Paket Wisata</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{pkg.name}</span>
        </nav>

        {/* Hero Image */}
        <div className="pkg-detail-hero-wrap">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="pkg-detail-hero"
          />
          <div className="pkg-detail-hero-badge">
            {categoryLabels[pkg.category] || pkg.category}
          </div>
        </div>

        {/* Header & Booking Card */}
        <div className="pkg-detail-header">
          <div className="pkg-detail-title-box">
            <span className="pkg-detail-meta-pill">⏱️ {pkg.duration}</span>
            <h1 className="pkg-detail-title">{pkg.name}</h1>
            <p className="pkg-detail-lead">{pkg.description}</p>
          </div>

          <div className="pkg-detail-cta-box">
            <div className="pkg-detail-price-box">
              <span className="pkg-detail-price-label">Tarif Paket</span>
              <span className="pkg-detail-price">{pkg.priceLabel}</span>
            </div>
            
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-detail-action"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.573 1.975.877 2.806.877 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.76-5.767-5.76zm3.377 8.243c-.145.409-.844.757-1.168.805-.325.048-.748.069-2.399-.582-1.986-.784-3.238-2.825-3.337-2.957-.099-.133-.808-1.074-.808-2.048s.508-1.455.688-1.656c.18-.201.394-.252.525-.252.131 0 .262.002.376.007.121.005.283-.046.442.336.164.394.557 1.359.606 1.459.049.099.082.215.016.347-.066.132-.099.215-.197.33-.099.115-.207.257-.296.345-.099.098-.202.204-.087.401.115.197.511.844 1.096 1.365.753.671 1.388.878 1.585.976.197.098.312.082.427-.049.115-.132.492-.573.623-.77.131-.197.263-.164.443-.098.18.066 1.148.541 1.345.64.197.099.328.148.377.23.049.082.049.475-.096.884z"/>
              </svg>
              <span>Booking via WhatsApp</span>
            </a>

            <div className="pkg-cta-guarantee">
              <span>✓ Konfirmasi langsung</span>
              <span>✓ Bayar di tempat</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="pkg-detail-body-grid">
          {/* Main Info */}
          <div className="pkg-detail-main">
            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="pkg-detail-card-section">
                <div className="pkg-section-title-wrap">
                  <span className="pkg-section-icon">🧭</span>
                  <h3>Jadwal & Rencana Perjalanan (Itinerary)</h3>
                </div>
                <ol className="itinerary-list">
                  {pkg.itinerary.map((item, i) => (
                    <li key={i} className="itinerary-item">
                      <div className="itinerary-dot"></div>
                      <div className="itinerary-content">
                        <strong>Langkah {item.order || i + 1}</strong>
                        <p>{item.title || item}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Includes & Excludes */}
            <div className="pkg-detail-card-section">
              <div className="pkg-section-title-wrap">
                <span className="pkg-section-icon">📋</span>
                <h3>Fasilitas Tur</h3>
              </div>
              <div className="inc-exc-grid">
                {pkg.includes && pkg.includes.length > 0 && (
                  <div className="inc-box">
                    <h4 className="inc-title">✓ Termasuk dalam Paket</h4>
                    <ul className="inc-list">
                      {pkg.includes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {pkg.excludes && pkg.excludes.length > 0 && (
                  <div className="exc-box">
                    <h4 className="exc-title">✕ Tidak Termasuk</h4>
                    <ul className="exc-list">
                      {pkg.excludes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Booking Banner */}
        <div className="pkg-detail-bottom-cta">
          <div className="bottom-cta-content">
            <h3>Tertarik dengan Petualangan Ini?</h3>
            <p>
              Tanyakan tanggal yang Anda inginkan atau diskusikan kebutuhan penjemputan bersama pemandu lokal kami.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            Chat WhatsApp Sekarang
          </a>
        </div>

        {/* Related Packages */}
        {related.length > 0 && (
          <div className="pkg-related-section">
            <h3 className="section-heading">Paket Serupa Lainnya</h3>
            <p className="section-sub">Pilihan tur alternatif yang mungkin Anda minati.</p>
            <div className="pkg-grid" style={{ marginTop: 24 }}>
              {related.map(p => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
