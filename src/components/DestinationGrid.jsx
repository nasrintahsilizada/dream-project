import React from 'react';
import DestinationCard from './DestinationCard';

const DestinationGrid = ({ destinations, onEdit, onDelete }) => {
  if (destinations.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🌎</div>
        <h2>No destinations yet!</h2>
        <p>Start planning your dream trips by adding your first destination above.</p>
      </div>
    );
  }

  return (
    <div className="destination-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DestinationGrid;
