import { useState, useEffect } from 'react';
import { getDestinations, saveDestinations, generateId } from '../utils/localStorage';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load destinations from localStorage on mount
  useEffect(() => {
    const loadDestinations = () => {
      const saved = getDestinations();
      setDestinations(saved);
      setLoading(false);
    };

    loadDestinations();
  }, []);

  // Save to localStorage whenever destinations change
  useEffect(() => {
    if (!loading) {
      saveDestinations(destinations);
    }
  }, [destinations, loading]);

  /**
   * Add a new destination
   * @param {Object} destination - Destination object without ID
   */
  const addDestination = (destination) => {
    const newDestination = {
      ...destination,
      id: generateId(),
      createdAt: Date.now()
    };
    setDestinations(prev => [...prev, newDestination]);
  };

  /**
   * Update an existing destination
   * @param {string} id - Destination ID
   * @param {Object} updates - Fields to update
   */
  const updateDestination = (id, updates) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === id ? { ...dest, ...updates } : dest
      )
    );
  };

  /**
   * Remove a destination
   * @param {string} id - Destination ID
   */
  const removeDestination = (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      setDestinations(prev => prev.filter(dest => dest.id !== id));
    }
  };

  /**
   * Get a single destination by ID
   * @param {string} id - Destination ID
   * @returns {Object|undefined} Destination object
   */
  const getDestinationById = (id) => {
    return destinations.find(dest => dest.id === id);
  };

  return {
    destinations,
    loading,
    addDestination,
    updateDestination,
    removeDestination,
    getDestinationById
  };
};

export default useDestinations;
