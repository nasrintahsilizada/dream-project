import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddDestination from './pages/AddDestination';
import EditDestination from './pages/EditDestination';
import SearchDestinations from './pages/SearchDestinations';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="content-wrapper">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddDestination />} />
            <Route path="/edit/:id" element={<EditDestination />} />
            <Route path="/search" element={<SearchDestinations />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
