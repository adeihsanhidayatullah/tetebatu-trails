'use client';

import { useLanguage } from '@/context/LanguageContext';
import { buildLocalizedWhatsAppUrl } from '@/lib/whatsapp';

export default function ContactPageClient({ config }) {
  const { lang, t } = useLanguage();
  const isId = lang === 'id';
  const c = t.contactPage;

  const waNumber = config?.contact?.phone || config?.whatsappNumber || '6281234567890';
  const waLink = buildLocalizedWhatsAppUrl(config?.whatsappNumber || '6281234567890', null, lang);

  return (
    <div className="section page-section">
      <div className="container">
        {/* Header */}
        <div className="page-header-box">
          <span className="section-eyebrow">{c.eyebrow}</span>
          <h1 className="page-title">{c.title}</h1>
          <p className="page-subtitle">{c.subtitle}</p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-card-box">
            <h2 className="contact-card-title">{c.infoCardTitle}</h2>
            <p className="contact-card-sub">{c.infoCardSub}</p>

            <div className="contact-items-list">
              {/* WhatsApp */}
              <div className="contact-item">
                <div className="contact-icon-bubble">💬</div>
                <div className="contact-item-info">
                  <div className="contact-label">{c.whatsappLabel}</div>
                  <div className="contact-value">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-highlight-link"
                    >
                      {config?.contact?.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon-bubble">✉️</div>
                <div className="contact-item-info">
                  <div className="contact-label">{c.emailLabel}</div>
                  <div className="contact-value">
                    <a href={`mailto:${config?.contact?.email}`}>
                      {config?.contact?.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item">
                <div className="contact-icon-bubble">📍</div>
                <div className="contact-item-info">
                  <div className="contact-label">{c.addressLabel}</div>
                  <div className="contact-value">{config?.contact?.address}</div>
                  {config?.contact?.mapsUrl && (
                    <a
                      href={config.contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-map-link-inline"
                    >
                      {c.openInMaps}
                    </a>
                  )}
                </div>
              </div>

              {/* Instagram */}
              {config?.socialMedia?.instagram && (
                <div className="contact-item">
                  <div className="contact-icon-bubble">📸</div>
                  <div className="contact-item-info">
                    <div className="contact-label">Instagram</div>
                    <div className="contact-value">
                      <a
                        href={config.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{config.socialMedia.instagram.split('/').pop()}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="contact-btn-wrap">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg btn-whatsapp-contact"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.573 1.975.877 2.806.877 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.76-5.767-5.76zm3.377 8.243c-.145.409-.844.757-1.168.805-.325.048-.748.069-2.399-.582-1.986-.784-3.238-2.825-3.337-2.957-.099-.133-.808-1.074-.808-2.048s.508-1.455.688-1.656c.18-.201.394-.252.525-.252.131 0 .262.002.376.007.121.005.283-.046.442.336.164.394.557 1.359.606 1.459.049.099.082.215.016.347-.066.132-.099.215-.197.33-.099.115-.207.257-.296.345-.099.098-.202.204-.087.401.115.197.511.844 1.096 1.365.753.671 1.388.878 1.585.976.197.098.312.082.427-.049.115-.132.492-.573.623-.77.131-.197.263-.164.443-.098.18.066 1.148.541 1.345.64.197.099.328.148.377.23.049.082.049.475-.096.884z"/>
                </svg>
                <span>{c.openWaBtn}</span>
              </a>
            </div>
          </div>

          {/* Visual & Location Helper */}
          <div className="contact-visual-col">
            <div className="contact-img-wrap">
              <img
                src="/images/hero-lombok.jpg"
                alt="Pemandangan desa Tetebatu Lombok Timur"
                className="contact-img"
              />
              <div className="contact-img-badge">
                <strong>📍 {isId ? 'Desa Wisata Tetebatu' : 'Tetebatu Tourism Village'}</strong>
                <small>
                  {isId ? 'Kecamatan Sikur, Kabupaten Lombok Timur, NTB' : 'Sikur District, East Lombok Regency, NTB'}
                </small>
              </div>
            </div>

            <div className="contact-faq-mini">
              <h4>{c.faqTitle}</h4>
              <p>{c.faqText}</p>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        {config?.contact?.mapEmbedUrl && (
          <section className="contact-map-section">
            <div className="contact-map-card">
              <div className="contact-map-header">
                <div>
                  <span className="section-eyebrow">{c.mapEyebrow}</span>
                  <h2 className="contact-map-title">{c.mapTitle}</h2>
                  <p className="contact-map-desc">{c.mapDesc}</p>
                </div>
                {config.contact.mapsUrl && (
                  <a
                    href={config.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary contact-map-btn"
                  >
                    <span>{c.mapBtn}</span>
                  </a>
                )}
              </div>
              <div className="contact-map-iframe-container">
                <iframe
                  src={config.contact.mapEmbedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Lokasi Tetebatu Trails - Future Retreat"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
