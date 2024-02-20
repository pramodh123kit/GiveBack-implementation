import React, { useState } from 'react';
import './Filter.css';


const FilterSystem = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilter(filter);
  };

  return (
    <div className="filter-system">
      <div className="filter-section">
        <h3>Filter</h3>
        <ul className="filter-options">
          <li className={selectedFilter === '' ? 'active' : ''} onClick={() => handleFilterChange('')}>All</li>
          <li className={selectedFilter === 'food' ? 'active' : ''} onClick={() => handleFilterChange('food')}>Food</li>
          <li className={selectedFilter === 'clothing' ? 'active' : ''} onClick={() => handleFilterChange('clothing')}>Clothing</li>
          <li className={selectedFilter === 'school items' ? 'active' : ''} onClick={() => handleFilterChange('school items')}>School Items</li>
        </ul>
      </div>
      <div className="search-bar-section">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default FilterSystem;
