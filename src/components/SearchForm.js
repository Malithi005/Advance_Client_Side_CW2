import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SearchForm.css';

function SearchForm({ onSearch }) {
  const [type, setType] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState(null);
  const [maxBedrooms, setMaxBedrooms] = useState(null);
  const [postcode, setPostcode] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  // Options for React Select dropdowns
  const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' }
  ];

  const bedroomOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5+' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const criteria = {
      type: type?.value,
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      minBedrooms: minBedrooms?.value,
      maxBedrooms: maxBedrooms?.value,
      postcode: postcode,
      dateFrom: dateFrom,
      dateTo: dateTo
    };

    onSearch(criteria);
  };

  const handleReset = () => {
    setType(null);
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms(null);
    setMaxBedrooms(null);
    setPostcode('');
    setDateFrom(null);
    setDateTo(null);
    onSearch({});
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <Select
            id="type"
            value={type}
            onChange={setType}
            options={typeOptions}
            placeholder="Select type..."
            isClearable
          />
        </div>

        <div className="form-group">
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 200000"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 500000"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="minBedrooms">Min Bedrooms</label>
          <Select
            id="minBedrooms"
            value={minBedrooms}
            onChange={setMinBedrooms}
            options={bedroomOptions}
            placeholder="Select..."
            isClearable
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxBedrooms">Max Bedrooms</label>
          <Select
            id="maxBedrooms"
            value={maxBedrooms}
            onChange={setMaxBedrooms}
            options={bedroomOptions}
            placeholder="Select..."
            isClearable
          />
        </div>

        <div className="form-group">
          <label htmlFor="postcode">Postcode Area</label>
          <input
            type="text"
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g. BR1, NW1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateFrom">Added After</label>
          <DatePicker
            id="dateFrom"
            selected={dateFrom}
            onChange={setDateFrom}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date..."
            isClearable
            className="date-picker"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateTo">Added Before</label>
          <DatePicker
            id="dateTo"
            selected={dateTo}
            onChange={setDateTo}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date..."
            isClearable
            className="date-picker"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-search">Search</button>
        <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}

export default SearchForm;