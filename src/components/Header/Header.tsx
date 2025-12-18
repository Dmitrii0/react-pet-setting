import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  z-index: 1001;
  position: relative;
  
  &:hover {
    color: #667eea;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    gap: 0;
    padding: 0;
    border-radius: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-height: ${props => props.isOpen ? 'calc(100vh - 70px)' : '0'};
    overflow: hidden;
    transform: none;
    opacity: ${props => props.isOpen ? '1' : '0'};
    pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
    transition: opacity 0.3s ease, max-height 0.3s ease;
    z-index: 999;
    
    li {
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    a {
      display: block;
      padding: 1.25rem 1.5rem;
      width: 100%;
    }
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #333;
  line-height: 1;
  padding: 0.5rem;
  z-index: 1001;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
  
  &:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/" onClick={closeMenu}>
          We Pet Care Helsinki Espoo Vantaa
        </Logo>
        
        <MenuButton
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
          aria-expanded={isMenuOpen}
        >
          <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </MenuButton>
        
        <NavLinks isOpen={isMenuOpen}>
          <li><NavLink to="/" onClick={closeMenu}>Etusivu</NavLink></li>
          <li><NavLink to="/services" onClick={closeMenu}>Palvelut</NavLink></li>
          <li><NavLink to="/booking" onClick={closeMenu}>Varaus</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>Tietoa miestä</NavLink></li>
          <li><NavLink to="/bookings-management" onClick={closeMenu}>Hallinta</NavLink></li>
          <li><NavLink to="/#contact" onClick={closeMenu}>Yhtestiedot</NavLink></li>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Header;









