'use client';

import { useState, useEffect } from 'react';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editSlug, setEditSlug] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const emptyForm = {
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'nature',
    itinerary: [''],
    includes: [''],
    excludes: [''],
    image: '',
    featured: false,
    active: true,
  };

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      const json = await res.json();
      if (json.success) setPackages(json.data);
    } catch (err) {
      console.error('Failed to load packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const openAdd = () => {
    setIsEdit(false);
    setEditSlug(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreviewUrl(null);
    setShowModal(true);
  };

  const openEdit = (pkg) => {
    setIsEdit(true);
    setEditSlug(pkg.slug);
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration,
      category: pkg.category,
      itinerary: pkg.itinerary?.map(i => i.title || i) || [''],
      includes: pkg.includes || [''],
      excludes: pkg.excludes || [''],
      image: pkg.image || '',
      featured: pkg.featured || false,
      active: pkg.active !== false,
    });
    setImageFile(null);
    setPreviewUrl(pkg.image || null);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return form.image;
    const fd = new FormData();
    fd.append('file', imageFile);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const json = await res.json();
    if (json.success) return json.url;
    throw new Error('Upload failed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const imageUrl = await uploadImage();
      const itinerary = form.itinerary
        .filter(t => t.trim())
        .map((title, i) => ({ order: i + 1, title }));
      const includes = form.includes.filter(t => t.trim());
      const excludes = form.excludes.filter(t => t.trim());

      const body = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        duration: form.duration,
        category: form.category,
        itinerary,
        includes,
        excludes,
        image: imageUrl,
        featured: form.featured,
        active: form.active,
      };

      const url = isEdit ? `/api/packages/${editSlug}` : '/api/packages';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (json.success) {
        setShowModal(false);
        fetchPackages();
      } else {
        alert(json.error || 'Failed to save');
      }
    } catch (err) {
      alert('Error saving package');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/packages/${slug}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchPackages();
      else alert(json.error || 'Delete failed');
    } catch {
      alert('Error deleting package');
    }
  };

  // Dynamic list helpers
  const updateList = (field, index, value) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm({ ...form, [field]: arr });
  };

  const addListItem = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const removeListItem = (field, index) => {
    const arr = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: arr.length ? arr : [''] });
  };

  if (loading) {
    return <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>;
  }

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Paket Tur</h1>
        <button className="admin-btn-add" onClick={openAdd}>
          + Tambah Paket
        </button>
      </div>

      {packages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: 18, marginBottom: 8 }}>Belum ada paket</p>
          <p>Klik "Tambah Paket" untuk membuat paket tur pertama.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.slug}>
                  <td>
                    {pkg.image && (
                      <img src={pkg.image} alt="" className="admin-table-img" />
                    )}
                  </td>
                  <td>
                    <strong>{pkg.name}</strong>
                    <br />
                    <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{pkg.duration}</span>
                  </td>
                  <td>
                    <span className="pkg-card-category">{pkg.category}</span>
                  </td>
                  <td>{pkg.priceLabel}</td>
                  <td>
                    <span className={`admin-badge ${pkg.active ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                      {pkg.active ? 'Active' : 'Inactive'}
                    </span>
                    {pkg.featured && (
                      <span className="admin-badge admin-badge-active" style={{ marginLeft: 4 }}>
                        Featured
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-sm admin-btn-edit" onClick={() => openEdit(pkg)}>
                        Edit
                      </button>
                      <button className="admin-btn-sm admin-btn-delete" onClick={() => handleDelete(pkg.slug, pkg.name)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal" role="dialog" aria-modal="true">
            <h2 className="modal-title">{isEdit ? 'Edit Paket' : 'Tambah Paket'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Paket</label>
                <input
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Harga (IDR)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Durasi</label>
                  <input
                    className="form-input"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g. 1 Day, Half Day"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="nature">Nature</option>
                  <option value="culture">Culture</option>
                  <option value="adventure">Adventure</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gambar</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="form-input"
                  onChange={handleFileChange}
                />
                {previewUrl && (
                  <div className="img-preview-wrap">
                    <img src={previewUrl} alt="Preview" className="img-preview" />
                  </div>
                )}
              </div>

              {/* Itinerary */}
              <div className="form-group">
                <label className="form-label">Itinerary</label>
                <div className="dynamic-list">
                  {form.itinerary.map((item, i) => (
                    <div key={i} className="dynamic-list-item">
                      <input
                        className="form-input"
                        value={item}
                        onChange={(e) => updateList('itinerary', i, e.target.value)}
                        placeholder={`Step ${i + 1}`}
                      />
                      <button type="button" className="dynamic-list-remove" onClick={() => removeListItem('itinerary', i)}>
                        &times;
                      </button>
                    </div>
                  ))}
                  <button type="button" className="dynamic-list-add" onClick={() => addListItem('itinerary')}>
                    + Add step
                  </button>
                </div>
              </div>

              {/* Includes */}
              <div className="form-group">
                <label className="form-label">Includes</label>
                <div className="dynamic-list">
                  {form.includes.map((item, i) => (
                    <div key={i} className="dynamic-list-item">
                      <input
                        className="form-input"
                        value={item}
                        onChange={(e) => updateList('includes', i, e.target.value)}
                        placeholder="Included item"
                      />
                      <button type="button" className="dynamic-list-remove" onClick={() => removeListItem('includes', i)}>
                        &times;
                      </button>
                    </div>
                  ))}
                  <button type="button" className="dynamic-list-add" onClick={() => addListItem('includes')}>
                    + Add item
                  </button>
                </div>
              </div>

              {/* Excludes */}
              <div className="form-group">
                <label className="form-label">Excludes</label>
                <div className="dynamic-list">
                  {form.excludes.map((item, i) => (
                    <div key={i} className="dynamic-list-item">
                      <input
                        className="form-input"
                        value={item}
                        onChange={(e) => updateList('excludes', i, e.target.value)}
                        placeholder="Excluded item"
                      />
                      <button type="button" className="dynamic-list-remove" onClick={() => removeListItem('excludes', i)}>
                        &times;
                      </button>
                    </div>
                  ))}
                  <button type="button" className="dynamic-list-add" onClick={() => addListItem('excludes')}>
                    + Add item
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="form-row" style={{ marginBottom: 0 }}>
                <div className="form-group">
                  <div className="toggle-wrap">
                    <button
                      type="button"
                      className={`toggle${form.featured ? ' on' : ''}`}
                      onClick={() => setForm({ ...form, featured: !form.featured })}
                      role="switch"
                      aria-checked={form.featured}
                    />
                    <span className="toggle-label">Featured</span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="toggle-wrap">
                    <button
                      type="button"
                      className={`toggle${form.active ? ' on' : ''}`}
                      onClick={() => setForm({ ...form, active: !form.active })}
                      role="switch"
                      aria-checked={form.active}
                    />
                    <span className="toggle-label">Active</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="form-btn form-btn-cancel" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="form-btn form-btn-primary" disabled={submitting}>
                  {submitting ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
