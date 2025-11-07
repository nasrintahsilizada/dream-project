import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDestinations from '../hooks/useDestinations';
import AddDestinationForm from '../components/AddDestinationForm';

const AddDestination = () => {
  const navigate = useNavigate();
  const { addDestination } = useDestinations();

  const handleSave = (destinationData) => {
    addDestination(destinationData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>✈️ Add New Destination</h1>
        <p>Add a new travel destination to your bucket list</p>
      </header>
      <div className="action-buttons">
        <button onClick={() => navigate('/')} className="btn-secondary">
          ← Back to Home
        </button>
      </div>

      <div className="form-container">
        <AddDestinationForm
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddDestination;
