import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Poster } from '../types/poster';
import { posterService } from '../services/database';

interface PosterContextType {
  posters: Poster[];
  featuredPosters: Poster[];
  loading: boolean;
  error: string | null;
  fetchPosters: (filters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => Promise<void>;
  fetchPoster: (id: string) => Promise<Poster | null>;
  createPoster: (poster: Omit<Poster, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updatePoster: (id: string, poster: Partial<Poster>) => Promise<void>;
  deletePoster: (id: string) => Promise<void>;
  searchPosters: (searchTerm: string) => Promise<Poster[]>;
}

const PosterContext = createContext<PosterContextType | undefined>(undefined);

export const PosterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [featuredPosters, setFeaturedPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const fetchPosters = useCallback(async (filters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => {
    if (loading) return; // Prevent concurrent fetches
    
    try {
      setLoading(true);
      setError(null);
      const fetchedPosters = await posterService.getAll(filters);
      setPosters(fetchedPosters);
    } catch (err) {
      console.error('Error in fetchPosters:', err);
      setError('Failed to fetch posters');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const fetchFeaturedPosters = useCallback(async () => {
    try {
      const featured = await posterService.getAll({ featured: true, limit: 4 });
      setFeaturedPosters(featured);
    } catch (err) {
      console.error('Failed to fetch featured posters:', err);
    }
  }, []);

  const fetchPoster = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const poster = await posterService.getById(id);
      return poster;
    } catch (err) {
      setError('Failed to fetch poster');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPoster = useCallback(async (poster: Omit<Poster, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const id = await posterService.create(poster);
      await fetchPosters(); // Refresh the list
      return id;
    } catch (err) {
      setError('Failed to create poster');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPosters]);

  const updatePoster = useCallback(async (id: string, poster: Partial<Poster>) => {
    try {
      setLoading(true);
      setError(null);
      await posterService.update(id, poster);
      await fetchPosters(); // Refresh the list
    } catch (err) {
      setError('Failed to update poster');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPosters]);

  const deletePoster = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await posterService.delete(id);
      await fetchPosters(); // Refresh the list
    } catch (err) {
      setError('Failed to delete poster');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPosters]);

  const searchPosters = useCallback(async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await posterService.search(searchTerm);
      return results;
    } catch (err) {
      setError('Failed to search posters');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      fetchPosters();
      fetchFeaturedPosters();
    }
  }, [initialized, fetchPosters, fetchFeaturedPosters]);

  const value = React.useMemo(() => ({
    posters,
    featuredPosters,
    loading,
    error,
    fetchPosters,
    fetchPoster,
    createPoster,
    updatePoster,
    deletePoster,
    searchPosters,
  }), [
    posters,
    featuredPosters,
    loading,
    error,
    fetchPosters,
    fetchPoster,
    createPoster,
    updatePoster,
    deletePoster,
    searchPosters,
  ]);

  return (
    <PosterContext.Provider value={value}>
      {children}
    </PosterContext.Provider>
  );
};

export const usePosters = () => {
  const context = useContext(PosterContext);
  if (context === undefined) {
    throw new Error('usePosters must be used within a PosterProvider');
  }
  return context;
}; 