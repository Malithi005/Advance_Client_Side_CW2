import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PropertyCard.css';

function PropertyCard({ property, addToFavourites, isFavourite }) {
  // Handle favourite button click
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Button clicked! Property: ' + property.id);
    console.log('=== BUTTON CLICKED ===');
    console.log('Property ID:', property.id);
    console.log('addToFavourites:', addToFavourites);
    console.log('Property:', property);
    console.log('isFavourite:', isFavourite);
    
    if (addToFavourites) {
      console.log('Calling addToFavourites...');
      addToFavourites(property);
      console.log('addToFavourites called successfully');
    } else {
      console.error('ERROR: addToFavourites is undefined!');
    }
  };

  // Format price with commas
  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  // Truncate description to first 100 characters
  const truncateDescription = (description) => {
    const cleanDesc = description.replace(/<br>/g, ' ');
    return cleanDesc.length > 100 ? cleanDesc.substring(0, 100) + '...' : cleanDesc;
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.picture} alt={property.location} />
        <span className="property-type">{property.type}</span>
      </div>
      
      <div className="property-details">
        <h3 className="property-price">{formatPrice(property.price)}</h3>
        <p className="property-location">{property.location}</p>
        <p className="property-bedrooms">{property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}</p>
        <p className="property-description">{truncateDescription(property.description)}</p>
        
        <div className="property-actions">
          <Link to={`/property/${property.id}`} className="btn-view">
            View Details
          </Link>
          <button 
            className={`btn-favourite ${isFavourite ? 'is-favourite' : ''}`}
            onClick={handleFavouriteClick}
            disabled={isFavourite}
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