import React from 'react';
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const InstagramContainer = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 4rem 0;
  margin: 2rem 0;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SubHeading = styled.p`
  color: #E4405F;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 1rem;
`;

const Header = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  
  a {
    color: #E4405F;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      color: #C13584;
      transform: scale(1.05);
    }
  }
`;

const Carousel = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
  
  &:hover .instagram-track {
    animation-play-state: paused;
  }
`;

const Track = styled.div`
  display: flex;
  animation: ${scroll} 20s linear infinite;
  gap: 1.5rem;
  width: max-content;
`;

const Card = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 0 !important;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
  
  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
  
  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(225, 48, 108, 0.8), rgba(225, 48, 108, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
  
  i {
    font-size: 3rem;
    color: white;
    animation: ${pulse} 2s infinite;
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
`;

const CTA = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #E4405F, #C13584);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0 !important;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(228, 64, 95, 0.4);
    background: linear-gradient(45deg, #C13584, #E4405F);
  }
  
  i {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const Instagram: React.FC = () => {
  const instagramPosts = [
    { id: 1, image: '/assets/instagram-1.jpg', alt: 'Instagram post 1' },
    { id: 2, image: '/assets/instagram-2.jpg', alt: 'Instagram post 2' },
    { id: 3, image: '/assets/instagram-3.jpg', alt: 'Instagram post 3' },
    { id: 4, image: '/assets/instagram-4.jpg', alt: 'Instagram post 4' },
  ];

  // Duplicate posts for seamless loop
  const allPosts = [...instagramPosts, ...instagramPosts];

  return (
    <InstagramContainer>
      <Container>
        <SubHeading>FOLLOW US</SubHeading>
        <Header>
          Instagram{' '}
          <a 
            href="https://www.instagram.com/we_petcare/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            @we_petcare
          </a>
        </Header>
        
        <Carousel>
          <Track className="instagram-track">
            {allPosts.map((post, index) => (
              <Card key={`${post.id}-${index}`}>
                <img src={post.image} alt={post.alt} />
                <Overlay>
                  <i className="ri-instagram-line"></i>
                </Overlay>
              </Card>
            ))}
          </Track>
        </Carousel>
        
        <CTA>
          <Button 
            href="https://www.instagram.com/we_petcare/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="ri-instagram-line"></i>
            Follow us on Instagram
          </Button>
        </CTA>
      </Container>
    </InstagramContainer>
  );
};

export default Instagram;

