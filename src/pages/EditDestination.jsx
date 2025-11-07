import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDestinations from '../hooks/useDestinations';
import AddDestinationForm from '../components/AddDestinationForm';

const EditDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations, updateDestination, loading } = useDestinations();
  const [destination, setDestination] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!loading) {
      const found = destinations.find(dest => dest.id === id);
      if (found) {
        setDestination(found);
      } else {
        setNotFound(true);
      }
    }
  }, [id, destinations, loading]);

  useEffect(() => {
    if (notFound) {
      // Redirect to home if destination is not found
      navigate('/', { replace: true });
    }
  }, [notFound, navigate]);

  const handleSave = (destinationData) => {
    updateDestination(id, destinationData);
    navigate('/', { replace: true });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading destination details...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading destination...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>✏️ Edit Destination</h1>
        <p>Update your travel destination details</p>
      </header>

      <div className="form-container">
        <AddDestinationForm
          destination={destination}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default EditDestination;
