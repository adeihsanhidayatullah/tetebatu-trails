'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Paket Tur', icon: '📦', path: '/admin/packages' },
  ];

  // Close sidebar on pathname change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (pathname === '/admin/login') return;
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen, pathname]);

  const handleLogout = async () => {
    if (!confirm('Sign out from admin?')) return;
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        router.push('/admin/login');
      }
    } catch {
      alert('Logout failed');
    }
  };

  // Don't show sidebar or layout wrapper on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      {/* Mobile toggle */}
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open admin menu"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      <button
        className={`admin-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Close menu"
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div className="admin-sidebar-header">Tetebatu Trails</div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ display: sidebarOpen ? 'block' : 'none', background: 'none', padding: 4, color: 'var(--color-text-muted)' }}
            aria-label="Close menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="admin-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`admin-nav-item${pathname === item.path ? ' active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 16, marginTop: 'auto' }}>
          <div className="admin-user-box">
            <div className="admin-user-label">Logged in as</div>
            <div className="admin-user-name">Admin</div>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
