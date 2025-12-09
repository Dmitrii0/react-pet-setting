# 🔧 Настройка переменных окружения

## 📝 Создание .env файла

Создайте файл `.env` в папке `petcare-react/` со следующим содержимым:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyA7MAPVPDPqWdSpRAnVlTPhafFixS5hyO8
REACT_APP_FIREBASE_AUTH_DOMAIN=we-pet-care.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://we-pet-care-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=we-pet-care
REACT_APP_FIREBASE_STORAGE_BUCKET=we-pet-care.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=336461793459
REACT_APP_FIREBASE_APP_ID=1:336461793459:web:e1242e1d2381bc152788c6
REACT_APP_FIREBASE_MEASUREMENT_ID=G-CKPC7X96KF

# Stripe Configuration (для будущего использования)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51SPle2Rr1e0CSJbDFjjyz7UaJUP4VG2Iq2o9kkxtWm0rTZ30joYLvyM4czn7lwUhz17b4dSxMXdsHXjWxpFK5X3800grZd8JdP
```

## ⚠️ Важно

1. **Файл `.env` уже добавлен в `.gitignore`** - он не будет закоммичен в репозиторий
2. **После создания `.env` файла перезапустите dev сервер** (`npm start`)
3. **Для Vercel деплоя** добавьте эти переменные в настройках проекта на Vercel

## 🚀 Для Vercel деплоя

1. Откройте проект на [Vercel](https://vercel.com)
2. Перейдите в Settings → Environment Variables
3. Добавьте все переменные из `.env` файла
4. Передеплойте проект

## ✅ Проверка

После настройки проверьте:
- [ ] Firebase подключается без ошибок
- [ ] Данные загружаются из Firestore
- [ ] Google Analytics работает (если настроен)



