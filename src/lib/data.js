import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

function readJSON(filename) {
  const filePath = join(DATA_DIR, filename);
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJSON(filename, data) {
  const filePath = join(DATA_DIR, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// --- Packages ---

export function getPackages() {
  return readJSON('packages.json');
}

export function getActivePackages() {
  return getPackages().filter(p => p.active);
}

export function getFeaturedPackages() {
  return getActivePackages().filter(p => p.featured);
}

export function getPackageBySlug(slug) {
  return getPackages().find(p => p.slug === slug) || null;
}

export function getPackageCategories() {
  const packages = getActivePackages();
  return [...new Set(packages.map(p => p.category))];
}

export function savePackages(packages) {
  writeJSON('packages.json', packages);
}

export function addPackage(pkg) {
  const packages = getPackages();
  packages.push(pkg);
  savePackages(packages);
  return pkg;
}

export function updatePackage(slug, updates) {
  const packages = getPackages();
  const index = packages.findIndex(p => p.slug === slug);
  if (index === -1) return null;
  packages[index] = { ...packages[index], ...updates, updatedAt: new Date().toISOString() };
  savePackages(packages);
  return packages[index];
}

export function deletePackage(slug) {
  const packages = getPackages();
  const index = packages.findIndex(p => p.slug === slug);
  if (index === -1) return false;
  packages.splice(index, 1);
  savePackages(packages);
  return true;
}

// --- Activities ---

export function getActivities() {
  return readJSON('activities.json');
}

// --- Site Config ---

export function getSiteConfig() {
  return readJSON('site-config.json');
}
