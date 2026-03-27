import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AddCaterer() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerPlate: '',
    cuisines: '',
    rating: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    const price = parseFloat(formData.pricePerPlate);
    if (isNaN(price) || price <= 0) newErrors.pricePerPlate = 'Price must be a positive number';
    if (!formData.cuisines.trim()) newErrors.cuisines = 'At least one cuisine is required';
    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        pricePerPlate: parseFloat(formData.pricePerPlate),
        cuisines: formData.cuisines.split(',').map(c => c.trim()).filter(c => c),
        rating: parseFloat(formData.rating)
      };

      const res = await fetch('http://localhost:5000/api/caterers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.errors?.join(', ') || 'Failed to add caterer');
      }

      // Redirect to the caterers page after success
      router.push('/caterers');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add New Caterer | CaterFind</title>
      </Head>
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🍲</span>
          <span className="logo-text">Cater<span>Find</span></span>
        </div>
        <p className="tagline">Add a new caterer to the list</p>
      </header>

      <div className="form-container">
        <div className="form-card">
          <h2>Add New Caterer</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Delicious Bites"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
              />
              {errors.location && <span className="error-text">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="pricePerPlate">Price per Plate ($) *</label>
              <input
                type="number"
                id="pricePerPlate"
                name="pricePerPlate"
                value={formData.pricePerPlate}
                onChange={handleChange}
                placeholder="e.g., 25"
                step="0.01"
                min="0"
              />
              {errors.pricePerPlate && <span className="error-text">{errors.pricePerPlate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cuisines">Cuisines * (comma-separated)</label>
              <input
                type="text"
                id="cuisines"
                name="cuisines"
                value={formData.cuisines}
                onChange={handleChange}
                placeholder="e.g., Italian, American"
              />
              {errors.cuisines && <span className="error-text">{errors.cuisines}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating * (0–5)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="e.g., 4.5"
                step="0.1"
                min="0"
                max="5"
              />
              {errors.rating && <span className="error-text">{errors.rating}</span>}
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => router.push('/caterers')} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="submit-btn">
                {submitting ? 'Adding...' : 'Add Caterer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}