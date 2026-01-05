import React from 'react';
import PropertyCard from './PropertyCard'; // Child component for individual property display
import '../styles/PropertyList.css';

/**
 * PropertyList Component
 * Acts as a container for the search results, handling the grid layout 
 * and empty state messaging.
 */
function PropertyList({ properties, addToFavourites, favourites }) {
  
  /**
   * HELPER FUNCTION: isFavourite
   * Checks if a specific property ID exists within the favourites array.
   * This is passed down to PropertyCard to toggle the button state (Star icon/text).
   */
  const isFavourite = (propertyId) => {
    // .some() returns true as soon as it finds a matching ID
    return favourites.some(fav => fav.id === propertyId);
  };

  return (
    <div className="property-list">
      {/* DYNAMIC HEADING: 
          Shows the total count of properties. Uses ternary logic for correct 
          pluralization ("1 property" vs "2 properties").
      */}
      <h2>
        Search Results ({properties.length} propert{properties.length !== 1 ? 'ies' : 'y'} found)
      </h2>
      
      {/* CONDITIONAL RENDERING: 
          If the filtered array is empty, show a user-friendly message.
          This fulfills the UX requirement for handling "No Results Found".
      */}
      {properties.length === 0 ? (
        <div className="no-results">
          <p>No properties match your search criteria.</p>
          <p>Try adjusting your filters or reset the search.</p>
        </div>
      ) : (
        /* GRID LAYOUT: 
           Maps through the properties array and generates a PropertyCard for each entry.
        */
        <div className="property-grid">
          {properties.map(property => (
            <PropertyCard 
              key={property.id} // Essential for React reconciliation/performance
              property={property}
              addToFavourites={addToFavourites}
              isFavourite={isFavourite(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyList;