import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavouritesListWithDnD from './FavouritesList';
import { DndContext } from '@dnd-kit/core';
import '../styles/SearchPage.css';

function SearchPage({ properties, favourites, addToFavourites, removeFromFavourites, clearFavourites }) {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Handle search - filter properties based on criteria
  const handleSearch = (criteria) => {
    let results = properties;

    // Filter by type
    if (criteria.type && criteria.type !== 'any') {
      results = results.filter(prop => 
        prop.type.toLowerCase() === criteria.type.toLowerCase()
      );
    }

    // Filter by min price
    if (criteria.minPrice) {
      results = results.filter(prop => prop.price >= criteria.minPrice);
    }

    // Filter by max price
    if (criteria.maxPrice) {
      results = results.filter(prop => prop.price <= criteria.maxPrice);
    }

    // Filter by min bedrooms
    if (criteria.minBedrooms) {
      results = results.filter(prop => prop.bedrooms >= criteria.minBedrooms);
    }

    // Filter by max bedrooms
    if (criteria.maxBedrooms) {
      results = results.filter(prop => prop.bedrooms <= criteria.maxBedrooms);
    }

    // Filter by postcode
    if (criteria.postcode) {
      results = results.filter(prop => 
        prop.location.toLowerCase().includes(criteria.postcode.toLowerCase())
      );
    }

    // Filter by date added (after a specific date)
    if (criteria.dateFrom) {
      results = results.filter(prop => {
        const propDate = new Date(prop.added.year, 
          getMonthNumber(prop.added.month), 
          prop.added.day
        );
        return propDate >= criteria.dateFrom;
      });
    }

    // Filter by date range (between two dates)
    if (criteria.dateTo) {
      results = results.filter(prop => {
        const propDate = new Date(prop.added.year, 
          getMonthNumber(prop.added.month), 
          prop.added.day
        );
        return propDate <= criteria.dateTo;
      });
    }

    setFilteredProperties(results);
  };

  // Helper function to convert month name to number
  const getMonthNumber = (monthName) => {
    const months = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
    };
    return months[monthName.toLowerCase()] || 0;
  };

  // Handle property drop on favourites
  const handleDrop = (property) => {
    addToFavourites(property);
  };

  return (
    <DndContext>
      <div className="search-page">
        <div className="main-content">
          <SearchForm onSearch={handleSearch} />
          <PropertyList 
            properties={filteredProperties} 
            addToFavourites={addToFavourites}
            favourites={favourites}
          />
        </div>
        <FavouritesListWithDnD 
          favourites={favourites}
          removeFromFavourites={removeFromFavourites}
          clearFavourites={clearFavourites}
          onDrop={handleDrop}
        />
      </div>
    </DndContext>
  );
}

export default SearchPage;