import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon"></span>
          <span className="brand-text">Dream Destinations</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/search" className={isActive('/search')}>
            <span className="nav-icon">🔍</span>
            <span className="nav-text">Search</span>
          </Link>
          <Link to="/add" className={isActive('/add')}>
            <span className="nav-icon">➕</span>
            <span className="nav-text">Add Destination</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
