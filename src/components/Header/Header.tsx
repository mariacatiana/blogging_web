import React, { useState } from 'react';
import styled from 'styled-components';
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../../assets/Images/logo.png';
import Link, { LinkProps } from 'next/link';

type MenuItemType = {
  label: string;
  href: string;
};

type ButtonVariant = 'outlined' | 'filled';

const MENU_ITEMS: MenuItemType[] = [
  { label: 'Home', href: '/' },
  { label: 'Elementary School', href: '/elementary' },
  { label: 'High School', href: '/high-school' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];

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
  height: 64px; // Ajuste conforme a proporção real do seu logo
  position: relative;

  @media (max-width: 768px) {
    width: 100px;
    height: 50px; // Ajuste conforme a proporção real do seu logo
  }
`;

const Menu = styled.ul`
  display: none;
  gap: 56px;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  list-style: none;

  @media(min-width: 1024px) {
    display: flex;
  }
`;

const MenuItem = styled(Link)<LinkProps & { $active?: boolean }>`
  cursor: pointer;
  color: ${({ $active }) => ($active ? 'white' : '#FD841F')};
  border-bottom: ${({ $active }) => ($active ? '1px solid white' : 'none')};
  padding-bottom: 4px;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  text-decoration: none;

  &:hover, &:active {
    color: white;
    border-bottom: 1px solid white;
  }
`;

const HamburgerIcon = styled(GiHamburgerMenu)`
  color: white;
  display: none;
  cursor: pointer;

  @media(max-width: 1023px) {
    display: block;
  }
`;

const MobileMenu = styled.ul<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(6, 9, 25, 1);
  padding: 16px;
  list-style: none;
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
  text-decoration:none;

  &:last-child {
    border-bottom: none;
  }
`;

const ButtonContainer = styled.div`
  display: none;
  gap: 16px;

  @media(min-width: 1024px) {
    display: flex;
  }
`;

const Button = styled.a<{ $variant: ButtonVariant; href?: string }>`
  cursor: pointer;
  padding: 8px 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border-radius: 8px;
  border: 2px solid #FD841F;
  background-color: ${({ $variant }) => ($variant === 'filled' ? '#FD841F' : 'transparent')};
  color: ${({ $variant }) => ($variant === 'filled' ? 'white' : '#FD841F')};
  transition: all 0.3s ease;
  text-decoration: none;
  

  &:hover {
    background-color: white;
    color: #FD841F;
  }
`;

const Header: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <LogoWrapper>
        <Image
          src={logo}
          alt="Logo"
          fill
          sizes="(max-width: 768px) 100px, 128px"
          style={{ objectFit: "contain" }}
          priority
        />
      </LogoWrapper>

      <Menu>
        {MENU_ITEMS.map((item,index) => (
          <MenuItem
            key={item.href}
            href={item.href}
            $active={activeIndex === index}
            onClick={() => handleSelect(index)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      <HamburgerIcon size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />

      <MobileMenu $isOpen={isMenuOpen}>
        {MENU_ITEMS.map((item, index) => (
          <MobileMenuItem
            key={item.href}
            onClick={() => handleSelect(index)}
          >
            {item.label}
          </MobileMenuItem>
        ))}
      </MobileMenu>

      <ButtonContainer>
        <Button href="/login" $variant="outlined">Login</Button>
        <Button href="/signup" $variant="filled">Sign Up</Button>
      </ButtonContainer>

    </HeaderContainer>
  );
};

export default Header;

