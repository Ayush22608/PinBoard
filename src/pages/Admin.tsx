import React from 'react';
import CloudinaryTest from '../components/admin/CloudinaryTest';

const Admin: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Cloudinary Integration Test</h2>
          <CloudinaryTest />
        </div>
        
        {/* Other admin components */}
      </div>
    </div>
  );
};

export default Admin; 