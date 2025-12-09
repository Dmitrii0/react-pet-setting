import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { importServicesToFirebase, recreateServicesCollection } from '../../utils/importServicesToFirebase';
import { fixFeaturesInFirebase } from '../../utils/fixFeaturesInFirebase';
import styled from 'styled-components';

const TestContainer = styled.div`
  padding: 20px;
  margin: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  border: 2px solid #667eea;
  max-width: 600px;
`;

const StatusText = styled.p<{ isSuccess: boolean }>`
  color: ${props => props.isSuccess ? '#28a745' : '#dc3545'};
  font-weight: 600;
  margin: 10px 0;
`;

const TestButton = styled.button`
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5568d3;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Проверка подключения...');
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [servicesCount, setServicesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setIsLoading(true);
        // Проверяем подключение к Firestore
        const bookingsRef = collection(db, 'bookings');
        const bookingsSnapshot = await getDocs(bookingsRef);
        
        const servicesRef = collection(db, 'services');
        const servicesSnapshot = await getDocs(servicesRef);
        
        setBookingsCount(bookingsSnapshot.size);
        setServicesCount(servicesSnapshot.size);
        setIsSuccess(true);
        setStatus(`✅ Firebase подключен! Бронирований: ${bookingsSnapshot.size}, Услуг: ${servicesSnapshot.size}`);
        console.log('✅ Firebase подключение успешно!');
        console.log('📊 Найдено документов в bookings:', bookingsSnapshot.size);
        console.log('📊 Найдено документов в services:', servicesSnapshot.size);
      } catch (error: any) {
        setIsSuccess(false);
        setStatus(`❌ Ошибка подключения: ${error.message}`);
        console.error('❌ Firebase ошибка:', error);
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  const testWrite = async () => {
    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, 'bookings'), {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'Тестовое подключение Firebase',
        customerName: 'Тест',
        customerEmail: 'test@example.com',
        status: 'pending'
      });
      
      setIsSuccess(true);
      setStatus(`✅ Тестовая запись успешно добавлена! ID: ${docRef.id}`);
      alert('✅ Тестовая запись успешно добавлена в Firestore!\n\nПроверьте Firebase Console для подтверждения.');
      
      // Обновляем счетчик
      const snapshot = await getDocs(collection(db, 'bookings'));
      setBookingsCount(snapshot.size);
    } catch (error: any) {
      setIsSuccess(false);
      setStatus(`❌ Ошибка записи: ${error.message}`);
      alert(`❌ Ошибка записи: ${error.message}`);
      console.error('Ошибка записи:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TestContainer>
      <h3 style={{ marginTop: 0, color: '#333' }}>🔥 Тест подключения Firebase</h3>
      <StatusText isSuccess={isSuccess}>
        {isLoading ? '⏳ Загрузка...' : status}
      </StatusText>
      <p style={{ color: '#666', margin: '10px 0' }}>
        <strong>Бронирований в базе:</strong> {bookingsCount}
      </p>
      <p style={{ color: '#666', margin: '10px 0' }}>
        <strong>Услуг в базе:</strong> {servicesCount}
        {servicesCount === 0 && (
          <span style={{ color: '#ff6b6b', marginLeft: '10px' }}>
            ⚠️ Коллекция services пуста!
          </span>
        )}
      </p>
      
      {servicesCount === 0 && (
        <TestButton 
          onClick={async () => {
            setIsImporting(true);
            try {
              const result = await importServicesToFirebase();
              setStatus(`✅ Импортировано услуг: ${result.imported}`);
              const servicesRef = collection(db, 'services');
              const snapshot = await getDocs(servicesRef);
              setServicesCount(snapshot.size);
              alert(`✅ Успешно импортировано ${result.imported} услуг!`);
            } catch (error: any) {
              alert(`❌ Ошибка импорта: ${error.message}`);
            } finally {
              setIsImporting(false);
            }
          }}
          disabled={isLoading || isImporting}
          style={{ 
            background: servicesCount === 0 ? '#28a745' : undefined,
            marginBottom: '10px'
          }}
        >
          {isImporting ? 'Импорт...' : '📥 Импортировать услуги в Firestore'}
        </TestButton>
      )}
      
      {servicesCount > 0 && (
        <>
          <TestButton 
            onClick={async () => {
              if (!window.confirm('⚠️ ВНИМАНИЕ!\n\nЭто удалит ВСЕ существующие документы в коллекции services и создаст новые с правильными ID (1, 2, 3, 4, 5, 6).\n\nПродолжить?')) {
                return;
              }
              setIsImporting(true);
              try {
                const result = await recreateServicesCollection();
                setStatus(`✅ Перезаписано! Удалено: ${result.deleted}, Создано: ${result.imported}`);
                const servicesRef = collection(db, 'services');
                const snapshot = await getDocs(servicesRef);
                setServicesCount(snapshot.size);
                alert(`✅ Успешно перезаписано!\n\nУдалено старых: ${result.deleted}\nСоздано новых: ${result.imported}\n\nТеперь все документы имеют правильные ID (1-6) и features как массив.`);
              } catch (error: any) {
                alert(`❌ Ошибка перезаписи: ${error.message}`);
              } finally {
                setIsImporting(false);
              }
            }}
            disabled={isLoading || isImporting}
            style={{ 
              background: '#dc3545',
              marginBottom: '10px'
            }}
          >
            {isImporting ? 'Перезапись...' : '🔄 Перезаписать все услуги (с правильными ID)'}
          </TestButton>
          
          <TestButton 
            onClick={async () => {
              setIsImporting(true);
              try {
                const result = await fixFeaturesInFirebase();
                setStatus(`✅ Исправлено документов: ${result.fixed}`);
                alert(`✅ Успешно исправлено ${result.fixed} документов!\n\nПоле features теперь массив вместо строки.`);
              } catch (error: any) {
                alert(`❌ Ошибка исправления: ${error.message}`);
              } finally {
                setIsImporting(false);
              }
            }}
            disabled={isLoading || isImporting}
            style={{ 
              background: '#ff9800',
              marginBottom: '10px'
            }}
          >
            {isImporting ? 'Исправление...' : '🔧 Исправить поле features (строка → массив)'}
          </TestButton>
        </>
      )}
      
      <TestButton 
        onClick={testWrite}
        disabled={isLoading || isImporting}
      >
        {isLoading ? 'Тестирование...' : 'Тест записи в Firestore'}
      </TestButton>
      <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '15px' }}>
        💡 Откройте консоль браузера (F12) для подробных логов
      </p>
    </TestContainer>
  );
};

export default FirebaseTest;

