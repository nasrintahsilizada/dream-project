import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useDestinations from '../hooks/useDestinations';
import DestinationGrid from '../components/DestinationGrid';
import FiltersBar from '../components/FiltersBar';

const SearchDestinations = () => {
  const navigate = useNavigate();
  const { destinations, loading, removeDestination } = useDestinations();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let filtered = [...destinations];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(query) ||
        dest.notes?.toLowerCase().includes(query) ||
        dest.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category !== 'All') {
      filtered = filtered.filter(dest => dest.category === category);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-asc':
          return a.rating - b.rating;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'date-asc':
          return a.createdAt - b.createdAt;
        case 'date-desc':
          return b.createdAt - a.createdAt;
        default:
          return 0;
      }
    });

    return filtered;
  }, [destinations, searchQuery, category, sortBy]);

  const handleEdit = (destination) => {
    navigate(`/edit/${destination.id}`);
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
    <div className="page-container">
      <header className="page-header">
        <h1>🔍 Search Destinations</h1>
        <p>Filter and search your travel bucket list</p>
      </header>
      <div className="action-buttons">
        <button onClick={() => navigate('/')} className="btn-secondary">
          ← Back to Home
        </button>
      </div>

      {/* Filters */}
      {destinations.length > 0 && (
        <FiltersBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          category={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {/* Results count */}
      {destinations.length > 0 && (
        <div className="results-info">
          Showing {filteredDestinations.length} of {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Destination Grid */}
      <DestinationGrid
        destinations={filteredDestinations}
        onEdit={handleEdit}
        onDelete={removeDestination}
      />

      {filteredDestinations.length === 0 && destinations.length > 0 && (
        <div className="no-results">
          <p>No destinations match your search criteria.</p>
          <button onClick={() => {
            setSearchQuery('');
            setCategory('All');
          }} className="btn-secondary">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDestinations;
