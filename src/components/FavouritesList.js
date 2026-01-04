import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Link } from 'react-router-dom';
import '../styles/FavouritesList.css';

/**
 * FavouritesList Component
 * Handles the display of saved properties and acts as a drop zone for DnD.
 */
function FavouritesList({ favourites, removeFromFavourites, clearFavourites }) {
  // Requirement: Drag and Drop - Setting up the sidebar as a droppable zone
  const { setNodeRef, isOver } = useDroppable({
    id: 'favourites-droppable',
  });

  // Visual feedback when a property is being dragged over the sidebar
  const style = {
    backgroundColor: isOver ? '#e3f2fd' : 'transparent',
    border: isOver ? '2px dashed #2196f3' : '2px dashed #ccc',
    transition: 'all 0.2s ease'
  };

  return (
    <div className="favourites-sidebar" ref={setNodeRef} style={style}>
      <div className="favourites-header">
        <h2>My Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button className="btn-clear-all" onClick={clearFavourites}>
            Clear All
            </button>
          )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>Drag properties here to save them.</p>
        </div>
      ) : (
        <div className="favourites-list">
          {favourites.map(property => (
            <div key={property.id} className="favourite-item">
              {/* Wrapped content in Link for navigation to Property Details */}
              <Link to={`/property/${property.id}`} className="favourite-link">
                <img 
                  /* FIX: Accessing the first image [0] from the picture array */
                  src={property.picture && property.picture.length > 0 
                    ? (property.picture[0].startsWith('/') ? property.picture[0] : `/${property.picture[0]}`) 
                    : 'https://via.placeholder.com/100?text=No+Img'} 
                  alt={property.type} 
                  className="favourite-thumb"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Error'; }}
                />
                <div className="favourite-info">
                  <p className="favourite-price">£{property.price.toLocaleString()}</p>
                  <p className="favourite-location">{property.location}</p>
                </div>
              </Link>
              
              {/* Requirement: Ability to remove individual items */}
              <button 
                className="btn-remove" 
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigating to the details page
                  removeFromFavourites(property.id);
                }}
                aria-label="Remove property"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Wrapper to ensure DnD context is maintained
function FavouritesListWithDnD(props) {
  return <FavouritesList {...props} />;
}

export default FavouritesListWithDnD;