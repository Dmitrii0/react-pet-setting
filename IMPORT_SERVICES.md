# 📥 Импорт услуг в Firebase Firestore

## 🚀 Способ 1: Автоматический импорт через сайт (САМЫЙ ПРОСТОЙ)

1. **Откройте сайт** `http://localhost:3000`
2. **Прокрутите вниз** до блока "🔥 Тест подключения Firebase"
3. **Проверьте статус:**
   - Если видите "Услуг в базе: 0 ⚠️ Коллекция services пуста!"
   - Нажмите кнопку **"📥 Импортировать услуги в Firestore"**
4. **Дождитесь завершения** - увидите сообщение об успехе
5. **Обновите страницу** - услуги должны загрузиться

✅ **Готово!** Коллекция `services` создана с 6 услугами.

---

## 🔧 Способ 2: Через консоль браузера

1. **Откройте сайт** `http://localhost:3000`
2. **Откройте консоль** (F12 → Console)
3. **Введите команду:**
   ```javascript
   importServicesToFirebase()
   ```
4. **Нажмите Enter** и дождитесь завершения
5. **Проверьте результат** в консоли

---

## 📋 Способ 3: Через Firebase Console (ручной)

Если автоматический импорт не работает:

1. **Откройте** [Firebase Console](https://console.firebase.google.com)
2. **Выберите проект** `we-pet-care`
3. **Перейдите** в **Firestore Database**
4. **Создайте коллекцию** `services`
5. **Добавьте 6 документов** с ID: `1`, `2`, `3`, `4`, `5`, `6`

### Данные для каждого документа:

**Документ 1 (ID: "1"):**
```json
{
  "name": "Kotikäynnit",
  "description": "Hoivaa lemmikillesi kotoa käsin. Mukavaa ja stressitöntä hoivaa tutussa ympäristössä.",
  "price": 35,
  "duration": 60,
  "category": "home_visit",
  "features": ["Lääkärintarkastus kotona", "Rokotukset kotona", "Hoidot kotona", "Yksilöllinen hoito"],
  "icon": "ri-home-heart-line",
  "isActive": true,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

**Документ 2 (ID: "2"):**
```json
{
  "name": "Lemmikkien Hoitola",
  "description": "Moderni hoitola täydellä varustuksella kaikille lemmikkien hoitotarpeille.",
  "price": 25,
  "duration": 120,
  "category": "clinic",
  "features": ["Päivittäinen hoito", "Lääkärintarkastukset", "Hoidot ja toimenpiteet", "Valvottu ympäristö"],
  "icon": "ri-hospital-line",
  "isActive": true,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

**Документ 3 (ID: "3"):**
```json
{
  "name": "Yöhoito Omassa Kodissasi",
  "description": "Yöpäivystyspalvelu lemmikillesi kotona. Rauhallinen yöhoito tutussa ympäristössä.",
  "price": 50,
  "duration": 480,
  "category": "overnight",
  "features": ["Yöpäivystys kotona", "Valvonta ja hoito", "Hätätilanteet", "Rauhallinen yö"],
  "icon": "ri-moon-line",
  "isActive": true,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

**Документ 4 (ID: "4"):**
```json
{
  "name": "Koirapäiväkoti Tuntivelvollisuudella",
  "description": "Sosiaalinen päiväkoti koirille. Leikkimistä, harjoittelua ja seurustelua.",
  "price": 15,
  "duration": 480,
  "category": "daycare",
  "features": ["Päivittäinen hoito", "Sosiaalinen ympäristö", "Harjoittelua", "Valvottu ympäristö"],
  "icon": "ri-calendar-check-line",
  "isActive": true,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

**Документ 5 (ID: "5"):**
```json
{
  "name": "Koiran Ulkoilutus",
  "description": "Ammattitaitoinen ulkoilutus palvelu koirillesi. Säännölliset kävelyt päivittäin.",
  "price": 12,
  "duration": 30,
  "category": "walking",
  "features": ["Säännölliset kävelyt", "Ammattitaitoinen hoito", "Terveysseuranta", "Yksilöllinen hoito"],
  "icon": "ri-walk-line",
  "isActive": true,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

**Документ 6 (ID: "6"):**
```json
{
  "name": "Lemmikkitaksi",
  "description": "Turvallinen ja mukava kuljetuspalvelu lemmikillesi. Ammattitaitoinen kuski.",
  "price": 20,
  "duration": 60,
  "category": "transport",
  "features": ["Turvallinen kuljetus", "Ammattitaitoinen kuski", "Mukava ympäristö", "Ajantasainen kuljetus"],
  "icon": "ri-car-line",
  "isActive": true,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

---

## ✅ Проверка после импорта

1. **Откройте** [Firebase Console](https://console.firebase.google.com)
2. **Перейдите** в Firestore Database
3. **Проверьте коллекцию** `services`
4. **Должно быть 6 документов** с ID от 1 до 6

Или на сайте:
- Обновите страницу `/services`
- Должны увидеть 6 услуг, загруженных из Firebase

---

## 🐛 Возможные проблемы

### Ошибка: "Missing or insufficient permissions"
**Решение:** Настройте правила безопасности Firestore:
```javascript
match /services/{serviceId} {
  allow read: if true;
  allow write: if true; // Временно для импорта, потом ограничить
}
```

### Ошибка: "Collection not found"
**Решение:** Коллекция создастся автоматически при первом импорте

### Услуги не загружаются на сайте
**Решение:**
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что коллекция `services` существует в Firebase
3. Проверьте правила безопасности Firestore

---

**Рекомендуется использовать Способ 1 (автоматический импорт через сайт) - самый простой!** 🚀



