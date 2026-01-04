import propertiesData from './data/properties.json';

// Helper function that mirrors your SearchPage logic
const filterProperties = (properties, criteria) => {
  return properties.filter(prop => {
    if (criteria.type && criteria.type !== 'any' && prop.type.toLowerCase() !== criteria.type.toLowerCase()) return false;
    if (criteria.minPrice && prop.price < criteria.minPrice) return false;
    if (criteria.maxPrice && prop.price > criteria.maxPrice) return false;
    if (criteria.minBedrooms && prop.bedrooms < criteria.minBedrooms) return false;
    if (criteria.postcode && !prop.location.toLowerCase().includes(criteria.postcode.toLowerCase())) return false;
    return true;
  });
};

describe('Property Search Filtering Logic', () => {
  const allProps = propertiesData.properties;

  test('Filter 1: Should filter by property type (House)', () => {
    const results = filterProperties(allProps, { type: 'house' });
    expect(results.every(p => p.type === 'House')).toBe(true);
  });

  test('Filter 2: Should filter by minimum price boundary', () => {
    const minPrice = 600000;
    const results = filterProperties(allProps, { minPrice });
    expect(results.every(p => p.price >= minPrice)).toBe(true);
  });

  test('Filter 3: Should filter by bedroom count correctly', () => {
    const minBedrooms = 3;
    const results = filterProperties(allProps, { minBedrooms });
    expect(results.every(p => p.bedrooms >= minBedrooms)).toBe(true);
  });

  test('Filter 4: Should match postcode area correctly', () => {
    const results = filterProperties(allProps, { postcode: 'BR1' });
    expect(results.every(p => p.location.includes('BR1'))).toBe(true);
  });

  test('Filter 5: Should return empty array for impossible price range', () => {
    const results = filterProperties(allProps, { minPrice: 1000000, maxPrice: 100 });
    expect(results.length).toBe(0);
  });
});