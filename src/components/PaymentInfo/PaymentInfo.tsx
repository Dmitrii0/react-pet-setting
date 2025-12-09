import React from 'react';
import styled from 'styled-components';
import { PAYMENT_CONFIG, getPaymentInstructions } from '../../config/payment';

const PaymentContainer = styled.div`
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

const PaymentMethod = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 10px;
`;

const MethodTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MethodDescription = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const BankDetails = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-family: monospace;
`;

const BankDetailRow = styled.div`
  margin-bottom: 0.5rem;
  
  strong {
    color: #333;
  }
`;

const CopyButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    background: #5568d3;
  }
`;

interface PaymentInfoProps {
  bookingId: string;
  amount: number;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ bookingId, amount }) => {
  const instructions = getPaymentInstructions(bookingId, amount);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Скопировано в буфер обмена!');
  };

  return (
    <PaymentContainer>
      <Title>💳 Инструкции по оплате</Title>
      
      <Amount>
        Сумма к оплате: {instructions.amount}
      </Amount>

      <PaymentMethod>
        <MethodTitle>
          🏦 Способ 1: Банковский перевод
        </MethodTitle>
        <MethodDescription>
          Переведите деньги на наш банковский счет
        </MethodDescription>
        <BankDetails>
          <BankDetailRow>
            <strong>IBAN:</strong> {instructions.bankAccount.iban}
            <CopyButton onClick={() => copyToClipboard(instructions.bankAccount.iban)}>
              Копировать
            </CopyButton>
          </BankDetailRow>
          <BankDetailRow>
            <strong>Получатель:</strong> {instructions.bankAccount.recipient}
          </BankDetailRow>
          <BankDetailRow>
            <strong>Сумма:</strong> {instructions.amount}
          </BankDetailRow>
          <BankDetailRow>
            <strong>Ссылка:</strong> {instructions.bookingId}
            <CopyButton onClick={() => copyToClipboard(instructions.bookingId)}>
              Копировать
            </CopyButton>
          </BankDetailRow>
        </BankDetails>
      </PaymentMethod>

      {PAYMENT_CONFIG.paymentMethods.find(m => m.id === 'mobilepay') && (
        <PaymentMethod>
          <MethodTitle>
            📱 Способ 2: MobilePay
          </MethodTitle>
          <MethodDescription>
            Отправьте платеж на номер: {PAYMENT_CONFIG.paymentMethods.find(m => m.id === 'mobilepay')?.phoneNumber}
          </MethodDescription>
        </PaymentMethod>
      )}

      <PaymentMethod>
        <MethodTitle>
          💵 Способ 3: Наличные при встрече
        </MethodTitle>
        <MethodDescription>
          Вы можете оплатить наличными при оказании услуги
        </MethodDescription>
      </PaymentMethod>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff3cd', borderRadius: '10px', color: '#856404' }}>
        ⚠️ После оплаты мы подтвердим ваше бронирование по email.
      </div>
    </PaymentContainer>
  );
};

export default PaymentInfo;





