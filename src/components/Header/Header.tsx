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
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  
  &:hover {
    color: #667eea;
  }
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.75rem 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
    opacity: ${props => props.isOpen ? '1' : '0'};
    pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
    transition: opacity 0.25s ease, transform 0.25s ease;
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
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  line-height: 1;
  padding: 0.25rem;
  
  @media (max-width: 768px) {
    display: block;
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
        <Logo to="/">
          We Pet Care Helsinki Espoo Vantaa
        </Logo>
        
        <NavLinks isOpen={isMenuOpen}>
          <li><NavLink to="/" onClick={closeMenu}>Etusivu</NavLink></li>
          <li><NavLink to="/services" onClick={closeMenu}>Palvelut</NavLink></li>
          <li><NavLink to="/booking" onClick={closeMenu}>Varaus</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>Tietoa miestä</NavLink></li>
          <li><NavLink to="/bookings-management" onClick={closeMenu}>Hallinta</NavLink></li>
          <li><NavLink to="/#contact" onClick={closeMenu}>Yhtestiedot</NavLink></li>
        </NavLinks>
        
        <MenuButton
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </MenuButton>
      </NavContainer>
    </Nav>
  );
};

export default Header;









