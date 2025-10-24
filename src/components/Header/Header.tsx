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
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.3s ease;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
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
          <li><NavLink to="/#contact" onClick={closeMenu}>Yhtestiedot</NavLink></li>
        </NavLinks>
        
        <MenuButton onClick={toggleMenu}>
          <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </MenuButton>
      </NavContainer>
    </Nav>
  );
};

export default Header;







