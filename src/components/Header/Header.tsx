import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/Images/logo.png'; 
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 9, 25, 0.90);
  padding: 16px 32px; 
  box-sizing: border-box; 
  position: relative;  
  z-index: 1; 

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const LogoWrapper = styled.div`
  width: 128px;
  height: auto;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const Menu = styled.ul`
  display: none;
  gap: 16px;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  list-style: none;

  @media(min-width: 1024px) {
    display: flex;
    gap: 56px;
  }
`;

const MenuItem = styled.li<{ selected: boolean, hovered: boolean }>`
  cursor: pointer;
  color: ${({ selected, hovered }) => (selected || hovered ? 'white' : '#FD841F')};
  border-bottom: ${({ selected, hovered }) => (selected || hovered ? '1px solid white' : 'none')};
  padding-bottom: 4px;
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &:active {
    transform: scale(0.95); 
  }
`;

const HamburgerMenu = styled(GiHamburgerMenu)`
  color: white;
  display: none;

  @media(max-width: 1023px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(6, 9, 25, 1);
  padding: 16px;
  z-index: 1000;

  @media(min-width: 1024px) {
    display: none;
  }
`;

const MobileMenuItem = styled.li`
  color: #FD841F;
  cursor: pointer;
  padding: 12px 0;
  border-bottom: 1px solid rgba(253, 132, 31, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  
  @media(min-width: 768px) {
    gap: 16px;
  }

  @media(max-width: 1023px) {
    display: none;
  }
`;

const Button = styled.button<{ variant: 'outlined' | 'filled' }>`
  cursor: pointer;
  padding: 8px 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border-radius: 8px;
  border: ${({ variant }) => (variant === 'outlined' ? '1px solid #FD841F' : 'none')};
  background-color: ${({ variant }) => (variant === 'outlined' ? 'transparent' : '#FD841F')};
  color: ${({ variant }) => (variant === 'outlined' ? '#FD841F' : 'white')};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ variant }) => (variant === 'outlined' ? 'white' : 'white')}; 
    color: ${({ variant }) => (variant === 'outlined' ? '#FD841F' : '#FD841F')}; 
    border: ${({ variant }) => (variant === 'outlined' ? '2px solid #FD841F' : '2px solid #FD841F')}; 
  }

  &:active {
    transform: scale(0.95); 
  }
`;

function Header() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsMenuOpen(false);
  };  

  return (
    <HeaderContainer>
      <LogoWrapper>
        <Image src={logo} alt="Logo" layout="responsive" width={128} height={128} />
      </LogoWrapper>

      <Menu>
        {['Home', 'Elementary School', 'High School', 'Events', 'Contact'].map((item, index) => (
          <MenuItem
            key={index}
            selected={selectedIndex === index}
            hovered={hoverIndex === index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => handleSelect(index)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>

      <HamburgerMenu size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />

      <MobileMenu isOpen={isMenuOpen}>
        <ul>
          {['Home', 'Elementary School', 'High School', 'Events', 'Contact'].map((item, index) => (
            <MobileMenuItem
              key={index}
              onClick={() => handleSelect(index)}
            >
              {item}
            </MobileMenuItem>
          ))}
        </ul>
      </MobileMenu>

      <ButtonContainer>
        <Button variant="outlined">Login</Button>
        <Button variant="filled">Sign Up</Button>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
