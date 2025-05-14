import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    category: string;
    priceRange: [number, number];
    sortBy: string;
  };
  setFilters: (filters: {
    category: string;
    priceRange: [number, number];
    sortBy: string;
  }) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000] as [number, number],
    sortBy: 'newest'
  });

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 