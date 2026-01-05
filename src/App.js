import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import PropertyDetails from './components/PropertyDetails';
import propertiesData from './data/properties.json';

function App() {
  // State to manage favourites across the app
  const [favourites, setFavourites] = useState(() => {
  const saved = localStorage.getItem('property-favourites');
  return saved ? JSON.parse(saved) : [];
  });

  // Add property to favourites (prevent duplicates)
  const addToFavourites = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  // Remove property from favourites
  const removeFromFavourites = (propertyId) => {
    setFavourites(favourites.filter(fav => fav.id !== propertyId));
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  // This runs every time the "favourites" array changes
  useEffect(() => {
    localStorage.setItem('property-favourites', JSON.stringify(favourites));
  }, [favourites]);

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Estate Agent Property Search</h1>
        </header>
        <Routes>
          <Route 
            path="/" 
            element={
              <SearchPage 
                properties={propertiesData.properties}
                favourites={favourites}
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
                clearFavourites={clearFavourites}
              />
            } 
          />
          <Route 
            path="/property/:id" 
            element={
              <PropertyDetails 
                properties={propertiesData.properties}
                addToFavourites={addToFavourites}
                favourites={favourites}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;