import { cookies } from 'next/headers';
import { getSiteConfig } from './data';

const SESSION_COOKIE = 'tetebatu_admin_session';
const SESSION_VALUE = 'authenticated';

export async function login(password) {
  const config = getSiteConfig();
  if (password !== config.adminPassword) {
    return false;
  }
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}
