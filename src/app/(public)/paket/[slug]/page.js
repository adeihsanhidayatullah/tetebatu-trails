import { getPackageBySlug, getActivePackages, getSiteConfig } from '@/lib/data';
import { notFound } from 'next/navigation';
import PackageDetailClient from '@/components/PackageDetail/PackageDetailClient';

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

  const siteConfig = getSiteConfig();
  const allPackages = getActivePackages();
  const related = allPackages
    .filter(p => p.category === pkg.category && p.slug !== pkg.slug)
    .slice(0, 3);

  return (
    <PackageDetailClient
      pkg={pkg}
      related={related}
      siteConfig={siteConfig}
    />
  );
}
