import React, { useState } from 'react';
import illustration_1 from '../../assets/Images/illustration_1.png';
import illustration_2 from '../../assets/Images/illustration_2.png';
import { IoSearchOutline } from 'react-icons/io5';
import styled from 'styled-components';

interface TagItemProps {
  isSelected: boolean;
  isHovered: boolean;
}

const SearchContainer = styled.div`
  display: flex;
  padding: 0 32px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 9, 25, 0.9);
  width: 100%;
    
  position: relative; 
  z-index: 1;

  @media (min-width: 768px) {
    height: 150px;
  }

  @media (min-width: 1024px) {
    height: 200px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 32px;
  }

  @media (min-width: 1024px) {
    gap: 64px;
  }
`;

const Illustration = styled.img`
  width: auto;
  

  
`;

const TitleContainer = styled.div`
  text-align: center;
  max-width: 600px;
`;

const Title = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (min-width: 1024px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 16px;
  line-height: 1.4;
  display: none;    

  @media (min-width: 768px) {
    display: block;
    font-size: 18px;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -24px;

  @media (min-width: 768px) {
    margin: -24px;
  }

`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #FD841F;
  border: 1px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  height: 48px;
  padding: 0 16px;
  gap: 8px; 

  @media (min-width: 768px) {
    height: 54px;
    max-width: 500px;
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
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

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const SearchIcon = styled(IoSearchOutline)`
  color: rgba(255, 255, 255, 0.8);  
  width: 20px;
  height: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: white; 
  }

  @media (min-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;

const TagsList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  gap: 16px;
  margin-top: 48px; 

  @media (min-width: 768px) {
    gap: 24px;
    margin-top: 56px;
  }

  @media (min-width: 1024px) {
    gap: 32px;
    margin-top: 56px;
  }
`;

const TagItem = styled.li<TagItemProps>`
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
  color: ${(props) => (props.isSelected || props.isHovered ? '#FD841F' : '#A7A7A7')};
  border-bottom: ${(props) => (props.isSelected || props.isHovered ? '1px solid #FD841F' : 'none')};
  padding-bottom: 2px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

function Search() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const tags = [
    'News', 'Community', 'Learning', 'Culture',
    'Sports', 'Student Spotlights', 'Career and Future',
    'Technology and Innovation', 'Health and Well-being'
  ];

  return (
    <SearchContainer>
      <HeaderContainer>
        <Illustration src={illustration_1.src} alt="illustration of lines and stars" />
        <TitleContainer>
          <Title>School blog</Title>
          <Subtitle>
            Knowledge and learning at every click: news, lessons, and content to transform your education!
          </Subtitle>
        </TitleContainer>
        <Illustration src={illustration_2.src} alt="illustration of geometric figures" />
      </HeaderContainer>

      <SearchBarContainer>
        <SearchBar>
          <SearchIcon />
          <SearchInput type="text" placeholder="Search" />
        </SearchBar>
      </SearchBarContainer>

      <TagsList>
        {tags.map((tag, index) => (
          <TagItem
            key={index}
            isSelected={selectedIndex === index}
            isHovered={hoverIndex === index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setSelectedIndex(index)}
          >
            {tag}
          </TagItem>
        ))}
      </TagsList>
    </SearchContainer>
  );
}

export default Search;