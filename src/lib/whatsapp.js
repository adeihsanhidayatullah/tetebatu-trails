import { getSiteConfig } from '@/lib/data';

export function generateWhatsAppLink(packageName) {
  const config = getSiteConfig();
  const number = config.whatsappNumber;
  const text = encodeURIComponent(
    `Halo, saya tertarik dengan paket *${packageName}*. Bisa info lebih lanjut?`
  );
  return `https://wa.me/${number}?text=${text}`;
}

export function generateDefaultWhatsAppLink() {
  const config = getSiteConfig();
  const number = config.whatsappNumber;
  const text = encodeURIComponent(config.whatsappDefaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}

// Client-safe version that takes number and message directly
export function buildWhatsAppUrl(number, message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}
