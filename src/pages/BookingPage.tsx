import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addBookingToFirebase } from '../store/slices/bookingsSlice';
import { setSelectedService } from '../store/slices/servicesSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const BookingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
  padding-top: 100px;
`;

const BookingTitle = styled.div`
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

const BookingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServicesSelection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const BookingForm = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
  
  textarea {
    height: 100px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
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

const BookingPage: React.FC = () => {
  const services = useSelector((state: RootState) => state.services.services);
  const selectedService = useSelector((state: RootState) => state.services.selectedService);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    startDate: '',
    endDate: '',
    time: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service: any) => {
    dispatch(setSelectedService(service));
  };

  // Функция для расчета цены
  const calculatePrice = () => {
    if (!selectedService || !formData.startDate || !formData.endDate) {
      return 0;
    }
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 чтобы включить оба дня
    
    return selectedService.price * diffDays;
  };

  const totalPrice = calculatePrice();

  // Тестовая функция для проверки Firebase
  const testFirebase = async () => {
    try {
      console.log("🔥 Тестируем Firebase...");
      const docRef = await addDoc(collection(db, "bookings"), {
        name: "Dmitrii",
        email: "stepanov@gmail.com",
        phone: "11",
        testData: true,
        createdAt: new Date().toISOString()
      });
      console.log("✅ Тест успешен! Document ID:", docRef.id);
      alert("✅ Firebase тест успешен! Проверьте консоль.");
    } catch (error) {
      console.error("❌ Ошибка Firebase:", error);
      alert("❌ Ошибка Firebase: " + error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      alert('Valitse palvelu ennen varaamista!');
      return;
    }

    const booking = {
      id: Date.now().toString(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: totalPrice,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      petName: formData.petName,
      petType: formData.petType,
      date: formData.startDate,
      time: formData.time,
      message: formData.message,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    dispatch(addBookingToFirebase(booking));
    alert('Varaus lähetetty onnistuneesti! Otamme yhteyttä sinuun pian.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      petName: '',
      petType: '',
      startDate: '',
      endDate: '',
      time: '',
      message: ''
    });
  };

  return (
    <BookingContainer>
      <BackButton onClick={() => navigate('/')}>
        <i className="ri-arrow-left-line"></i>
      </BackButton>
      
      <div className="container">
        <BookingTitle>
          <h1>Varaa Palvelu</h1>
          <p>Täytä lomake ja varaa palvelu lemmikillesi</p>
        </BookingTitle>
        
        <BookingContent>
          <ServicesSelection>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>
              Valitse Palvelu
            </h2>
            
            {services.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#666',
                background: '#f8f9fa',
                borderRadius: '10px'
              }}>
                <p>Ladataan palveluita...</p>
              </div>
            ) : (
              services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                style={{
                  border: selectedService?.id === service.id ? '3px solid #667eea' : '2px solid #e0e0e0',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: selectedService?.id === service.id ? '#f8f9ff' : 'white',
                  boxShadow: selectedService?.id === service.id ? '0 5px 15px rgba(102, 126, 234, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transform: selectedService?.id === service.id ? 'translateY(-2px)' : 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  if (selectedService?.id !== service.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedService?.id !== service.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginRight: '1rem',
                    color: selectedService?.id === service.id ? '#667eea' : '#666'
                  }}>
                    {service.icon === 'ri-home-heart-line' && '🏠'}
                    {service.icon === 'ri-hospital-line' && '🏥'}
                    {service.icon === 'ri-moon-line' && '🌙'}
                    {service.icon === 'ri-calendar-line' && '📅'}
                    {service.icon === 'ri-walk-line' && '🚶'}
                    {service.icon === 'ri-car-line' && '🚗'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.3rem', color: '#333' }}>
                      {service.name}
                    </h3>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#667eea' }}>
                      {service.price}€/päivä
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.4 }}>
                  {service.description}
                </p>
                {selectedService?.id === service.id && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem', 
                    background: '#667eea', 
                    color: 'white', 
                    borderRadius: '5px', 
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    ✓ Valittu
                  </div>
                )}
              </div>
              ))
            )}
          </ServicesSelection>
          
          <BookingForm>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>
              Varaustiedot
            </h2>
            
            {selectedService && (
              <div style={{ background: '#f8f9fa', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', borderLeft: '4px solid #667eea' }}>
                <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{selectedService.name}</h3>
                <div style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>
                  Hinta per päivä: {selectedService.price}€
                </div>
                {totalPrice > 0 && (
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    color: '#667eea',
                    background: 'white',
                    padding: '0.5rem',
                    borderRadius: '5px',
                    textAlign: 'center'
                  }}>
                    Yhteensä: {totalPrice}€
                  </div>
                )}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Nimi *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Sähköposti *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="phone">Puhelinnumero *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="petName">Lemmikin nimi *</label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="petType">Lemmikin laji *</label>
                <select
                  id="petType"
                  name="petType"
                  value={formData.petType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Valitse laji</option>
                  <option value="koira">Koira</option>
                  <option value="kissa">Kissa</option>
                  <option value="lintu">Lintu</option>
                  <option value="kala">Kala</option>
                  <option value="muu">Muu</option>
                </select>
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="startDate">Aloituspäivä *</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="endDate">Lopetuspäivä *</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="time">Toivottu aika *</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Valitse aika</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="message">Lisätiedot</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Kerro lisää lemmikistäsi tai erityisistä tarpeista..."
                />
              </FormGroup>
              
                  <SubmitButton type="submit">
                    Varaa Palvelu
                  </SubmitButton>
                  
                  {/* Тестовая кнопка для Firebase */}
                  <button 
                    type="button" 
                    onClick={testFirebase}
                    style={{
                      background: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginTop: '10px',
                      fontSize: '14px'
                    }}
                  >
                    🔥 Тест Firebase
                  </button>
            </form>
          </BookingForm>
        </BookingContent>
      </div>
    </BookingContainer>
  );
};

export default BookingPage;

