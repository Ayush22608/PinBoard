import React, { useState, useEffect } from 'react';
import { usePosters } from '../contexts/PosterContext';

const BackendTest: React.FC = () => {
  console.log('BackendTest component rendering');
  
  const { 
    posters, 
    loading, 
    error, 
    createPoster, 
    updatePoster, 
    deletePoster,
    fetchPosters 
  } = usePosters();
  
  const [testStatus, setTestStatus] = useState<string>('');

  useEffect(() => {
    console.log('BackendTest mounted');
    console.log('Current posters:', posters);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [posters, loading, error]);

  const runTests = async () => {
    console.log('Starting tests...');
    setTestStatus('Running tests...');
    const results: string[] = [];

    try {
      // Test 1: Create a poster
      console.log('Test 1: Creating poster...');
      const testPoster = {
        title: 'Test Poster',
        description: 'This is a test poster',
        price: 29.99,
        category: 'test',
        imageUrl: 'https://example.com/test.jpg',
        stock: 10,
        featured: false,
        dimensions: { width: 30, height: 40 },
        tags: ['test']
      };

      const posterId = await createPoster(testPoster);
      console.log('Poster created with ID:', posterId);
      results.push('✅ Create poster successful');

      // Test 2: Fetch posters
      console.log('Test 2: Fetching posters...');
      await fetchPosters();
      if (posters.length > 0) {
        console.log('Posters fetched successfully');
        results.push('✅ Fetch posters successful');
      } else {
        console.log('No posters found');
        results.push('❌ Fetch posters failed');
      }

      // Test 3: Update poster
      console.log('Test 3: Updating poster...');
      await updatePoster(posterId, { title: 'Updated Test Poster' });
      console.log('Poster updated successfully');
      results.push('✅ Update poster successful');

      // Test 4: Delete poster
      console.log('Test 4: Deleting poster...');
      await deletePoster(posterId);
      console.log('Poster deleted successfully');
      results.push('✅ Delete poster successful');

      setTestStatus(results.join('\n'));
    } catch (err) {
      console.error('Test failed:', err);
      setTestStatus(`❌ Test failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Backend Test Panel</h1>
      
      <div className="mb-4">
        <button
          onClick={runTests}
          className="bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600 transition-colors"
        >
          Run Tests
        </button>
      </div>

      {loading && <p className="text-neutral-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Test Results:</h2>
        <pre className="bg-neutral-50 p-4 rounded whitespace-pre-wrap">
          {testStatus || 'No tests run yet'}
        </pre>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Current Posters:</h2>
        <div className="space-y-2">
          {posters.map(poster => (
            <div key={poster.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-medium">{poster.title}</h3>
              <p className="text-sm text-neutral-600">ID: {poster.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackendTest; 