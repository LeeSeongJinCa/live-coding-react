import { useState } from 'react';

interface SearchBarProps {
  onSearch: (search: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState<string>('');

  return (
    <input
      id="search-input"
      type="text"
      placeholder="Name"
      value={search}
      onChange={(event) => {
        setSearch(event.currentTarget.value);
        onSearch(event.currentTarget.value);
      }}
    />
  );
};
