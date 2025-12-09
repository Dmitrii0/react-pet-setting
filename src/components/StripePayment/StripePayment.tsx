import React from 'react';
import styled from 'styled-components';

const PaymentFormContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Amount = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`;

interface StripePaymentProps {
  amount: number;
  bookingId?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

// Временная заглушка - Stripe будет настроен позже
const StripePayment: React.FC<StripePaymentProps> = ({ amount, onSuccess, onError }) => {
  return (
    <PaymentFormContainer>
      <Title>💳 Оплата бронирования</Title>
      <Amount>Сумма: {amount}€</Amount>
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        <p>⚠️ Интеграция Stripe будет настроена позже</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Для тестирования бронирования используйте форму выше.
        </p>
      </div>
    </PaymentFormContainer>
  );
};

export default StripePayment;
