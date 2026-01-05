import React from 'react';
import { useDroppable } from '@dnd-kit/core'; // Library for Drag and Drop functionality
import { Link } from 'react-router-dom';     // Navigation component for routing
import '../styles/FavouritesList.css';

/* Displays properties saved by the user and functions as a drop zone.*/

function FavouritesList({ favourites, removeFromFavourites, clearFavourites }) {
  
  // Hook to register this component as a valid drop target
  // isOver is a boolean that becomes true when a draggable item is hovering over this div
  const { setNodeRef, isOver } = useDroppable({
    id: 'favourites-droppable',
  });

  // Change appearance to provide user feedback during the drag action
  const style = {
    backgroundColor: isOver ? '#FEC20C' : 'white', // highlight on hover
    border: isOver ? '2px dashed rgb(238, 71, 0)' : '2px solid transparent', // Shows a border when active
    transition: 'all 0.3s ease' // Smooth transition for visual effects
  };

  return (  
    // ref={setNodeRef} connects the physical HTML element to the dnd-kit logic
    <div className="favourites-sidebar" ref={setNodeRef} style={style}>
      
      {/* HEADER: Shows count and provides the Clear All action */}
      <div className="favourites-header">
        <h2>My Favourites ({favourites.length})</h2>
        {/* Only show the Clear All button if there are items to clear */}
        {favourites.length > 0 && (
          <button className="btn-clear-all" onClick={clearFavourites}>
            Clear All
          </button>
        )}
      </div>

      {/* Display instructions if list is empty */}
      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>Drag properties here or click the star to save them.</p>
        </div>
      ) : (
        <div className="favourites-list">
          {/* Loops through each saved property to create a list item */}
          {favourites.map(property => (
            <div key={property.id} className="favourite-item">
              
              {/*Clicking the item takes the user to the specific Property Details page */}
              <Link to={`/property/${property.id}`} className="favourite-link">
                <img 
                  /* Check if picture array exists */
                  /* Prepend process.env.PUBLIC_URL to ensure correct path for GitHub Pages */
                  src={property.picture && property.picture.length > 0 
                    ? process.env.PUBLIC_URL + property.picture[0]
                    : 'https://via.placeholder.com/100?text=No+Img'} 
                  alt={property.type} 
                  className="favourite-thumb"
                  /* If the local image file is missing, show a placeholder */
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Error'; }}
                />
                
                <div className="favourite-info">
                  {/* .toLocaleString() adds commas to prices (e.g., 1,000,000) */}
                  <p className="favourite-price">£{property.price.toLocaleString()}</p>
                  <p className="favourite-location">{property.location}</p>
                </div>
              </Link>
              
              {/* Individual remove button */}
              <button 
                className="btn-remove" 
                onClick={(e) => {
                  e.preventDefault(); // Stop the Link from being triggered when clicking the button
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

// Higher-Order component wrapper
function FavouritesListWithDnD(props) {
  return <FavouritesList {...props} />;
}

export default FavouritesListWithDnD;