import React from 'react';
import { Link } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core'; // Core hook for Drag and Drop functionality
import '../styles/PropertyCard.css';

/**
 * PropertyCard Component
 * Displays summary info for a house and enables dragging to the Favourites sidebar.
 */
function PropertyCard({ property, addToFavourites, isFavourite }) {
  
  // DRAG AND DROP SETUP:
  // attributes: Accessibility properties (ARIA)
  // listeners: Event handlers (mouse/touch) that trigger the drag
  // setNodeRef: Connects the dnd-kit logic to the actual DOM element
  // transform: Tracks the X and Y movement of the item during dragging
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: property.id,
    data: property, // Attach property data so the drop zone receives the full object
  });

  // DYNAMIC STYLING: Applies the movement coordinates while the user is dragging
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000, // Ensures the dragged card floats above all other elements
    cursor: 'grabbing'
  } : undefined;

  // EVENT HANDLER: Adds property to favourites and prevents default navigation behavior
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    if (addToFavourites) addToFavourites(property);
  };

  // HELPER: Formats numbers with currency symbols and commas (e.g., £450,000)
  const formatPrice = (price) => '£' + price.toLocaleString();

  // Prevents long descriptions from breaking the card layout
  const truncateDescription = (description) => {
    // Removes <br> tags to keep the preview text clean
    const cleanDesc = description.replace(/<br>/g, ' ');
    return cleanDesc.length > 100 ? cleanDesc.substring(0, 100) + '...' : cleanDesc;
  };

  return (
    <div 
      className="property-card" 
      ref={setNodeRef} // Injects the DnD reference
      style={style} 
      {...listeners}  // Attaches mouse/touch triggers
      {...attributes} // Attaches ARIA labels for accessibility
    >
      {/* CARD TOP: Image and Type Tag */}
      <div className="property-image">
        <img 
          /* Accessing index [0] for the thumbnail. 
             Logic ensures path starts with '/' for correct routing from the public folder.
          */
          src={property.picture && property.picture.length > 0 
            ? process.env.PUBLIC_URL + property.picture[0]
            : 'https://via.placeholder.com/300x200?text=No+Image+Available'
          } 
          alt={property.location} 
          /* FALLBACK: Handles cases where the specific image file is missing */
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'; 
          }}
        />
        <span className="property-type">{property.type}</span>
      </div>
      
      {/* CARD BOTTOM: Information and User Actions */}
      <div className="property-details">
        <h3 className="property-price">{formatPrice(property.price)}</h3>
        <p className="property-location">{property.location}</p>
        <p className="property-bedrooms">
          {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
        </p>
        <p className="property-description">{truncateDescription(property.description)}</p>
        
        <div className="property-actions">
          {/* UX: onPointerDown stopPropagation prevents the Drag logic
              from firing when the user simply wants to click a button or link.
          */}
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