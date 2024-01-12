import React, { useState } from 'react';

const PricingUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://localhost:7186/api/pricing/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploadedRecords = await response.json();
        onUpload(uploadedRecords);
      } else {
        console.error('Failed to upload pricing records');
      }
    } catch (error) {
      console.error('Error uploading pricing records:', error);
    }
  };

  return (
    <div>
      <h2>Upload Pricing Records</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PricingUpload;
