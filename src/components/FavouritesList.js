import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { Link } from 'react-router-dom';
import '../styles/FavouritesList.css';

function FavouritesList({ favourites, removeFromFavourites, clearFavourites }) {
  const { setNodeRef } = useDroppable({
    id: 'favourites-droppable',
  });

  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  return (
    <div className="favourites-sidebar" ref={setNodeRef}>
      <div className="favourites-header">
        <h2>My Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button 
            className="btn-clear-all" 
            onClick={clearFavourites}
          >
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>No favourites yet.</p>
          <p>Drag properties here or click the favourite button to add them.</p>
        </div>
      ) : (
        <div className="favourites-list">
          {favourites.map(property => (
            <div key={property.id} className="favourite-item">
              <Link to={`/property/${property.id}`} className="favourite-link">
                <img src={property.picture} alt={property.location} />
                <div className="favourite-info">
                  <p className="favourite-price">{formatPrice(property.price)}</p>
                  <p className="favourite-location">{property.location}</p>
                  <p className="favourite-beds">{property.bedrooms} bed</p>
                </div>
              </Link>
              <button 
                className="btn-remove"
                onClick={() => removeFromFavourites(property.id)}
                title="Remove from favourites"
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

// Wrapper component to handle drag and drop
function FavouritesListWithDnD({ favourites, removeFromFavourites, clearFavourites, onDrop }) {
  const handleDragEnd = (event) => {
    const { over, active } = event;
    
    if (over && over.id === 'favourites-droppable') {
      // Property was dropped on favourites
      onDrop(active.data.current);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <FavouritesList 
        favourites={favourites}
        removeFromFavourites={removeFromFavourites}
        clearFavourites={clearFavourites}
      />
    </DndContext>
  );
}

export default FavouritesListWithDnD;