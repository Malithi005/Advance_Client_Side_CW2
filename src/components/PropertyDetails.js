import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageGallery from 'react-image-gallery';

// Import required styles
import 'react-tabs/style/react-tabs.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/PropertyDetails.css';

function PropertyDetails({ properties, addToFavourites, favourites }) {
  const { id } = useParams();
  
  // Find the specific property based on the URL ID
  const property = properties.find(p => p.id === id);

  // Error handling if property doesn't exist
  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property not found</h2>
        <Link to="/" className="btn-back">Back to Search</Link>
      </div>
    );
  }

  // Check if property is already in favourites for the button state
  const isFavourite = favourites.some(fav => fav.id === property.id);

  // Format price helper
  const formatPrice = (price) => '£' + price.toLocaleString();

  /**
   * DATA ENHANCEMENT:
   * Maps the "picture" array from JSON to the gallery format.
   * Ensuring paths start with a leading slash for routing consistency.
   */
  const galleryImages = property.picture ? property.picture.map(img => ({
    original: process.env.PUBLIC_URL + img,
    thumbnail: process.env.PUBLIC_URL + img,
  })) : [];

  return (
    <div className="property-details-container">
      {/* Navigation Header */}
      <div className="details-header">
        <Link to="/" className="btn-back">← Back to Results</Link>
        <button 
          className={`btn-favourite-large ${isFavourite ? 'is-favourite' : ''}`}
          onClick={() => addToFavourites(property)}
          disabled={isFavourite}
        >
          {isFavourite ? '★ In Favourites' : '☆ Add to Favourites'}
        </button>
      </div>

      <div className="details-layout">
        {/* Left Side: Image Gallery */}
        <section className="gallery-section">
          <ImageGallery 
            items={galleryImages} 
            showPlayButton={false} 
            showFullscreenButton={true}
            thumbnailPosition="bottom"
            useBrowserFullscreen={false}
          />
        </section>

        {/* Right Side: Key Info Summary */}
        <section className="info-summary">
          <h1 className="details-price">{formatPrice(property.price)}</h1>
          <p className="details-location">{property.location}</p>
          
          <div className="details-specs">
            <div className="spec-item">
              <strong>Type:</strong> {property.type}
            </div>
            <div className="spec-item">
              <strong>Bedrooms:</strong> {property.bedrooms}
            </div>
            <div className="spec-item">
              <strong>Tenure:</strong> {property.tenure}
            </div>
            <div className="spec-item">
              <strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Section: Tabs */}
      <div className="details-tabs-section">
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Location Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <h3>About this property</h3>
              <div 
                className="description-text"
                dangerouslySetInnerHTML={{ __html: property.description }}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h3>Floor Plan</h3>
              <div className="floorplan-container">
                {/* DYNAMIC: Uses the property ID to find the unique floorplan.jpg */}
                <img 
                  src={process.env.PUBLIC_URL + `/images/${property.id}/floorplan.jpg`} 
                  alt="Property Floor Plan" 
                  className="floorplan-img"
                  onError={(e) => { 
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x500?text=Floor+Plan+Not+Found'; 
                  }}
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h3>Map Location</h3>
              <div className="map-container">
                {/* DYNAMIC: Uses the property ID to find the unique map.jpg screenshot */}
                <img 
                  src={process.env.PUBLIC_URL + `/images/${property.id}/map.jpg`} 
                  alt={`Map of ${property.location}`} 
                  className="location-map-img"
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
                  onError={(e) => { 
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x450?text=Map+Location+Not+Found'; 
                  }}
                />
                <p style={{ marginTop: '10px', textAlign: 'center' }}>📍 {property.location}</p>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default PropertyDetails;