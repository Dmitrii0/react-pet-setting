import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AboutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
  padding-top: 100px;
`;

const AboutTitle = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FoundersSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FoundersContent = styled.div`
  color: white;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #ffd700;
  }
  
  .founders-names {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
  }
  
  .founders-title {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
    font-style: italic;
  }
  
  .founders-description {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
  }
`;

const ValuesSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  backdrop-filter: blur(10px);
`;

const ValuesTitle = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .value-icon {
    font-size: 3rem;
    color: #ffd700;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AboutContainer>
      <BackButton onClick={() => navigate('/')}>
        <i className="ri-arrow-left-line"></i>
      </BackButton>
      
      <div className="container">
        <AboutTitle>
          <h1>Tietoa Meistä</h1>
          <p>Rakastamme lemmikejä ja haluamme tarjota parasta mahdollista hoivaa</p>
        </AboutTitle>
        
        <FoundersSection>
          <FoundersContent>
            <h2>Perustajat</h2>
            <div className="founders-names">We are Valeria & Natasha</div>
            <div className="founders-title">True pet lovers and founders of We Pet Care</div>
            
            <div className="founders-description">
              <p>We care for your pet just like you would, following every routine, instruction, and little detail that matters.</p>
              
              <p>With our trusted, personally trained team, your pet stays safe, loved, and happy in the comfort of their familiar routine.</p>
            </div>
          </FoundersContent>
          
         <VideoContainer>
  <img 
    src={`${process.env.PUBLIC_URL || ''}/assets/we-pet-care.png`}
    alt="Tervetuloa tutustumaan meihin!"
    style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
    onError={(e) => {
      console.error('Failed to load image:', e);
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />
  <div style={{ textAlign: 'center', marginTop: '1rem', color: 'white' }}>
    <p>🎥 Tervetuloa tutustumaan meihin!</p>
    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Valeria & Natasha - We Pet Care</p>
  </div>
</VideoContainer>


        </FoundersSection>
        
        <ValuesSection>
          <ValuesTitle>Arvomme</ValuesTitle>
          <ValuesGrid>
            <ValueCard>
              <div className="value-icon">
                <i className="ri-heart-line"></i>
              </div>
              <h3>Rakkaus</h3>
              <p>Rakastamme lemmikkejä yhtä paljon kuin sinä. Jokainen lemmikki on meille erityinen ja saamme siitä hoivaa sydämellä.</p>
            </ValueCard>
            
            <ValueCard>
              <div className="value-icon">
                <i className="ri-shield-check-line"></i>
              </div>
              <h3>Turvallisuus</h3>
              <p>Lemmikkisi turvallisuus on meille tärkeintä. Käytämme vain turvallisia menetelmiä ja tuotteita.</p>
            </ValueCard>
            
            <ValueCard>
              <div className="value-icon">
                <i className="ri-team-line"></i>
              </div>
              <h3>Luottamus</h3>
              <p>Tiimimme on henkilökohtaisesti koulutettu ja luotettava. Voit luottaa siihen, että lemmikkisi on hyvissä käsissä.</p>
            </ValueCard>
            
            <ValueCard>
              <div className="value-icon">
                <i className="ri-home-heart-line"></i>
              </div>
              <h3>Mukavuus</h3>
              <p>Lemmikkisi pysyy tutussa ympäristössä ja mukavassa rutiinissa. Hoiva tapahtuu siellä, missä lemmikki on onnellisin.</p>
            </ValueCard>
          </ValuesGrid>
        </ValuesSection>
      </div>
    </AboutContainer>
  );
};

export default AboutPage;

