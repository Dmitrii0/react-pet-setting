# 🔧 Исправление поля features в Firestore

## ⚠️ Проблема

Поле `features` сохранено как **строка** вместо **массива**. Нужно исправить.

## ✅ Решение

### Способ 1: Исправить через Firebase Console (быстро)

1. Откройте [Firebase Console](https://console.firebase.google.com)
2. Перейдите в **Firestore Database** → коллекция `services`
3. Откройте каждый документ (1, 2, 3, 4, 5, 6)
4. Найдите поле `features`
5. **Удалите** поле `features` (кнопка "Delete field")
6. **Добавьте новое поле** `features`:
   - Тип: **Array**
   - Добавьте элементы массива:
     - Для документа 1: `"Lääkärintarkastus kotona"`, `"Rokotukset kotona"`, `"Hoidot kotona"`, `"Yksilöllinen hoito"`
     - Для документа 2: `"Päivittäinen hoito"`, `"Lääkärintarkastukset"`, `"Hoidot ja toimenpiteet"`, `"Valvottu ympäristö"`
     - И так далее для всех 6 документов

### Способ 2: Использовать функцию исправления на сайте

Откройте консоль браузера (F12) и выполните:

```javascript
// Функция для исправления features
async function fixFeatures() {
  const { db } = await import('./lib/firebase');
  const { collection, doc, getDocs, updateDoc } = await import('firebase/firestore');
  
  const servicesRef = collection(db, 'services');
  const snapshot = await getDocs(servicesRef);
  
  const featuresData = {
    '1': ["Lääkärintarkastus kotona", "Rokotukset kotona", "Hoidot kotona", "Yksilöllinen hoito"],
    '2': ["Päivittäinen hoito", "Lääkärintarkastukset", "Hoidot ja toimenpiteet", "Valvottu ympäristö"],
    '3': ["Yöpäivystys kotona", "Valvonta ja hoito", "Hätätilanteet", "Rauhallinen yö"],
    '4': ["Päivittäinen hoito", "Sosiaalinen ympäristö", "Harjoittelua", "Valvottu ympäristö"],
    '5': ["Säännölliset kävelyt", "Ammattitaitoinen hoito", "Terveysseuranta", "Yksilöllinen hoito"],
    '6': ["Turvallinen kuljetus", "Ammattitaitoinen kuski", "Mukava ympäristö", "Ajantasainen kuljetus"]
  };
  
  for (const docSnap of snapshot.docs) {
    const id = docSnap.id;
    if (featuresData[id]) {
      await updateDoc(doc(db, 'services', id), {
        features: featuresData[id]
      });
      console.log(`✅ Исправлен документ ${id}`);
    }
  }
  
  console.log('🎉 Все features исправлены!');
}

fixFeatures();
```

### Способ 3: Удалить и пересоздать через автоматический импорт

1. Удалите коллекцию `services` в Firebase Console
2. Используйте кнопку "📥 Импортировать услуги в Firestore" на сайте
3. Все данные создадутся правильно с массивом features

---

## 📋 Правильные данные для features (массив):

**Документ 1:**
```json
["Lääkärintarkastus kotona", "Rokotukset kotona", "Hoidot kotona", "Yksilöllinen hoito"]
```

**Документ 2:**
```json
["Päivittäinen hoito", "Lääkärintarkastukset", "Hoidot ja toimenpiteet", "Valvottu ympäristö"]
```

**Документ 3:**
```json
["Yöpäivystys kotona", "Valvonta ja hoito", "Hätätilanteet", "Rauhallinen yö"]
```

**Документ 4:**
```json
["Päivittäinen hoito", "Sosiaalinen ympäristö", "Harjoittelua", "Valvottu ympäristö"]
```

**Документ 5:**
```json
["Säännölliset kävelyt", "Ammattitaitoinen hoito", "Terveysseuranta", "Yksilöllinen hoito"]
```

**Документ 6:**
```json
["Turvallinen kuljetus", "Ammattitaitoinen kuski", "Mukava ympäristö", "Ajantasainen kuljetus"]
```

---

**Рекомендую Способ 3** - самый простой и надежный! 🚀



