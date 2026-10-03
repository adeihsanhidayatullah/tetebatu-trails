import { NextResponse } from 'next/server';
import { getPackageBySlug, updatePackage, deletePackage } from '@/lib/data';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const pkg = getPackageBySlug(slug);
    if (!pkg) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: pkg });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to load package' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const updated = updatePackage(slug, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const deleted = deletePackage(slug);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete package' }, { status: 500 });
  }
}
