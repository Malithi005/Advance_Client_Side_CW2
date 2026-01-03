import React from 'react';
import PropertyCard from './PropertyCard';
import '../styles/PropertyList.css';

function PropertyList({ properties, addToFavourites, favourites }) {
  console.log('PropertyList - addToFavourites:', addToFavourites);
  console.log('PropertyList - favourites:', favourites);
  console.log('PropertyList - properties:', properties);

  // Check if a property is in favourites
  const isFavourite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };

  return (
    <div className="property-list">
      <h2>Search Results ({properties.length} propert{properties.length !== 1 ? 'ies' : 'y'} found)</h2>
      
      {properties.length === 0 ? (
        <div className="no-results">
          <p>No properties match your search criteria.</p>
          <p>Try adjusting your filters or reset the search.</p>
        </div>
      ) : (
        <div className="property-grid">
          {properties.map(property => {
            console.log('Rendering PropertyCard for:', property.id, 'with addToFavourites:', addToFavourites);
            return (
              <PropertyCard 
                key={property.id}
                property={property}
                addToFavourites={addToFavourites}
                isFavourite={isFavourite(property.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PropertyList;