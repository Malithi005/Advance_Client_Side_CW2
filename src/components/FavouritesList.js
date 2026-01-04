import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Link } from 'react-router-dom';
import '../styles/FavouritesList.css';

function FavouritesList({ favourites, removeFromFavourites, clearFavourites }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'favourites-droppable',
  });

  const style = {
    backgroundColor: isOver ? '#e3f2fd' : 'transparent',
    transition: 'background-color 0.2s ease'
  };

  return (
    <div className="favourites-sidebar" ref={setNodeRef} style={style}>
      <div className="favourites-header">
        <h2>My Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button className="btn-clear-all" onClick={clearFavourites}>Clear All</button>
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
              <Link to={`/property/${property.id}`} className="favourite-link">
                <img src={property.picture} alt="" />
                <div className="favourite-info">
                  <p className="favourite-price">£{property.price.toLocaleString()}</p>
                  <p className="favourite-location">{property.location}</p>
                </div>
              </Link>
              <button className="btn-remove" onClick={() => removeFromFavourites(property.id)}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Simplified wrapper
function FavouritesListWithDnD(props) {
  return <FavouritesList {...props} />;
}

export default FavouritesListWithDnD;