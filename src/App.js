import React, { useState } from 'react';
import PricingUpload from './components/PricingUpload';
import PricingSearch from './components/PricingSearch';

function App() {
  const [pricingRecords, setPricingRecords] = useState([]);

  const handleUpload = async (uploadedRecords) => {
    try {
      
      const response = await fetch('/api/pricing/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadedRecords),
      });

      if (response.ok) {
        const updatedRecords = await response.json();
        setPricingRecords([...pricingRecords, ...updatedRecords]);
      } else {
        console.error('Failed to upload pricing records');
      }
    } catch (error) {
      console.error('Error uploading pricing records:', error);
    }
  };

  return (
    <div>
      <h1>Pricing Management Sample Application By Nawab</h1>
      <PricingUpload onUpload={handleUpload} />
      <PricingSearch pricingRecords={pricingRecords} />
    </div>
  );
}

export default App;
