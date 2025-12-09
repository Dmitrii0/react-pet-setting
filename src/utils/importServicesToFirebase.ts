// Утилита для импорта услуг в Firebase Firestore
// Запустите эту функцию один раз из консоли браузера или создайте временную страницу

import { db } from '../lib/firebase';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

const servicesData = [
  {
    id: '1',
    name: 'Kotikäynnit',
    description: 'Hoivaa lemmikillesi kotoa käsin. Mukavaa ja stressitöntä hoivaa tutussa ympäristössä.',
    price: 35.00,
    duration: 60,
    category: 'home_visit',
    features: [
      'Lääkärintarkastus kotona',
      'Rokotukset kotona',
      'Hoidot kotona',
      'Yksilöllinen hoito'
    ],
    icon: 'ri-home-heart-line',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Lemmikkien Hoitola',
    description: 'Moderni hoitola täydellä varustuksella kaikille lemmikkien hoitotarpeille.',
    price: 25.00,
    duration: 120,
    category: 'clinic',
    features: [
      'Päivittäinen hoito',
      'Lääkärintarkastukset',
      'Hoidot ja toimenpiteet',
      'Valvottu ympäristö'
    ],
    icon: 'ri-hospital-line',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Yöhoito Omassa Kodissasi',
    description: 'Yöpäivystyspalvelu lemmikillesi kotona. Rauhallinen yöhoito tutussa ympäristössä.',
    price: 50.00,
    duration: 480,
    category: 'overnight',
    features: [
      'Yöpäivystys kotona',
      'Valvonta ja hoito',
      'Hätätilanteet',
      'Rauhallinen yö'
    ],
    icon: 'ri-moon-line',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Koirapäiväkoti Tuntivelvollisuudella',
    description: 'Sosiaalinen päiväkoti koirille. Leikkimistä, harjoittelua ja seurustelua.',
    price: 15.00,
    duration: 480,
    category: 'daycare',
    features: [
      'Päivittäinen hoito',
      'Sosiaalinen ympäristö',
      'Harjoittelua',
      'Valvottu ympäristö'
    ],
    icon: 'ri-calendar-check-line',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Koiran Ulkoilutus',
    description: 'Ammattitaitoinen ulkoilutus palvelu koirillesi. Säännölliset kävelyt päivittäin.',
    price: 12.00,
    duration: 30,
    category: 'walking',
    features: [
      'Säännölliset kävelyt',
      'Ammattitaitoinen hoito',
      'Terveysseuranta',
      'Yksilöllinen hoito'
    ],
    icon: 'ri-walk-line',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Lemmikkitaksi',
    description: 'Turvallinen ja mukava kuljetuspalvelu lemmikillesi. Ammattitaitoinen kuski.',
    price: 20.00,
    duration: 60,
    category: 'transport',
    features: [
      'Turvallinen kuljetus',
      'Ammattitaitoinen kuski',
      'Mukava ympäristö',
      'Ajantasainen kuljetus'
    ],
    icon: 'ri-car-line',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const importServicesToFirebase = async () => {
  try {
    console.log('🔥 Начинаем импорт услуг в Firebase...\n');
    
    let imported = 0;
    let errors = 0;
    
    for (const service of servicesData) {
      try {
        const serviceRef = doc(db, 'services', service.id);
        await setDoc(serviceRef, {
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          category: service.category,
          features: service.features,
          icon: service.icon,
          isActive: service.isActive,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt
        });
        
        console.log(`✅ [${service.id}] Импортирован: ${service.name}`);
        imported++;
      } catch (error: any) {
        console.error(`❌ [${service.id}] Ошибка при импорте ${service.name}:`, error.message);
        errors++;
      }
    }
    
    console.log('\n📊 Результаты:');
    console.log(`✅ Успешно импортировано: ${imported}`);
    if (errors > 0) {
      console.log(`❌ Ошибок: ${errors}`);
    }
    console.log('🎉 Импорт завершен!');
    
    return { imported, errors };
  } catch (error: any) {
    console.error('❌ Критическая ошибка:', error);
    throw error;
  }
};

// Функция для полной перезаписи коллекции (удаляет все и создает заново с правильными ID)
export const recreateServicesCollection = async () => {
  try {
    console.log('🔄 Начинаем перезапись коллекции services...\n');
    
    // 1. Удаляем все существующие документы
    const servicesRef = collection(db, 'services');
    const snapshot = await getDocs(servicesRef);
    
    console.log(`🗑️ Найдено документов для удаления: ${snapshot.size}`);
    let deleted = 0;
    
    for (const docSnap of snapshot.docs) {
      try {
        await deleteDoc(doc(db, 'services', docSnap.id));
        console.log(`🗑️ Удален документ: ${docSnap.id}`);
        deleted++;
      } catch (error: any) {
        console.error(`❌ Ошибка при удалении ${docSnap.id}:`, error.message);
      }
    }
    
    console.log(`✅ Удалено документов: ${deleted}\n`);
    
    // 2. Создаем новые документы с правильными ID
    let imported = 0;
    let errors = 0;
    
    for (const service of servicesData) {
      try {
        const serviceRef = doc(db, 'services', service.id);
        await setDoc(serviceRef, {
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          category: service.category,
          features: service.features, // Массив, не строка!
          icon: service.icon,
          isActive: service.isActive,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt
        });
        
        console.log(`✅ [${service.id}] Создан: ${service.name}`);
        imported++;
      } catch (error: any) {
        console.error(`❌ [${service.id}] Ошибка при создании ${service.name}:`, error.message);
        errors++;
      }
    }
    
    console.log('\n📊 Результаты:');
    console.log(`🗑️ Удалено старых документов: ${deleted}`);
    console.log(`✅ Создано новых документов: ${imported}`);
    if (errors > 0) {
      console.log(`❌ Ошибок: ${errors}`);
    }
    console.log('🎉 Перезапись завершена!');
    
    return { deleted, imported, errors };
  } catch (error: any) {
    console.error('❌ Критическая ошибка:', error);
    throw error;
  }
};

// Экспорт для использования в консоли браузера
if (typeof window !== 'undefined') {
  (window as any).importServicesToFirebase = importServicesToFirebase;
  (window as any).recreateServicesCollection = recreateServicesCollection;
}


