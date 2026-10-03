import { getSiteConfig } from '@/lib/data';
import { generateDefaultWhatsAppLink } from '@/lib/whatsapp';

export const metadata = {
  title: 'Tentang Kami',
  description: 'Mengenal tim di balik Tetebatu Trails. Pemandu lokal asli dari Lombok Timur.',
};

export default function AboutPage() {
  const config = getSiteConfig();
  const waLink = generateDefaultWhatsAppLink();

  const values = [
    {
      icon: '🏡',
      title: 'Lahir & Besar di Tetebatu',
      desc: 'Bukan agen perantara luar pulau. Kami warga asli yang hidup berdampingan dengan alam Rinjani.',
    },
    {
      icon: '🌿',
      title: 'Ekowisata Berkelanjutan',
      desc: 'Menghargai kelestarian hutan, sistem subak sawah, dan kearifan lokal tanpa eksploitasi.',
    },
    {
      icon: '🤝',
      title: 'Dampak Nyata bagi Warga',
      desc: 'Mendukung langsung kehidupan petani lokal, perajin bambu Loyok, dan penenun Pringgasela.',
    },
  ];

  return (
    <div className="section page-section">
      <div className="container">
        {/* Page Header */}
        <div className="page-header-box">
          <span className="section-eyebrow">TENTANG KAMI</span>
          <h1 className="page-title">Mengenal {config.siteName}</h1>
          <p className="page-subtitle">
            Berawal dari keinginan sederhana: mengenalkan keindahan sejati Tetebatu dan desa sekitarnya
            kepada wisatawan dengan cara yang jujur, santai, dan bersahabat.
          </p>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Text Content */}
          <div className="about-content">
            <div className="about-card-box">
              <h2 className="about-story-title">Cerita & Nilai Kami</h2>
              <p className="about-paragraph">
                Tetebatu Trails didirikan oleh pemuda lokal yang lahir dan besar di desa-desa sekitar
                Tetebatu, di kaki selatan Gunung Rinjani, Lombok Timur. Kami tumbuh bersama gemericik air
                terjun, pematang sawah yang sejuk, dan cerita-cerita kuno tentang hutan adat.
              </p>
              <p className="about-paragraph">
                Kami menyelenggarakan tur kelompok kecil menyusuri air terjun alami Jeruk Manis dan Ulem Ulem,
                terasering sawah bertingkat, desa kerajinan anyaman bambu Loyok, hingga sentra tenun tradisional
                Pringgasela. Setiap perjalanan selalu mengedepankan keaslian: pemandu lokal, sajian kuliner lokal,
                dan interaksi tulus tanpa perantara.
              </p>
              <p className="about-paragraph">
                Kami sengaja membatasi rombongan (maksimal 6-8 orang) agar setiap tamu merasa dekat dengan alam
                dan tidak terburu-buru seperti tur komersial umum. Tanpa kewajiban toko suvenir, tanpa biaya
                tersembunyi.
              </p>
            </div>

            {/* Core Values */}
            <div className="about-values-grid">
              {values.map((v, i) => (
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
                Tanya & Konsultasi Rute via WhatsApp
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
                <strong>Pemandu Warga Lokal Tetebatu</strong>
                <small>Ramah, berlisensi, dan mengenal setiap jengkal jalan setapak</small>
              </div>
            </div>

            <div className="about-highlight-box">
              <div className="highlight-stat">
                <span className="stat-number">300+</span>
                <span className="stat-label">Tamu dari 20+ Negara</span>
              </div>
              <div className="highlight-stat-sep"></div>
              <div className="highlight-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Pemandu Asli Tetebatu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
