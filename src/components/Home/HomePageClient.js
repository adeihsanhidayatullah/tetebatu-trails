'use client';

import React from 'react';
import Link from 'next/link';
import PackageCard from '@/components/PackageCard/PackageCard';
import { useLanguage } from '@/context/LanguageContext';
import { buildLocalizedWhatsAppUrl } from '@/lib/whatsapp';

export default function HomePageClient({ featured, allPackages, activities, siteConfig }) {
  const { lang, t } = useLanguage();
  const isId = lang === 'id';
  const h = t.home;

  const waNumber = siteConfig?.whatsappNumber || '6281234567890';
  const defaultWaLink = buildLocalizedWhatsAppUrl(waNumber, null, lang);

  return (
    <>
      {/* 1. Modern Immersive Hero */}
      <section className="hero-modern">
        <div className="container">
          <div className="hero-modern-grid">
            {/* Left Content */}
            <div className="hero-modern-content">
              <div className="hero-pill-badge">
                <span className="pulse-indicator"></span>
                <span>{h.hero.badge}</span>
              </div>

              <h1 className="hero-modern-title">{h.hero.title}</h1>

              <p className="hero-modern-sub">{h.hero.sub}</p>

              {/* Quick Trail Tags */}
              <div className="hero-quick-tags">
                {h.hero.tags.map((tag, i) => (
                  <span key={i} className="hero-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Actions */}
              <div className="hero-actions">
                <Link href="/paket" className="btn btn-primary btn-hero-primary">
                  <span>
                    {h.hero.btnPackages} ({allPackages.length} {isId ? 'Pilihan' : 'Tours'})
                  </span>
                  <span className="btn-arrow">→</span>
                </Link>

                <a
                  href={defaultWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-hero-whatsapp"
                >
                  <svg className="wa-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.573 1.975.877 2.806.877 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.76-5.767-5.76zm3.377 8.243c-.145.409-.844.757-1.168.805-.325.048-.748.069-2.399-.582-1.986-.784-3.238-2.825-3.337-2.957-.099-.133-.808-1.074-.808-2.048s.508-1.455.688-1.656c.18-.201.394-.252.525-.252.131 0 .262.002.376.007.121.005.283-.046.442.336.164.394.557 1.359.606 1.459.049.099.082.215.016.347-.066.132-.099.215-.197.33-.099.115-.207.257-.296.345-.099.098-.202.204-.087.401.115.197.511.844 1.096 1.365.753.671 1.388.878 1.585.976.197.098.312.082.427-.049.115-.132.492-.573.623-.77.131-.197.263-.164.443-.098.18.066 1.148.541 1.345.64.197.099.328.148.377.23.049.082.049.475-.096.884z" />
                  </svg>
                  <span>{h.hero.btnWa}</span>
                </a>
              </div>

              {/* Trust Micro-Bar */}
              <div className="hero-trust-row">
                <div className="hero-trust-item">
                  <div className="hero-trust-rating">
                    <span className="stars-gold">★★★★★</span>
                    <strong>{h.hero.trust.ratingNum}</strong>
                  </div>
                  <span className="hero-trust-note">{h.hero.trust.ratingLabel}</span>
                </div>
                <div className="hero-trust-sep"></div>
                <div className="hero-trust-item">
                  <strong>{h.hero.trust.guideTitle}</strong>
                  <span className="hero-trust-note">{h.hero.trust.guideSub}</span>
                </div>
                <div className="hero-trust-sep"></div>
                <div className="hero-trust-item">
                  <strong>{h.hero.trust.groupTitle}</strong>
                  <span className="hero-trust-note">{h.hero.trust.groupSub}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="hero-modern-visual">
              <div className="hero-visual-card-main">
                <img
                  src="/images/senaru-waterfall.jpg"
                  alt="Air Terjun Jeruk Manis di Tetebatu"
                  className="hero-main-photo"
                />

                {/* Floating location chip */}
                <div className="hero-floating-chip chip-top">
                  <span className="chip-pin">💧</span>
                  <div className="chip-text">
                    <strong>{h.hero.visual.chipTitle}</strong>
                    <small>{h.hero.visual.chipSub}</small>
                  </div>
                </div>

                {/* Floating experience badge */}
                <div className="hero-floating-badge badge-bottom">
                  <div className="badge-icon">🌿</div>
                  <div className="badge-body">
                    <strong>{h.hero.visual.badgeTitle}</strong>
                    <p>{h.hero.visual.badgeDesc}</p>
                  </div>
                </div>
              </div>

              {/* Overlapping secondary photo */}
              <div className="hero-overlap-card">
                <img
                  src="/images/sasak-culture.jpg"
                  alt="Desa Kerajinan Loyok & Pringgasela"
                  className="hero-overlap-photo"
                />
                <div className="hero-overlap-label">
                  <strong>{h.hero.visual.overlapTitle}</strong>
                  <small>{h.hero.visual.overlapSub}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Highlights Strip */}
      <section className="highlights-bar">
        <div className="container">
          <div className="highlights-grid">
            {h.highlights.map((item, idx) => (
              <div key={idx} className="highlight-item">
                <span className="highlight-icon">{item.icon}</span>
                <div className="highlight-text">
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cultural & Natural Highlight Areas */}
      <section className="section destinations-section" id="destinasi">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">{h.destinations.eyebrow}</span>
            <h2 className="section-heading">{h.destinations.title}</h2>
            <p className="section-sub">{h.destinations.sub}</p>
          </div>

          <div className="destinations-grid">
            {h.destinations.items.map((dest, idx) => (
              <div key={idx} className="dest-card">
                <div className="dest-img-wrap">
                  <img src={dest.image} alt={dest.name} className="dest-img" loading="lazy" />
                  <span className="dest-badge">{dest.badge}</span>
                </div>
                <div className="dest-body">
                  <span className="dest-tagline">{dest.tagline}</span>
                  <h3 className="dest-title">{dest.name}</h3>
                  <p className="dest-desc">{dest.description}</p>

                  <div className="dest-highlights-box">
                    <span className="dest-highlights-label">{h.destinations.highlightsLabel}</span>
                    <ul className="dest-highlights-list">
                      {dest.highlights.map((item, i) => (
                        <li key={i}>
                          <span className="dest-check">✦</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={dest.link} className="dest-cta-link">
                    {h.destinations.ctaLink} {dest.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenic Nature Break with Mount Rinjani Background */}
      <section className="scenic-banner">
        <div className="container">
          <div className="scenic-banner-content">
            <span className="scenic-badge">{h.scenic.badge}</span>
            <h2 className="scenic-quote">
              &ldquo;{h.scenic.quote.replace(/[“”"]/g, '')}&rdquo;
            </h2>
            <p className="scenic-sub">{h.scenic.sub}</p>
            <div className="scenic-tags">
              {h.scenic.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Packages */}
      <section className="section featured-packages-section" id="paket-populer">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-eyebrow">{h.featuredPackages.eyebrow}</span>
              <h2 className="section-heading">{h.featuredPackages.title}</h2>
              <p className="section-sub">{h.featuredPackages.sub}</p>
            </div>
            <Link href="/paket" className="btn btn-outline btn-desktop-only">
              {isId ? `Semua ${allPackages.length} Paket →` : `All ${allPackages.length} Packages →`}
            </Link>
          </div>

          <div className="pkg-grid">
            {featured.map(pkg => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>

          <div className="section-footer-cta">
            <Link href="/paket" className="btn btn-primary btn-lg">
              {isId
                ? `Jelajahi Semua ${allPackages.length} Paket Wisata Kami →`
                : `Explore All ${allPackages.length} Tour Packages →`}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="section why-us-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">{h.whyUs.eyebrow}</span>
            <h2 className="section-heading">{h.whyUs.title}</h2>
            <p className="section-sub">{h.whyUs.sub}</p>
          </div>

          <div className="why-us-grid">
            {h.whyUs.items.map((item, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon-bubble">{item.icon}</div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How Booking Works (WhatsApp Flow) */}
      <section className="section how-it-works-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">{h.howItWorks.eyebrow}</span>
            <h2 className="section-heading">{h.howItWorks.title}</h2>
            <p className="section-sub">{h.howItWorks.sub}</p>
          </div>

          <div className="steps-modern-grid">
            {h.howItWorks.steps.map((st, idx) => (
              <React.Fragment key={st.num}>
                <div className={`step-modern-card ${idx === 1 ? 'active-step' : ''}`}>
                  <div className="step-badge-num">{st.num}</div>
                  <h3 className="step-modern-title">{st.title}</h3>
                  <p className="step-modern-desc">{st.desc}</p>
                  <div className="step-mini-tip">{st.tip}</div>
                </div>
                {idx < 2 && <div className="step-connector-arrow">➔</div>}
              </React.Fragment>
            ))}
          </div>

          {/* Quick Help Card */}
          <div className="wa-quick-box">
            <div className="wa-quick-content">
              <h4>{h.howItWorks.quickHelp.title}</h4>
              <p>{h.howItWorks.quickHelp.desc}</p>
            </div>
            <a
              href={defaultWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              {h.howItWorks.quickHelp.btn}
            </a>
          </div>
        </div>
      </section>

      {/* 7. Recent Activities / Moments Gallery */}
      {activities && activities.length > 0 && (
        <section className="section gallery-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-eyebrow">{h.gallery.eyebrow}</span>
              <h2 className="section-heading">{h.gallery.title}</h2>
              <p className="section-sub">{h.gallery.sub}</p>
            </div>

            <div className="moments-grid">
              {activities.slice(0, 4).map((act, idx) => {
                const caption = isId ? act.caption_id || act.caption : act.caption;
                const loc = isId ? act.location_id || act.location : act.location;
                const date = isId ? act.date_id || act.date : act.date;
                return (
                  <div key={act.id || idx} className="moment-card">
                    <img src={act.image} alt={caption} loading="lazy" className="moment-img" />
                    <div className="moment-overlay">
                      <span className="moment-location-tag">📍 {loc}</span>
                      <p className="moment-caption">{caption}</p>
                      <span className="moment-date">{date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. Testimonials Section */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">{h.testimonials.eyebrow}</span>
            <h2 className="section-heading">{h.testimonials.title}</h2>
            <p className="section-sub">{h.testimonials.sub}</p>
          </div>

          <div className="reviews-grid">
            {h.testimonials.items.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <div className="review-stars">★★★★★</div>
                  <span className="review-trip-tag">{rev.tag}</span>
                </div>
                <p className="review-quote">&ldquo;{rev.review}&rdquo;</p>
                <div className="review-author-info">
                  <div className="author-avatar">{rev.name.charAt(0)}</div>
                  <div>
                    <strong className="author-name">{rev.name}</strong>
                    <span className="author-origin">{rev.origin}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. High-Impact CTA Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <span className="cta-eyebrow">{h.cta.eyebrow}</span>
              <h2 className="cta-title">{h.cta.title}</h2>
              <p className="cta-desc">{h.cta.desc}</p>

              <div className="cta-actions">
                <a
                  href={defaultWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cta-whatsapp"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.573 1.975.877 2.806.877 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.76-5.767-5.76zm3.377 8.243c-.145.409-.844.757-1.168.805-.325.048-.748.069-2.399-.582-1.986-.784-3.238-2.825-3.337-2.957-.099-.133-.808-1.074-.808-2.048s.508-1.455.688-1.656c.18-.201.394-.252.525-.252.131 0 .262.002.376.007.121.005.283-.046.442.336.164.394.557 1.359.606 1.459.049.099.082.215.016.347-.066.132-.099.215-.197.33-.099.115-.207.257-.296.345-.099.098-.202.204-.087.401.115.197.511.844 1.096 1.365.753.671 1.388.878 1.585.976.197.098.312.082.427-.049.115-.132.492-.573.623-.77.131-.197.263-.164.443-.098.18.066 1.148.541 1.345.64.197.099.328.148.377.23.049.082.049.475-.096.884z" />
                  </svg>
                  <span>{h.cta.btnWa}</span>
                </a>

                <Link href="/paket" className="btn btn-cta-secondary">
                  {h.cta.btnAll}
                </Link>
              </div>

              <div className="cta-guarantees">
                {h.cta.guarantees.map((g, i) => (
                  <span key={i}>✓ {g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
