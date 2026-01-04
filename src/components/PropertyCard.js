import React from 'react';
import { Link } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core'; // Added for Drag and Drop
import '../styles/PropertyCard.css';

function PropertyCard({ property, addToFavourites, isFavourite }) {
  // Setup Draggable functionality
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: property.id,
    data: property, // Pass property data so the Drop handler knows which property was dragged
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
  } : undefined;

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    if (addToFavourites) addToFavourites(property);
  };

  const formatPrice = (price) => '£' + price.toLocaleString();

  const truncateDescription = (description) => {
    const cleanDesc = description.replace(/<br>/g, ' ');
    return cleanDesc.length > 100 ? cleanDesc.substring(0, 100) + '...' : cleanDesc;
  };

  return (
    <div 
      className="property-card" 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
    >
      <div className="property-image">
        {/* We access the first image in the array [0] and ensure it has a leading slash */}
        <img 
          src={property.picture && property.picture.length > 0 
            ? (property.picture[0].startsWith('/') ? property.picture[0] : `/${property.picture[0]}`)
            : 'https://via.placeholder.com/300x200?text=No+Image+Available'
          } 
          alt={property.location} 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'; 
          }}
        />
        <span className="property-type">{property.type}</span>
      </div>
      
      <div className="property-details">
        <h3 className="property-price">{formatPrice(property.price)}</h3>
        <p className="property-location">{property.location}</p>
        <p className="property-bedrooms">
          {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
        </p>
        <p className="property-description">{truncateDescription(property.description)}</p>
        
        <div className="property-actions">
          {/* stopPropagation is vital here so clicking buttons doesn't trigger a Drag event */}
          <Link 
            to={`/property/${property.id}`} 
            className="btn-view" 
            onPointerDown={e => e.stopPropagation()}
          >
            View Details
          </Link>
          <button 
            className={`btn-favourite ${isFavourite ? 'is-favourite' : ''}`}
            onClick={handleFavouriteClick}
            disabled={isFavourite}
            onPointerDown={e => e.stopPropagation()}
            type="button"
          >
            {isFavourite ? '★ Favourited' : '☆ Add to Favourites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;