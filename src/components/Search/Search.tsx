import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import styled from 'styled-components';
import api from '../../app/api';

interface SearchProps {
  onCategorySelect: (category: string | null) => void;
  onSearch: (results: any[]) => void;
}

interface TagItemProps {
  $isSelected: boolean;
  $category: string;
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  top: -27px; // Metade da altura do SearchBar
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #FD841F;
  border: 1px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  height: 54px;
  padding: 0 16px;
  gap: 8px; 
`;

const SearchInput = styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 1.2;

  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
  }

  &:focus::placeholder {
    color: transparent;  
  }

  &:focus {
    outline: none; 
  }
`;

const SearchIcon = styled(IoSearchOutline)`
  color: rgba(255, 255, 255, 0.8);  
  width: 24px;
  height: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: white; 
  }
`;

const TagsList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  gap: 16px;
`;

const TagItem = styled.li<TagItemProps>`
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.$isSelected ? 'white' : '#A7A7A7')};
  background-color: ${(props) => props.$isSelected ? props.$category : 'transparent'};
  border: 1px solid ${(props) => props.$isSelected ? props.$category : '#A7A7A7'};

  &:hover {
    color: white;
    background-color: ${(props) => props.$category};
    border-color: ${(props) => props.$category};
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const LoadingMessage = styled.div`
  color: #666;
  text-align: center;
  margin-top: 10px;
`;

const categoryColors: { [key: string]: string } = {
  'News': '#4A148C',
  'Community': '#8B0000',
  'Learning': '#34495E',
  'Culture': '#A52A2A',
  'Sports': '#216953',
  'Student Spotlights': '#AE650C',
  'Career and Future': '#C2185B',
  'Technology and Innovation': '#1C78D2',
  'Health and Well-being': '#58830A'
};

function Search({ onCategorySelect, onSearch }: SearchProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tags = [
    'News', 'Community', 'Learning', 'Culture',
    'Sports', 'Student Spotlights', 'Career and Future',
    'Technology and Innovation', 'Health and Well-being'
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        performSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  const performSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/search', {
        params: { 
          term: searchTerm,
          category: selectedCategory 
        }
      });
      onSearch(response.data);
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      console.error('Error performing search:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchBarContainer>
        <SearchBar>
          <SearchIcon />
          <SearchInput 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </SearchBar>
      </SearchBarContainer>

      <TagsList>
        {tags.map((tag) => (
          <TagItem
            key={tag}
            $isSelected={selectedCategory === tag}
            $category={categoryColors[tag]}
            onClick={() => handleCategorySelect(tag)}
          >
            {tag}
          </TagItem>
        ))}
      </TagsList>

      {isLoading && <LoadingMessage>Searching...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SearchContainer>
  );
}

export default Search;