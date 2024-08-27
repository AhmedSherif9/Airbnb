import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBar, setSearchBar] = useState(false);

  const close = () => {
    setSearchTerm("");
    setSearchBar(false);
  };

  const value = { searchTerm, setSearchTerm, searchBar, setSearchBar, close };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
