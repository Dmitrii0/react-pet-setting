/**
 * EmailJS service setup
 * 
 * 1. Зарегистрируйтесь на https://www.emailjs.com/ (бесплатно)
 * 2. Создайте Email Service (Gmail, Outlook и т.д.)
 * 3. Добавьте получателя: ваш email
 * 4. Получите Service ID
 * 5. Создайте Email Template
 * 6. Получите Template ID
 * 7. Получите Public Key
 * 8. Замените значения в .env файле:
 *    REACT_APP_EMAILJS_SERVICE_ID=your_service_id
 *    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
 *    REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
 */

import emailjs from '@emailjs/browser';

// Настройки EmailJS (получите эти значения из панели управления EmailJS)
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Инициализация EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface BookingNotificationData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  petName: string;
  petType: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  message?: string;
}

/**
 * Отправка email уведомления владельцу сайта о новом бронировании
 */
export const sendBookingNotification = async (bookingData: BookingNotificationData): Promise<boolean> => {
  try {
    const templateParams = {
      // Данные для отображения в email шаблоне
      to_owner: 'Владелец сайта',
      customer_name: bookingData.customerName,
      customer_email: bookingData.customerEmail,
      customer_phone: bookingData.customerPhone,
      pet_name: bookingData.petName,
      pet_type: bookingData.petType,
      service_name: bookingData.serviceName,
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      price: `${bookingData.price}€`,
      message: bookingData.message || 'Ei viestiä',
      // Timestamp
      timestamp: new Date().toLocaleString('fi-FI'),
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Email notification sent successfully:', response);
    return true;
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    return false;
  }
};

/**
 * Отправка подтверждающего email клиенту
 */
export const sendCustomerConfirmation = async (customerEmail: string, bookingData: BookingNotificationData): Promise<boolean> => {
  try {
    // Здесь можно создать второй шаблон для клиента
    const templateParams = {
      to_email: customerEmail,
      customer_name: bookingData.customerName,
      service_name: bookingData.serviceName,
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      price: `${bookingData.price}€`,
    };

    // Можно использовать другой template ID для клиента
    const CUSTOMER_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID || EMAILJS_TEMPLATE_ID;
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      CUSTOMER_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Customer confirmation email sent:', response);
    return true;
  } catch (error) {
    console.error('❌ Error sending customer confirmation:', error);
    return false;
  }
};

