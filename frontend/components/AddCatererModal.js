import { useState } from 'react';

export default function AddCatererModal({ isOpen, onClose, onAdd }) {
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
    // Clear field-specific error when user types
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
      // Prepare payload: cuisines as array, price/rating as numbers
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

      const newCaterer = await res.json();
      onAdd(newCaterer); // pass new caterer up to parent to update list
      onClose(); // close modal
      // Reset form
      setFormData({ name: '', location: '', pricePerPlate: '', cuisines: '', rating: '' });
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Caterer</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
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
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? 'Adding...' : 'Add Caterer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}