import siteConfig from '@/data/site-config.json';

export function generateWhatsAppLink(packageName, lang = 'en') {
  const number = siteConfig.whatsappNumber;
  const message =
    lang === 'id'
      ? `Halo Tetebatu Trails, saya tertarik dengan paket *${packageName}*. Bisa minta info lebih lanjut dan ketersediaan tanggalnya?`
      : `Hello Tetebatu Trails, I am interested in booking the *${packageName}* package. Could you please share more details and availability?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generateDefaultWhatsAppLink(lang = 'en') {
  const number = siteConfig.whatsappNumber;
  const message =
    lang === 'id'
      ? (siteConfig.whatsappDefaultMessage_id || 'Halo Tetebatu Trails, saya ingin konsultasi dan menanyakan rute wisata di Tetebatu!')
      : (siteConfig.whatsappDefaultMessage || 'Hello Tetebatu Trails, I would like to inquire about your guided eco-tours in Tetebatu!');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Client-safe version that takes number and message directly
export function buildWhatsAppUrl(number, message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function buildLocalizedWhatsAppUrl(number, packageName, lang = 'en') {
  const num = number || siteConfig.whatsappNumber;
  const message =
    lang === 'id'
      ? (packageName ? `Halo Tetebatu Trails, saya tertarik dengan paket *${packageName}*. Bisa minta info jadwal dan ketersediaannya?` : `Halo Tetebatu Trails, saya ingin konsultasi paket wisata Tetebatu!`)
      : (packageName ? `Hello Tetebatu Trails, I'm interested in booking the *${packageName}* tour. Could you please share more details and availability?` : `Hello Tetebatu Trails, I'd like to ask about your guided tours in Tetebatu!`);
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
