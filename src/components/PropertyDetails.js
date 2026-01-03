import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/PropertyDetails.css';

function PropertyDetails({ properties, addToFavourites, favourites }) {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property not found</h2>
        <Link to="/" className="btn-back">Back to Search</Link>
      </div>
    );
  }

  // Check if property is already in favourites
  const isFavourite = favourites.some(fav => fav.id === property.id);

  // Format price
  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  // For now, we'll use placeholder images since we don't have real property images
  // In a real app, you'd have multiple images for each property
  const images = [
    {
      original: property.picture || 'https://via.placeholder.com/800x600?text=Property+Image+1',
      thumbnail: property.picture || 'https://via.placeholder.com/150x100?text=Thumb+1',
    },
    {
      original: 'https://via.placeholder.com/800x600?text=Property+Image+2',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+2',
    },
    {
      original: 'https://via.placeholder.com/800x600?text=Property+Image+3',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+3',
    },
    {
      original: 'https://via.placeholder.com/800x600?text=Property+Image+4',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+4',
    },
    {
      original: 'https://via.placeholder.com/800x600?text=Property+Image+5',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+5',
    },
    {
      original: 'https://via.placeholder.com/800x600?text=Property+Image+6',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+6',
    },
  ];

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(property.location)}`;

  return (
    <div className="property-details">
      <div className="details-header">
        <Link to="/" className="btn-back">← Back to Search</Link>
        <button 
          className={`btn-favourite-large ${isFavourite ? 'is-favourite' : ''}`}
          onClick={() => addToFavourites(property)}
          disabled={isFavourite}
        >
          {isFavourite ? '★ Favourited' : '☆ Add to Favourites'}
        </button>
      </div>

      <div className="property-summary">
        <h1>{formatPrice(property.price)}</h1>
        <p className="property-location-large">{property.location}</p>
        <div className="property-meta">
          <span className="meta-item">{property.type}</span>
          <span className="meta-item">{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
          <span className="meta-item">{property.tenure}</span>
          <span className="meta-item">Added: {property.added.month} {property.added.day}, {property.added.year}</span>
        </div>
      </div>

      <div className="gallery-section">
        <ImageGallery 
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          showNav={true}
          thumbnailPosition="bottom"
        />
      </div>

      <div className="property-tabs">
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <h2>Property Description</h2>
              <div 
                className="description-text"
                dangerouslySetInnerHTML={{ __html: property.description }}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Floor Plan</h2>
              <div className="floorplan-placeholder">
                <img 
                  src="https://via.placeholder.com/800x600?text=Floor+Plan" 
                  alt="Floor plan"
                  className="floorplan-image"
                />
                <p>Floor plan for {property.location}</p>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Location</h2>
              <div className="map-container">
                <div className="map-placeholder">
                  <p>📍 {property.location}</p>
                  <p className="map-note">
                    Note: Google Maps integration requires an API key. 
                    In production, this would show an interactive map of the property location.
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default PropertyDetails;