/**
 * Конфигурация платежей
 * 
 * Для MVP версии используем банковский перевод
 * Для продакшена можно добавить Stripe
 */

export const PAYMENT_CONFIG = {
  // Банковский счет
  bankAccount: {
    iban: 'FI12 3456 7890 1234 56', // Замените на ваш реальный IBAN
    recipient: 'We Pet Care',
    bic: 'OKOYFIHH', // Банковский код (опционально)
    bankName: 'Osuuspankki' // Название банка (опционально)
  },
  
  // Доступные способы оплаты
  paymentMethods: [
    {
      id: 'bank_transfer',
      name: 'Банковский перевод',
      description: 'Переведите деньги на наш банковский счет',
      icon: '🏦'
    },
    {
      id: 'mobilepay',
      name: 'MobilePay',
      description: 'Переведите через MobilePay на номер телефона',
      icon: '📱',
      phoneNumber: '+358 40 123 4567' // Замените на ваш номер
    },
    {
      id: 'cash',
      name: 'Наличные при встрече',
      description: 'Оплата наличными при оказании услуги',
      icon: '💵'
    }
  ],
  
  // Валюта
  currency: 'EUR',
  currencySymbol: '€'
};

/**
 * Получить инструкции по оплате для бронирования
 */
export const getPaymentInstructions = (bookingId: string, amount: number) => {
  return {
    title: 'Инструкции по оплате',
    amount: `${amount}${PAYMENT_CONFIG.currencySymbol}`,
    bookingId: bookingId,
    bankAccount: PAYMENT_CONFIG.bankAccount,
    methods: PAYMENT_CONFIG.paymentMethods,
    instructions: `
      Пожалуйста, переведите ${amount}${PAYMENT_CONFIG.currencySymbol} на наш банковский счет.
      
      IBAN: ${PAYMENT_CONFIG.bankAccount.iban}
      Получатель: ${PAYMENT_CONFIG.bankAccount.recipient}
      Ссылка: ${bookingId}
      
      После оплаты мы подтвердим ваше бронирование.
    `
  };
};





