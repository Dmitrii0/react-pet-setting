import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const FooterSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const FooterNav = styled.div`
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
`;

const ContactInfo = styled.div`
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }
  
  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
    
    i {
      font-size: 1.1rem;
      color: white;
      margin-top: 0.2rem;
    }
    
    span {
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  
  .bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    
    p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }
    
    .footer-links {
      display: flex;
      gap: 2rem;
      
      a {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        transition: color 0.3s ease;
        
        &:hover {
          color: white;
        }
      }
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle>We Pet Care</FooterTitle>
            <FooterSubtitle>
              Rakastamme lemmikejä niin kuin sinäkin :)
            </FooterSubtitle>
            <SocialLinks>
              <SocialLink href="https://www.instagram.com/we_petcare/" target="_blank" rel="noopener noreferrer">
                <i className="ri-instagram-line"></i>
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <i className="ri-whatsapp-line"></i>
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <i className="ri-telegram-line"></i>
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterNav>
            <h4>Navigointi</h4>
            <ul>
              <li><Link to="/">Etusivu</Link></li>
              <li><Link to="/services">Palvelut</Link></li>
              <li><Link to="/booking">Varaus</Link></li>
              <li><Link to="/about">Tietoa meistä</Link></li>
              <li><a href="#contact">Yhteystiedot</a></li>
            </ul>
          </FooterNav>
          
          <ContactInfo>
            <h4>Yhteystiedot</h4>
            <div className="contact-item">
              <i className="ri-map-pin-line"></i>
              <span>Helsinki, Espoo, Vantaa<br />Uusimaa, Suomi</span>
            </div>
            <div className="contact-item">
              <i className="ri-phone-line"></i>
              <span>+358 40 123 4567</span>
            </div>
            <div className="contact-item">
              <i className="ri-mail-line"></i>
              <span>info@wepetcare.fi</span>
            </div>
          </ContactInfo>
        </FooterGrid>
        
        <FooterBottom>
          <div className="bottom-content">
            <p>&copy; 2026 We Pet Care. Kaikki oikeudet pidätetään.</p>
            <div className="footer-links">
              <a href="#">Tietosuojakäytäntö</a>
              <a href="#">Käyttöehdot</a>
            </div>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

