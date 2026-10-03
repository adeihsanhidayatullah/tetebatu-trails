import { NextResponse } from 'next/server';
import { getActivePackages, addPackage } from '@/lib/data';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const packages = getActivePackages();
    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to load packages' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, duration, category, itinerary, includes, excludes, image, featured } = body;

    if (!name || !description || !price || !duration || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newPackage = {
      id: slug,
      slug,
      name,
      description,
      price: Number(price),
      priceLabel: `IDR ${Number(price).toLocaleString('id-ID')} / person`,
      duration,
      category,
      itinerary: itinerary || [],
      includes: includes || [],
      excludes: excludes || [],
      image: image || '',
      featured: featured || false,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addPackage(newPackage);
    return NextResponse.json({ success: true, data: newPackage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create package' }, { status: 500 });
  }
}
