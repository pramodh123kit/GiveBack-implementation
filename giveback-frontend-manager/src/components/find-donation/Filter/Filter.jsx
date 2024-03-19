import React, { useState } from 'react';
import styles from './Filter.module.css';
import styled from 'styled-components';
import filterIcon from '@/assets/filter.png';

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 4px;
  appearance: none; 
  width: 16px;
  height: 16px;
  border: 2px solid #000;
  border-radius: 3px;
  outline: none;
  
  &:checked {
    background-color: green; 
    border: 2px solid green; 
    cursor: pointer;
  }

  &:before {
    content: '\\2713'; 
    font-size: 16px;
    color: white;
    margin-bottom:5px;
    display: block;
    text-align: center;
    line-height: 16px; 
    cursor: pointer;
  }
`;

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

  const filterOptions = [
    { value: '', label: 'All' },
    { value: 'food', label: 'Food' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'school items', label: 'School Items' },
    // { value: 'other', label: 'Other' },
  ];

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSystem}>
        <div className={styles.filterSection}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <img src={filterIcon} alt="Image" style={{ width: '30px', height: '30px', objectFit: 'cover', marginRight: '16px', marginBottom: '20px' }} />
        <p style={{ margin: 0 }}>Filter</p>
        </div>
          <div className={styles.filterOptions}>
            {filterOptions.map((option) => (
              <CheckboxLabel key={option.value}>
                <CheckboxInput
                  type="checkbox"
                  name="filter"
                  value={option.value}
                  checked={selectedFilter === option.value}
                  onChange={() => handleFilterChange(option.value)}
                />
                {option.label}
              </CheckboxLabel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSystem;