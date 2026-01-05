import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavouritesListWithDnD from './FavouritesList';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'; 
import '../styles/SearchPage.css';

/**
 * SearchPage Component
 * The central hub that manages the state of filtered properties and 
 * coordinates the Drag and Drop context for the entire application.
 */
function SearchPage({ properties, favourites, addToFavourites, removeFromFavourites, clearFavourites }) {
  // Stores the list of properties currently visible after filtering
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // DRAG AND DROP SENSORS:
  // PointerSensor with an activationConstraint.
  // This ensures that the user must move the mouse at least 8 pixels before a "drag" starts.
  // This prevents accidental drags when the user just wants to click "View Details".
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, 
    })
  );

  /**
   * handleSearch
   * This function takes the criteria from SearchForm and filters the JSON data.
   */
  const handleSearch = (criteria) => {
    let results = properties;

    // Filter by Property Type (House/Flat)
    if (criteria.type && criteria.type !== 'any') {
      results = results.filter(prop => prop.type.toLowerCase() === criteria.type.toLowerCase());
    }

    // Filter by Price Range
    if (criteria.minPrice) results = results.filter(prop => prop.price >= criteria.minPrice);
    if (criteria.maxPrice) results = results.filter(prop => prop.price <= criteria.maxPrice);

    // Filter by Bedroom Count
    if (criteria.minBedrooms) results = results.filter(prop => prop.bedrooms >= criteria.minBedrooms);
    if (criteria.maxBedrooms) results = results.filter(prop => prop.bedrooms <= criteria.maxBedrooms);

    // POSTCODE SEARCH:
    // This extracts the last part of the location string (the postcode) 
    // and checks if it starts with the user's input for a partial match.
    if (criteria.postcode) {
      const searchStr = criteria.postcode.toLowerCase().trim();
      results = results.filter(prop => {
        const parts = prop.location.split(' ');
        const propPostcode = parts[parts.length - 1].toLowerCase();
        return propPostcode.startsWith(searchStr);
      });
    }

    // DATE FILTERING:
    // Converts the JSON date (day, month, year) into a JavaScript Date object
    // to compare it against the DatePicker selection.
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

    // Update the UI with the filtered results
    setFilteredProperties(results);
  };

  /**
   * HELPER: getMonthNumber
   * Converts English month names from the JSON into 0-indexed numbers for the Date object.
   */
  const getMonthNumber = (monthName) => {
    const months = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
    };
    return months[monthName.toLowerCase()] || 0;
  };

  /**
   * EVENT HANDLER: handleDragEnd
   * Fired when a property card is released. Checks if it was dropped over the sidebar.
   */
  const handleDragEnd = (event) => {
    const { over, active } = event;
    // active.data.current contains the property object passed from PropertyCard
    if (over && over.id === 'favourites-droppable') {
      addToFavourites(active.data.current);
    }
  };

  return (
    /* DndContext must wrap all components involved in the drag and drop process */
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

        {/* The sidebar is the "Droppable" zone */}
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