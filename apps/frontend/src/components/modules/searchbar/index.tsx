import { useState } from 'react';

interface SearchBarProps {
  filterMenus: (searchTerm: string) => void;
}

const SearchBar = ({ filterMenus }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterMenus(e.target.value);
  };

  return (
    <input
      type="search"
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;