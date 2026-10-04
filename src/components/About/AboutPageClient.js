'use client';

import { useLanguage } from '@/context/LanguageContext';
import { buildLocalizedWhatsAppUrl } from '@/lib/whatsapp';

export default function AboutPageClient({ config }) {
  const { lang, t } = useLanguage();
  const isId = lang === 'id';
  const about = t.aboutPage;

  const waNumber = config?.whatsappNumber || '6281234567890';
  const waLink = buildLocalizedWhatsAppUrl(waNumber, null, lang);

  return (
    <div className="section page-section">
      <div className="container">
        {/* Page Header */}
        <div className="page-header-box">
          <span className="section-eyebrow">{about.eyebrow}</span>
          <h1 className="page-title">{about.title}</h1>
          <p className="page-subtitle">{about.subtitle}</p>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Text Content */}
          <div className="about-content">
            <div className="about-card-box">
              <h2 className="about-story-title">{about.storyTitle}</h2>
              <p className="about-paragraph">{about.story1}</p>
              <p className="about-paragraph">{about.story2}</p>
              <p className="about-paragraph">{about.story3}</p>
            </div>

            {/* Core Values */}
            <div className="about-values-grid">
              {about.values.map((v, i) => (
                <div key={i} className="about-value-item">
                  <span className="about-value-icon">{v.icon}</span>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="about-cta-row">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                {about.ctaBtn}
              </a>
            </div>
          </div>

          {/* Image & Card */}
          <div className="about-visual-col">
            <div className="about-img-wrap">
              <img
                src="/images/team-arno.jpg"
                alt="Tim pemandu Tetebatu Trails"
                className="about-img"
              />
              <div className="about-img-caption">
                <strong>{isId ? 'Pemandu Warga Lokal Tetebatu' : 'Native Tetebatu Guides'}</strong>
                <small>
                  {isId
                    ? 'Ramah, berpengalaman, dan mengenal setiap jengkal jalan setapak'
                    : 'Warm, experienced, and knowing every trail since childhood'}
                </small>
              </div>
            </div>

            <div className="about-highlight-box">
              <div className="highlight-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">
                  {isId ? 'Tamu dari 20+ Negara' : 'Travelers from 20+ Countries'}
                </span>
              </div>
              <div className="highlight-stat-sep"></div>
              <div className="highlight-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">
                  {isId ? 'Pemandu Asli Tetebatu' : 'Native Sasak Guides'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
