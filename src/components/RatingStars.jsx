import React from 'react';

/**
 * RatingStars component - Display and edit star ratings
 * @param {number} rating - Current rating (1-5)
 * @param {function} onRatingChange - Callback for rating changes
 * @param {boolean} readOnly - If true, stars are not clickable
 */
const RatingStars = ({ rating = 0, onRatingChange, readOnly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (value) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleKeyDown = (e, value) => {
    if (!readOnly && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick(value);
    }
  };

  return (
    <div className="rating-stars" role="radiogroup" aria-label="Rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : 'empty'} ${!readOnly ? 'interactive' : ''}`}
          onClick={() => handleClick(star)}
          onKeyDown={(e) => handleKeyDown(e, star)}
          role={readOnly ? 'img' : 'radio'}
          aria-checked={!readOnly ? star === rating : undefined}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          tabIndex={readOnly ? -1 : 0}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
