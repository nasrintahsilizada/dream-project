import React, { useState } from 'react';
import RatingStars from './RatingStars';

const DestinationCard = ({ destination, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    name,
    notes,
    rating,
    category,
    imageBase64,
    imageUrl,
    aiTips
  } = destination;

  const displayImage = imageBase64 || imageUrl;

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(destination.id);
    }
  };

  return (
    <>
      <div className="destination-card">
        <div className="card-image">
          {displayImage ? (
            <img src={displayImage} alt={name} />
          ) : (
            <div className="image-placeholder">
              <span className="placeholder-icon">🌍</span>
            </div>
          )}
          <span className="category-badge">{category}</span>
        </div>

        <div className="card-content">
          <h3 className="card-title">{name}</h3>
          
          <div className="card-rating">
            <RatingStars rating={rating} readOnly />
          </div>

          {notes && (
            <p className="card-notes">{truncateText(notes, 80)}</p>
          )}

          {aiTips && (
            <div className="card-tips">
              <strong>✨ AI Tips:</strong>
              <p>{truncateText(aiTips, 100)}</p>
            </div>
          )}

          <div className="card-actions">
            <button
              onClick={() => setShowModal(true)}
              className="btn-view"
              aria-label={`View details for ${name}`}
            >
              👁️ View More
            </button>
            <button
              onClick={() => onEdit(destination)}
              className="btn-edit"
              aria-label={`Edit ${name}`}
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn-delete"
              aria-label={`Delete ${name}`}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal for full details */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-body">
              {displayImage && (
                <div className="modal-image">
                  <img src={displayImage} alt={name} />
                </div>
              )}

              <h2>{name}</h2>
              <div className="modal-rating">
                <RatingStars rating={rating} readOnly />
              </div>
              <p className="modal-category">📍 {category}</p>

              {notes && (
                <div className="modal-section">
                  <h3>Notes</h3>
                  <p className="modal-notes">{notes}</p>
                </div>
              )}

              {aiTips && (
                <div className="modal-section">
                  <h3>✨ AI Travel Tips</h3>
                  <pre className="modal-tips">{aiTips}</pre>
                </div>
              )}

              <div className="modal-actions">
                <button onClick={() => onEdit(destination)} className="btn-primary">
                  Edit Destination
                </button>
                <button onClick={() => setShowModal(false)} className="btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationCard;
