// Утилита для исправления поля features в Firestore (из строки в массив)

import { db } from '../lib/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const featuresData: { [key: string]: string[] } = {
  '1': ['Lääkärintarkastus kotona', 'Rokotukset kotona', 'Hoidot kotona', 'Yksilöllinen hoito'],
  '2': ['Päivittäinen hoito', 'Lääkärintarkastukset', 'Hoidot ja toimenpiteet', 'Valvottu ympäristö'],
  '3': ['Yöpäivystys kotona', 'Valvonta ja hoito', 'Hätätilanteet', 'Rauhallinen yö'],
  '4': ['Päivittäinen hoito', 'Sosiaalinen ympäristö', 'Harjoittelua', 'Valvottu ympäristö'],
  '5': ['Säännölliset kävelyt', 'Ammattitaitoinen hoito', 'Terveysseuranta', 'Yksilöllinen hoito'],
  '6': ['Turvallinen kuljetus', 'Ammattitaitoinen kuski', 'Mukava ympäristö', 'Ajantasainen kuljetus']
};

export const fixFeaturesInFirebase = async () => {
  try {
    console.log('🔧 Начинаем исправление поля features...\n');
    
    const servicesRef = collection(db, 'services');
    const snapshot = await getDocs(servicesRef);
    
    let fixed = 0;
    let errors = 0;
    
    for (const docSnap of snapshot.docs) {
      const id = docSnap.id;
      const data = docSnap.data();
      
      if (featuresData[id]) {
        try {
          await updateDoc(doc(db, 'services', id), {
            features: featuresData[id]
          });
          console.log(`✅ [${id}] Исправлен: ${data.name}`);
          fixed++;
        } catch (error: any) {
          console.error(`❌ [${id}] Ошибка при исправлении:`, error.message);
          errors++;
        }
      }
    }
    
    console.log('\n📊 Результаты:');
    console.log(`✅ Успешно исправлено: ${fixed}`);
    if (errors > 0) {
      console.log(`❌ Ошибок: ${errors}`);
    }
    console.log('🎉 Исправление завершено!');
    
    return { fixed, errors };
  } catch (error: any) {
    console.error('❌ Критическая ошибка:', error);
    throw error;
  }
};

// Экспорт для использования в консоли браузера
if (typeof window !== 'undefined') {
  (window as any).fixFeaturesInFirebase = fixFeaturesInFirebase;
}



