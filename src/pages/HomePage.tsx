import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; /* Account for fixed header */
`;

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  z-index: 2;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const HeroImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', opacity: 0.8 }}>
              Tervetuloa
            </h4>
            <HeroTitle>
              We<br />
              <span style={{ color: '#ffd700' }}>Pet Care</span>
            </HeroTitle>
            <HeroSubtitle>
              Rakastamme lemmikejä niin kuin sinäkin :)
            </HeroSubtitle>
            <HeroDescription>
              Turvallista hoivaa kaikille lemmikeille! Ammattitaitoista palvelua 
              Helsingissä, Espoossa ja Vantaalla.
            </HeroDescription>
            <CTAButton onClick={() => window.location.href = '/booking'}>
              Varaa Palvelu
            </CTAButton>
          </HeroContent>
          
          <HeroImage>
            <ImageContainer>
              🐾
            </ImageContainer>
          </HeroImage>
        </HeroContainer>
      </HeroSection>
      
      {/* Services Preview Section */}
      <section style={{ 
        background: 'white', 
        padding: '4rem 0',
        marginTop: '2rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 600, 
              color: '#333', 
              marginBottom: '1rem' 
            }}>
              Meidän Palvelut
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Kattava hoiva kaikille lemmikeille
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
              color: 'white',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Kotikäynnit</h3>
              <p style={{ marginBottom: '1rem', opacity: 0.9 }}>Hoivaa lemmikillesi kotoa käsin</p>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>35€</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #4ecdc4, #6dd5ed)',
              color: 'white',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏥</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lemmikkien Hoitola</h3>
              <p style={{ marginBottom: '1rem', opacity: 0.9 }}>Moderni hoitola täydellä varustuksella</p>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>25€</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #45b7d1, #96c7ed)',
              color: 'white',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌙</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Yöhoito</h3>
              <p style={{ marginBottom: '1rem', opacity: 0.9 }}>Yöpäivystyspalvelu lemmikillesi kotona</p>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>50€</div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={() => window.location.href = '/services'}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Katso Kaikki Palvelut
            </button>
          </div>
        </div>
      </section>
      
      {/* About Preview Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        padding: '4rem 0',
        color: 'white'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 600, 
              marginBottom: '1rem' 
            }}>
              Tietoa Meistä
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Rakastamme lemmikejä ja haluamme tarjota parasta mahdollista hoivaa
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Rakkaus</h3>
              <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
                Rakastamme lemmikkejä yhtä paljon kuin sinä
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Turvallisuus</h3>
              <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
                Lemmikkisi turvallisuus on meille tärkeintä
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Luottamus</h3>
              <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
                Luotettava ja kokenut tiimi
              </p>
            </div>
          </div>
        </div>
      </section>
    </HomeContainer>
  );
};

export default HomePage;

