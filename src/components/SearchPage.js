import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavouritesListWithDnD from './FavouritesList';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'; // Added sensors
import '../styles/SearchPage.css';

function SearchPage({ properties, favourites, addToFavourites, removeFromFavourites, clearFavourites }) {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Added sensors to ensure links/buttons inside cards still work
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, 
    })
  );

  const handleSearch = (criteria) => {
    let results = properties;

    if (criteria.type && criteria.type !== 'any') {
      results = results.filter(prop => prop.type.toLowerCase() === criteria.type.toLowerCase());
    }
    if (criteria.minPrice) results = results.filter(prop => prop.price >= criteria.minPrice);
    if (criteria.maxPrice) results = results.filter(prop => prop.price <= criteria.maxPrice);
    if (criteria.minBedrooms) results = results.filter(prop => prop.bedrooms >= criteria.minBedrooms);
    if (criteria.maxBedrooms) results = results.filter(prop => prop.bedrooms <= criteria.maxBedrooms);

    // Refined Postcode match (e.g. "BR1" matches properties in BR1 but not BR15)
    if (criteria.postcode) {
      const searchStr = criteria.postcode.toLowerCase().trim();
      results = results.filter(prop => {
        const parts = prop.location.split(' ');
        const propPostcode = parts[parts.length - 1].toLowerCase();
        return propPostcode.startsWith(searchStr);
      });
    }

    if (criteria.dateFrom) {
      results = results.filter(prop => {
        const propDate = new Date(prop.added.year, getMonthNumber(prop.added.month), prop.added.day);
        return propDate >= new Date(criteria.dateFrom).setHours(0,0,0,0);
      });
    }
    if (criteria.dateTo) {
      results = results.filter(prop => {
        const propDate = new Date(prop.added.year, getMonthNumber(prop.added.month), prop.added.day);
        return propDate <= new Date(criteria.dateTo).setHours(23,59,59,999);
      });
    }

    setFilteredProperties(results);
  };

  const getMonthNumber = (monthName) => {
    const months = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
    };
    return months[monthName.toLowerCase()] || 0;
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && over.id === 'favourites-droppable') {
      addToFavourites(active.data.current);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
        />
      </div>
    </DndContext>
  );
}

export default SearchPage;