"use client";

import { createContext, useContext, useState } from "react";

export interface Filters {
  search: string;
  niche: string;
  platform: string;
  country: string;
  followers: number[];
  showShortlistOnly: boolean;
  page: number;
}

const defaultFilters: Filters = {
  search: "",
  niche: "",
  platform: "",
  country: "",
  followers: [0, 1000000],
  showShortlistOnly: false,
  page: 1,
};

const FilterContext = createContext<{
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
} | null>(null);

export function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState(defaultFilters);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error(
      "useFilters must be used within FilterProvider"
    );
  }

  return context;
}