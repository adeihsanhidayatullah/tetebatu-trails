import Link from 'next/link';
import { getFeaturedPackages, getActivePackages, getActivities, getSiteConfig } from '@/lib/data';
import { generateDefaultWhatsAppLink } from '@/lib/whatsapp';
import PackageCard from '@/components/PackageCard/PackageCard';

export default function HomePage() {
  const featured = getFeaturedPackages();
  const allPackages = getActivePackages();
  const activities = getActivities();
  const siteConfig = getSiteConfig();
  const defaultWaLink = generateDefaultWhatsAppLink();

  // Highlight destinations
  const destinations = [
    {
      name: 'Tetebatu',
      badge: 'Lembah Hijau & Air Terjun',
      tagline: 'The Emerald Valley of East Lombok',
      description:
        'Pematang sawah terasering berhawa sejuk di kaki Gunung Rinjani. Rumah bagi air terjun Jeruk Manis, sungai jernih berbatu, dan hutan monyet hitam yang asri.',
      image: '/images/mount-rinjani.jpg',
      highlights: ['Air Terjun Jeruk Manis & Ulem Ulem', 'Terasering Sawah Kaki Rinjani', 'Hutan Monyet Hitam Langka'],
      link: '/paket',
    },
    {
      name: 'Desa Loyok',
      badge: 'Kerajinan Bambu Legendaris',
      tagline: 'Centuries of Bamboo Craftsmanship',
      description:
        'Desa pengrajin bambu tersohor sejak ratusan tahun lalu. Masuki beranda workshop warga, saksikan ketelitian jemari mereka, dan coba sendiri menganyam suvenir bambu Anda.',
      image: '/images/sasak-culture.jpg',
      highlights: ['Workshop Anyaman Interaktif', 'Bimbingan Pengrajin Generasi Tua', 'Suvenir Asli Bawa Pulang'],
      link: '/paket',
    },
    {
      name: 'Desa Pringgasela',
      badge: 'Mahakarya Tenun Sasak',
      tagline: 'Timeless Natural Dye & Songket',
      description:
        'Pusat tenun ikat tradisional Sasak yang masih melestarikan pewarna alami dari akar, daun, dan kulit pohon lokal. Kenali filosofi motif kain dari para penenun wanita desa.',
      image: '/images/team-arno.jpg',
      highlights: ['Alat Tenun Tradisional Gedogan', 'Pewarna Alami Tumbuhan Hutan', 'Edukasi Budaya Sasak Otentik'],
      link: '/paket',
    },
  ];

  // Why Choose Us
  const whyUs = [
    {
      icon: '🧭',
      title: '100% Pemandu Warga Asli',
      desc: 'Kami lahir dan dibesarkan di Tetebatu. Kami tahu setiap jalan setapak rahasia, waktu terbaik melihat kabut sawah, dan warung kopi lokal paling hangat.',
    },
    {
      icon: '🌿',
      title: 'Bebas Tourist Trap & Ramah Lingkungan',
      desc: 'Tidak ada toko suvenir titipan atau rute turis komersial yang sesak. Pengeluaran Anda langsung membantu ekonomi keluarga petani dan pengrajin lokal.',
    },
    {
      icon: '👥',
      title: 'Grup Kecil & Ritme Santai',
      desc: 'Maksimal 6 orang per pemandu agar perjalanan tetap personal. Anda bebas berhenti kapan pun untuk berfoto, istirahat, atau mengobrol santai dengan warga.',
    },
    {
      icon: '⚡',
      title: 'Pemesanan Instan via WhatsApp',
      desc: 'Tanpa formulir panjang atau registrasi akun. Cukup satu klik untuk langsung terhubung dengan pemandu kami dan menentukan jadwal yang cocok.',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah & David',
      origin: 'Amsterdam, Netherlands',
      rating: 5,
      review:
        'Tetebatu adalah bagian Lombok yang paling magis! Menyeberangi sawah berkabut pagi hari dan berenang di Jeruk Manis tanpa ada turis lain adalah momen tak terlupakan. Pemandu kami sangat ramah dan sabar.',
      tag: 'Trek Air Terjun & Sawah',
    },
    {
      name: 'Keluarga Budi Santoso',
      origin: 'Jakarta, Indonesia',
      rating: 5,
      review:
        'Anak-anak sangat antusias saat diajak berkunjung ke Loyok dan diajari cara menganyam bambu sendiri. Udaranya sejuk, makan siangnya enak, dan pemandunya sangat paham sejarah lokal.',
      tag: 'Wisata Budaya Loyok & Pringgasela',
    },
    {
      name: 'Liam & Emma',
      origin: 'Melbourne, Australia',
      rating: 5,
      review:
        'No tourist traps, no rushing. Just pure nature, genuine locals, and beautiful scenery under Mount Rinjani. Booking through WhatsApp was super quick and straightforward!',
      tag: 'Full Day Culture & Nature',
    },
  ];

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
                <span>Pemandu Lokal Asli · Kaki Gunung Rinjani</span>
              </div>

              <h1 className="hero-modern-title">
                Jelajah Air Terjun Tersembunyi & Terasering Hijau Tetebatu
              </h1>

              <p className="hero-modern-sub">
                Rasakan ketenangan Lombok yang sesungguhnya. Trekking menyusuri air terjun alami
                Jeruk Manis, berjalan di pematang sawah berhawa sejuk, hingga menyelami tradisi
                anyaman bambu Loyok dan tenun Pringgasela bersama warga lokal.
              </p>

              {/* Quick Trail Tags */}
              <div className="hero-quick-tags">
                <span className="hero-tag">💧 Air Terjun Jeruk Manis</span>
                <span className="hero-tag">🌾 Terasering Kaki Rinjani</span>
                <span className="hero-tag">🎋 Anyaman Bambu Loyok</span>
                <span className="hero-tag">🧵 Tenun Alami Pringgasela</span>
              </div>

              {/* CTA Actions */}
              <div className="hero-actions">
                <Link href="/paket" className="btn btn-primary btn-hero-primary">
                  <span>Lihat Paket Wisata ({allPackages.length} Pilihan)</span>
                  <span className="btn-arrow">→</span>
                </Link>

                <a
                  href={defaultWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-hero-whatsapp"
                >
                  <svg className="wa-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.573 1.975.877 2.806.877 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.76-5.767-5.76zm3.377 8.243c-.145.409-.844.757-1.168.805-.325.048-.748.069-2.399-.582-1.986-.784-3.238-2.825-3.337-2.957-.099-.133-.808-1.074-.808-2.048s.508-1.455.688-1.656c.18-.201.394-.252.525-.252.131 0 .262.002.376.007.121.005.283-.046.442.336.164.394.557 1.359.606 1.459.049.099.082.215.016.347-.066.132-.099.215-.197.33-.099.115-.207.257-.296.345-.099.098-.202.204-.087.401.115.197.511.844 1.096 1.365.753.671 1.388.878 1.585.976.197.098.312.082.427-.049.115-.132.492-.573.623-.77.131-.197.263-.164.443-.098.18.066 1.148.541 1.345.64.197.099.328.148.377.23.049.082.049.475-.096.884z"/>
                  </svg>
                  <span>Chat Langsung via WhatsApp</span>
                </a>
              </div>

              {/* Trust Micro-Bar */}
              <div className="hero-trust-row">
                <div className="hero-trust-item">
                  <div className="hero-trust-rating">
                    <span className="stars-gold">★★★★★</span>
                    <strong>4.9 / 5.0</strong>
                  </div>
                  <span className="hero-trust-note">Dari 300+ tamu dunia</span>
                </div>
                <div className="hero-trust-sep"></div>
                <div className="hero-trust-item">
                  <strong>🧭 100% Pemandu Lokal</strong>
                  <span className="hero-trust-note">Warga asli Tetebatu</span>
                </div>
                <div className="hero-trust-sep"></div>
                <div className="hero-trust-item">
                  <strong>👥 Small Group & Privat</strong>
                  <span className="hero-trust-note">Nyaman & tidak diburu waktu</span>
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
                    <strong>Air Terjun Jeruk Manis</strong>
                    <small>Trek Hutan & Kolam Alami</small>
                  </div>
                </div>

                {/* Floating experience badge */}
                <div className="hero-floating-badge badge-bottom">
                  <div className="badge-icon">🌿</div>
                  <div className="badge-body">
                    <strong>Suasana Sejuk & Damai</strong>
                    <p>Mata air segar langsung dari Gunung Rinjani</p>
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
                  <strong>Tradisi Sasak Asli</strong>
                  <small>Anyaman Loyok & Tenun Pringgasela</small>
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
            <div className="highlight-item">
              <span className="highlight-icon">⛰️</span>
              <div className="highlight-text">
                <strong>Kaki Gunung Rinjani</strong>
                <p>Udara sejuk pegunungan & lanskap hijau bertingkat</p>
              </div>
            </div>

            <div className="highlight-item">
              <span className="highlight-icon">💧</span>
              <div className="highlight-text">
                <strong>Air Terjun Alami</strong>
                <p>Trekking sungai jernih & kolam renang alami yang menyegarkan</p>
              </div>
            </div>

            <div className="highlight-item">
              <span className="highlight-icon">🎋</span>
              <div className="highlight-text">
                <strong>Desa Budaya Bersejarah</strong>
                <p>Workshop bambu di Loyok & tenun ikat tradisional di Pringgasela</p>
              </div>
            </div>

            <div className="highlight-item">
              <span className="highlight-icon">💬</span>
              <div className="highlight-text">
                <strong>Pesan Cepat via WhatsApp</strong>
                <p>Diskusi langsung tanpa perantara & tanpa biaya tersembunyi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Destinations Showcase */}
      <section className="section destinations-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">DESTINASI UNGGULAN</span>
            <h2 className="section-heading">Tiga Permata Lombok Timur yang Kami Jelajahi</h2>
            <p className="section-sub">
              Kombinasi menakjubkan antara keasrian alam pegunungan tropis dan warisan tradisi budaya
              suku Sasak yang hidup berdampingan secara harmonis.
            </p>
          </div>

          <div className="destinations-grid">
            {destinations.map((dest, idx) => (
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
                    <span className="dest-highlights-label">Sorotan Pengalaman:</span>
                    <ul className="dest-highlights-list">
                      {dest.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="dest-check">✦</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={dest.link} className="dest-cta-link">
                    Lihat Paket di {dest.name} →
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
            <span className="scenic-badge">🌿 KESEJUKAN ALAMI KAKI GUNUNG RINJANI</span>
            <h2 className="scenic-quote">
              &ldquo;Bukan sekadar perjalanan wisata biasa, tapi menyelami ketenangan alam dan kehangatan warga desa yang sesungguhnya.&rdquo;
            </h2>
            <p className="scenic-sub">
              Rasakan gemericik aliran sungai jernih dari hutan Rinjani, tegur sapa ramah petani di pematang terasering, dan nikmati secangkir kopi robusta Tetebatu yang disangrai tradisional.
            </p>
            <div className="scenic-tags">
              <span>🌾 Terasering Subak Berhawa Sejuk</span>
              <span>💧 Air Terjun Alami Tanpa Keramaian</span>
              <span>☕ Kopi & Kuliner Khas Sasak</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Packages */}
      <section className="section featured-packages-section" id="paket-populer">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-eyebrow">PILIHAN PALING DISUKAI</span>
              <h2 className="section-heading">Paket Wisata & Trekking Terpopuler</h2>
              <p className="section-sub">
                Pilihan favorit para pelancong untuk menjelajahi keindahan alam dan kehangatan Tetebatu.
              </p>
            </div>
            <Link href="/paket" className="btn btn-outline btn-desktop-only">
              Semua {allPackages.length} Paket →
            </Link>
          </div>

          <div className="pkg-grid">
            {featured.map(pkg => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>

          <div className="section-footer-cta">
            <Link href="/paket" className="btn btn-primary btn-lg">
              Jelajahi Semua {allPackages.length} Paket Wisata Kami →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="section why-us-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">KEUNGGULAN KAMI</span>
            <h2 className="section-heading">Kenapa Menjelajah Bersama Tetebatu Trails?</h2>
            <p className="section-sub">
              Kami bukan biro perjalanan korporat dari luar kota. Kami adalah warga lokal yang mencintai
              dan bangga akan tanah kelahiran kami.
            </p>
          </div>

          <div className="why-us-grid">
            {whyUs.map((item, idx) => (
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
            <span className="section-eyebrow">PROSES MUDAH & CEPAT</span>
            <h2 className="section-heading">Cara Memulai Petualangan Anda</h2>
            <p className="section-sub">
              Pemesanan sangat fleksibel. Langsung berdiskusi dengan tim kami di WhatsApp tanpa form rumit.
            </p>
          </div>

          <div className="steps-modern-grid">
            <div className="step-modern-card">
              <div className="step-badge-num">01</div>
              <h3 className="step-modern-title">Pilih Paket Wisata</h3>
              <p className="step-modern-desc">
                Pilih paket trekking air terjun, jalan sawah terasering, atau kunjungan budaya yang sesuai
                dengan waktu Anda (Half Day atau Full Day).
              </p>
              <div className="step-mini-tip">💡 Bisa custom rute sesuai keinginan</div>
            </div>

            <div className="step-connector-arrow">➔</div>

            <div className="step-modern-card active-step">
              <div className="step-badge-num">02</div>
              <h3 className="step-modern-title">Chat WhatsApp Langsung</h3>
              <p className="step-modern-desc">
                Tekan tombol WhatsApp pada paket yang dipilih. Pesan otomatis sudah disiapkan, tinggal
                kirim tanggal kedatangan dan jumlah peserta rombongan Anda.
              </p>
              <div className="step-mini-tip">⚡ Respon cepat dalam hitungan menit</div>
            </div>

            <div className="step-connector-arrow">➔</div>

            <div className="step-modern-card">
              <div className="step-badge-num">03</div>
              <h3 className="step-modern-title">Siap Menjelajah!</h3>
              <p className="step-modern-desc">
                Kami siap menyambut Anda di titik temu atau penginapan di Tetebatu. Mulai petualangan
                asli yang tak terlupakan bersama pemandu lokal!
              </p>
              <div className="step-mini-tip">🤝 Pembayaran transparan & jujur</div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="wa-quick-box">
            <div className="wa-quick-content">
              <h4>Punya Rencana Sendiri atau Butuh Saran Jadwal?</h4>
              <p>
                Ceritakan waktu liburan Anda kepada kami, dan kami bantu susunkan jadwal terbaik selama
                di Tetebatu tanpa biaya tambahan.
              </p>
            </div>
            <a
              href={defaultWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Konsultasi Rute Gratis via WA
            </a>
          </div>
        </div>
      </section>

      {/* 7. Recent Activities / Moments Gallery */}
      {activities.length > 0 && (
        <section className="section gallery-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-eyebrow">DOKUMENTASI DARI LAPANGAN</span>
              <h2 className="section-heading">Momen Seru Para Tamu Kami</h2>
              <p className="section-sub">
                Potret langsung dari petualangan menyusuri jalan setapak, air terjun, dan keramahan warga desa.
              </p>
            </div>

            <div className="moments-grid">
              {activities.slice(0, 4).map((act, idx) => (
                <div key={act.id || idx} className="moment-card">
                  <img src={act.image} alt={act.caption} loading="lazy" className="moment-img" />
                  <div className="moment-overlay">
                    <span className="moment-location-tag">📍 {act.location}</span>
                    <p className="moment-caption">{act.caption}</p>
                    <span className="moment-date">{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Testimonials Section */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">CERITA WISATAWAN</span>
            <h2 className="section-heading">Apa Kata Mereka yang Sudah Mencobanya?</h2>
            <p className="section-sub">
              Ulasan nyata dari para penjelajah yang mencari sisi Lombok yang sejuk, damai, dan penuh kehangatan.
            </p>
          </div>

          <div className="reviews-grid">
            {testimonials.map((rev, idx) => (
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
              <span className="cta-eyebrow">SIAP MENIKMATI KEDAMAIAN LOMBOK?</span>
              <h2 className="cta-title">
                Rencanakan Petualangan Anda di Tetebatu Bersama Pemandu Lokal
              </h2>
              <p className="cta-desc">
                Air terjun Jeruk Manis yang sejuk, sawah terasering berlatar Rinjani, dan keramahan
                warga desa siap menyambut Anda. Cukup klik tombol WhatsApp di bawah untuk konsultasi
                dan jadwal perjalanan Anda!
              </p>

              <div className="cta-actions">
                <a
                  href={defaultWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cta-whatsapp"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.573 1.975.877 2.806.877 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.76-5.767-5.76zm3.377 8.243c-.145.409-.844.757-1.168.805-.325.048-.748.069-2.399-.582-1.986-.784-3.238-2.825-3.337-2.957-.099-.133-.808-1.074-.808-2.048s.508-1.455.688-1.656c.18-.201.394-.252.525-.252.131 0 .262.002.376.007.121.005.283-.046.442.336.164.394.557 1.359.606 1.459.049.099.082.215.016.347-.066.132-.099.215-.197.33-.099.115-.207.257-.296.345-.099.098-.202.204-.087.401.115.197.511.844 1.096 1.365.753.671 1.388.878 1.585.976.197.098.312.082.427-.049.115-.132.492-.573.623-.77.131-.197.263-.164.443-.098.18.066 1.148.541 1.345.64.197.099.328.148.377.23.049.082.049.475-.096.884z"/>
                  </svg>
                  <span>Chat Pemandu via WhatsApp</span>
                </a>

                <Link href="/paket" className="btn btn-cta-secondary">
                  Lihat Semua Paket
                </Link>
              </div>

              <div className="cta-guarantees">
                <span>✓ Konfirmasi Cepat</span>
                <span>✓ Tanpa Biaya Tersembunyi</span>
                <span>✓ Pembayaran Fleksibel di Tempat</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
