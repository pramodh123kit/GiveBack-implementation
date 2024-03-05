import React, { useState } from 'react';
import styles from './Filter.module.css'; // Import the CSS module

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
    <div className={styles['filter-system']}> {/* Use styles['class-name'] syntax */}
      <div className={styles['filter-section']}>
        <h3>Categories</h3>
        <div className={styles['filter-options']}>
          <label>
            <input
              type="radio"
              name="filter"
              value=""
              checked={selectedFilter === ''}
              onChange={() => handleFilterChange('')}
            />
            All
          </label>

          <label>
            <input
              type="radio"
              name="filter"
              value="food"
              checked={selectedFilter === 'food'}
              onChange={() => handleFilterChange('food')}
            />
            Food
          </label>

          <label>
            <input
              type="radio"
              name="filter"
              value="clothing"
              checked={selectedFilter === 'clothing'}
              onChange={() => handleFilterChange('clothing')}
            />
            Clothing
          </label>

          <label>
            <input
              type="radio"
              name="filter"
              value="books"
              checked={selectedFilter === 'books'}
              onChange={() => handleFilterChange('books')}
            />
            Books
          </label>

          <label>
            <input
              type="radio"
              name="filter"
              value="furniture"
              checked={selectedFilter === 'furniture'}
              onChange={() => handleFilterChange('furniture')}
            />
            Furniture
          </label>

          <label>
            <input
              type="radio"
              name="filter"
              value="school items"
              checked={selectedFilter === 'school items'}
              onChange={() => handleFilterChange('school items')}
            />
            School Items
          </label>

          <label>
            <input
              type="radio"
              name="filter"
              value="other"
              checked={selectedFilter === 'other'}
              onChange={() => handleFilterChange('other')}
            />
            Other
          </label>

        </div>
      </div>
    </div>
  );
};

export default FilterSystem;
