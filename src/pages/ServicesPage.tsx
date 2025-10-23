import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedService, fetchServices } from '../store/slices/servicesSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ServicesContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
  padding-top: 100px;
`;

const ServicesTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceCard = styled.div<{ cardColor: string }>`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.6s ease;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.6s ease forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${props => props.cardColor}, ${props => props.cardColor}CC);
  }
  
  @keyframes slideUp {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ServiceIcon = styled.div<{ cardColor: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${props => props.cardColor}, ${props => props.cardColor}CC);
`;

const ServicePrice = styled.div<{ cardColor: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.cardColor};
  margin-bottom: 1rem;
  text-align: center;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    color: #555;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    
    &::before {
      content: '✓';
      color: #667eea;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

const ServiceButton = styled.button<{ cardColor: string }>`
  background: linear-gradient(135deg, ${props => props.cardColor}, ${props => props.cardColor}CC);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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

const ServicesPage: React.FC = () => {
  const { services, loading, error } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

  useEffect(() => {
    dispatch(fetchServices() as any);
  }, [dispatch]);

  const handleSelectService = (service: any) => {
    dispatch(setSelectedService(service));
    navigate('/booking');
  };

  return (
    <ServicesContainer>
      <BackButton onClick={() => navigate('/')}>
        <i className="ri-arrow-left-line"></i>
      </BackButton>
      
      <div className="container">
        <ServicesTitle>
          <h1>Meidän Palvelut</h1>
          <p>Kattava hoiva kaikille lemmikeille</p>
        </ServicesTitle>
        
        {loading && (
          <div style={{ textAlign: 'center', color: 'white', fontSize: '1.2rem', marginTop: '2rem' }}>
            Ladataan palveluja...
          </div>
        )}
        
        {error && (
          <div style={{ textAlign: 'center', color: '#ff6b6b', fontSize: '1.2rem', marginTop: '2rem' }}>
            Virhe: {error}
          </div>
        )}
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              cardColor={cardColors[index % cardColors.length]}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <ServiceIcon cardColor={cardColors[index % cardColors.length]}>
                <i className={service.icon}></i>
              </ServiceIcon>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#333', marginBottom: '1rem' }}>
                {service.name}
              </h3>
              <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {service.description}
              </p>
              <ServicePrice cardColor={cardColors[index % cardColors.length]}>
                {service.price}€
              </ServicePrice>
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ServiceFeatures>
              <ServiceButton 
                cardColor={cardColors[index % cardColors.length]}
                onClick={() => handleSelectService(service)}
              >
                Valitse
              </ServiceButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </div>
    </ServicesContainer>
  );
};

export default ServicesPage;




