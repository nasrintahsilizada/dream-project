import React, { useState, useEffect } from 'react';
import RatingStars from './RatingStars';
import { toBase64 } from '../utils/localStorage';
import { getAiTips } from '../utils/openaiClient';

const CATEGORIES = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Antarctica'
];

/**
 * AddDestinationForm - Form for adding/editing destinations
 */
const AddDestinationForm = ({ destination, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    rating: 3,
    category: 'Europe',
    imageBase64: null,
    aiTips: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loadingTips, setLoadingTips] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form if editing existing destination
  useEffect(() => {
    if (destination) {
      setFormData(destination);
      if (destination.imageBase64) {
        setImagePreview(destination.imageBase64);
      }
      if (destination.imageUrl) {
        setImageUrl(destination.imageUrl);
      }
    }
  }, [destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 4MB' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }

      try {
        const base64 = await toBase64(file);
        setFormData(prev => ({ ...prev, imageBase64: base64, imageUrl: '' }));
        setImagePreview(base64);
        setImageUrl(''); // Clear URL when file is uploaded
        setErrors(prev => ({ ...prev, image: null, imageUrl: null }));
      } catch (error) {
        console.error('Error converting image:', error);
        setErrors(prev => ({ ...prev, image: 'Failed to process image' }));
      }
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    
    if (url.trim()) {
      // Clear file upload when URL is entered
      setFormData(prev => ({ ...prev, imageBase64: null, imageUrl: url }));
      setImagePreview(url);
      setErrors(prev => ({ ...prev, imageUrl: null, image: null }));
    } else {
      setImagePreview(formData.imageBase64 || null);
    }
  };

  const handleGetAiTips = async () => {
    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Please enter a destination name first' }));
      return;
    }

    setLoadingTips(true);
    try {
      const tips = await getAiTips(formData.name, 'facts');
      setFormData(prev => ({ ...prev, aiTips: tips }));
    } catch (error) {
      console.error('Error getting AI tips:', error);
      alert('Failed to get AI tips. Please try again.');
    } finally {
      setLoadingTips(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Destination name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  return (
    <form className="destination-form" onSubmit={handleSubmit}>
      <h2>{destination ? 'Edit Destination' : 'Add New Destination'}</h2>

      <div className="form-group">
        <label htmlFor="name">
          Destination Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Paris, Tokyo, Bali"
          aria-required="true"
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="What makes this destination special to you?"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>Rating</label>
        <RatingStars 
          rating={formData.rating} 
          onRatingChange={handleRatingChange}
        />
      </div>

      <div className="form-group">
        <label>Image (optional)</label>
        <div className="image-input-group">
          <div className="input-option">
            <label htmlFor="image" className="sub-label">📁 Upload Image (max 4MB)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>
          
          <div className="input-divider">
            <span>OR</span>
          </div>
          
          <div className="input-option">
            <label htmlFor="imageUrl" className="sub-label">🔗 Enter Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
          </div>
        </div>
        
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <button 
              type="button" 
              className="btn-remove-image"
              onClick={() => {
                setImagePreview(null);
                setImageUrl('');
                setFormData(prev => ({ ...prev, imageBase64: null, imageUrl: '' }));
              }}
            >
              ✕ Remove Image
            </button>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="aiTips">AI Travel Tips</label>
        <button
          type="button"
          onClick={handleGetAiTips}
          disabled={loadingTips || !formData.name.trim()}
          className="btn-secondary"
        >
          {loadingTips ? '⏳ Generating...' : '✨ Get AI Tips'}
        </button>
        <textarea
          id="aiTips"
          name="aiTips"
          value={formData.aiTips}
          onChange={handleChange}
          placeholder="Click the button above to generate AI-powered travel tips"
          rows="6"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {destination ? 'Update' : 'Add'} Destination
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddDestinationForm;
