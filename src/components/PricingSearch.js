import React, { useState } from 'react';

const PricingSearch = ({ pricingRecords }) => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://localhost:7186/api/pricing/search?criteria=${searchCriteria}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        console.error('Failed to retrieve pricing records');
      }
    } catch (error) {
      console.error('Error searching pricing records:', error);
    }
  };

  return (
    <div>
      <h2>Search Pricing Records</h2>
      <input type="text" placeholder="Search..." onChange={(e) => setSearchCriteria(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((record, index) => (
          <li key={index}>
            Store ID: {record.storeId}, SKU: {record.sku}, Product Name: {record.productName}, Price: {record.price}, Date: {record.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingSearch;
