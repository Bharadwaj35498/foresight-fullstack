import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const FilterContext = createContext(null);

const EMPTY_FILTERS = {
  end_year: '', topic: '', sector: '', region: '', country: '', pestle: '', source: '', swot: '',
};

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState('');

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => setFilters(EMPTY_FILTERS), []);

  // Params object passed straight into every API call — memoized so charts
  // only refetch when a filter actually changes.
  const params = useMemo(() => {
    const p = {};
    Object.entries(filters).forEach(([k, v]) => { if (v) p[k] = v; });
    if (search) p.search = search;
    return p;
  }, [filters, search]);

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters, search, setSearch, params }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}
