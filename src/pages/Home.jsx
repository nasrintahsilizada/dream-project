import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDestinations from '../hooks/useDestinations';
import DestinationGrid from '../components/DestinationGrid';

const Home = () => {
  const navigate = useNavigate();
  const {
    destinations,
    loading,
    removeDestination
  } = useDestinations();

  const handleEdit = (destination) => {
    navigate(`/edit/${destination.id}`);
  };

  const handleAddNew = () => {
    navigate('/add');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dream destinations...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>✈️ Dream Destinations Planner</h1>
        <p>Plan and organize your travel bucket list with AI-powered insights</p>
      </header>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={handleAddNew} className="btn-add-new">
          ➕ Add New Destination
        </button>
        <button onClick={handleSearch} className="btn-search">
          🔍 Search & Filter
        </button>
      </div>

      {/* Results count */}
      {destinations.length > 0 && (
        <div className="results-info">
          Showing {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Destination Grid */}
      <DestinationGrid
        destinations={destinations}
        onEdit={handleEdit}
        onDelete={removeDestination}
      />

      {destinations.length === 0 && (
        <div className="empty-state">
          <h2>🌍 Start Your Travel Journey</h2>
          <p>You haven't added any destinations yet.</p>
          <button onClick={handleAddNew} className="btn-primary">
            Add Your First Destination
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
