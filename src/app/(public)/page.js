import { getFeaturedPackages, getActivePackages, getActivities, getSiteConfig } from '@/lib/data';
import HomePageClient from '@/components/Home/HomePageClient';

export const metadata = {
  title: 'Tetebatu Trails | Authentic Eco-Tours & Cultural Treks in Lombok',
  description: 'Experience tranquil rice terraces, hidden waterfalls, and artisan craft villages with local Sasak guides in Tetebatu, East Lombok.',
};

export default function HomePage() {
  const featured = getFeaturedPackages();
  const allPackages = getActivePackages();
  const activities = getActivities();
  const siteConfig = getSiteConfig();

  return (
    <HomePageClient
      featured={featured}
      allPackages={allPackages}
      activities={activities}
      siteConfig={siteConfig}
    />
  );
}
