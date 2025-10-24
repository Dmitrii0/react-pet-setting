# 🐾 We Pet Care - React Application

Modern React application for pet care services in Helsinki, Espoo and Vantaa.

## 🚀 Demo

**Live Demo:** [https://react-pet-setting.vercel.app](https://react-pet-setting.vercel.app)

## 📱 Features

### ✅ Implemented
- **🏠 Home page** with hero section and service previews
- **📋 Service catalog** with 6 different services
- **📅 Booking form** with date selection and automatic price calculation
- **ℹ️ About us** with information about founders
- **📱 Responsive design** for all devices
- **🔄 Redux state** for data management
- **🎨 Modern UI/UX** with animations

### 🎯 Services
1. **🏠 Home Visits** - 35€/day (Kotikäynnit)
2. **🏥 Pet Clinic** - 25€/day (Lemmikkien Hoitola)
3. **🌙 Overnight Care** - 50€/day (Yöhoito)
4. **📅 Dog Daycare** - 15€/day (Koirapäiväkoti)
5. **🚶 Dog Walking** - 12€/day (Koiran Ulkoilutus)
6. **🚗 Pet Taxi** - 20€/day (Lemmikkitaksi)

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Redux Toolkit** for state management
- **Styled Components** for styling
- **React Router** for navigation
- **Firebase** for database
- **Axios** for HTTP requests
- **Remix Icons** for icons

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/Dmitrii0/react-pet-setting.git

# Navigate to project folder
cd react-pet-setting

# Install dependencies
npm install

# Start the application
npm start
```

### Production Build
```bash
# Create production build
npm run build

# Run locally
npm install -g serve
serve -s build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header/         # Navigation bar
│   └── Footer/         # Footer
├── pages/              # Application pages
│   ├── HomePage.tsx    # Home page
│   ├── ServicesPage.tsx # Service catalog
│   ├── BookingPage.tsx # Booking form
│   └── AboutPage.tsx   # About us
├── store/              # Redux store
│   ├── index.ts        # Store configuration
│   └── slices/         # Redux slices
│       ├── servicesSlice.ts
│       └── bookingsSlice.ts
├── lib/                # Firebase configuration
└── styles/             # Global styles
```

## 🎨 Design

### Color Scheme
- **Main gradient:** #667eea → #764ba2
- **Accent color:** #ffd700 (gold)
- **Text:** #333 (dark gray)
- **Background:** White with gradient accents

### Features
- **Responsive design** (320px - 1200px+)
- **Smooth animations** and transitions
- **Hover effects** on interactive elements
- **Emoji icons** for clarity
- **Modern cards** with shadows

## 🔧 Main Features

### Booking Form
- **Service selection** from catalog
- **Date range selection** (start and end dates)
- **Automatic price calculation** based on duration
- **Form validation** for all fields
- **Firebase integration** for data persistence

### Redux Store
- **servicesSlice** - service management
- **bookingsSlice** - booking management
- **TypeScript interfaces** for type safety

## 🌐 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Automatic deployment on push
3. Get URL: https://react-pet-setting.vercel.app

### Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set folder: `build`

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 📊 Performance

- **Bundle size:** ~96KB (gzipped)
- **Load time:** < 2 seconds
- **Lighthouse Score:** 90+ (Performance)
- **Mobile optimization:** ✅

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test -- --coverage
```

## 📝 Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

**Developed with ❤️ for pet lovers**

---

# 🐾 We Pet Care - React-sovellus

Moderni React-sovellus lemmikkien hoitopalveluille Helsingissä, Espoossa ja Vantaalla.

## 🚀 Demo

**Live Demo:** [https://react-pet-setting.vercel.app](https://react-pet-setting.vercel.app)

## 📱 Ominaisuudet

### ✅ Toteutettu
- **🏠 Etusivu** hero-osio ja palvelu-esikatselut
- **📋 Palvelukatalogi** 6 eri palvelulla
- **📅 Varaustilaus** päivämäärävalinnalla ja automaattisella hinnanlaskennalla
- **ℹ️ Tietoa meistä** perustajista
- **📱 Responsiivinen suunnittelu** kaikille laitteille
- **🔄 Redux-tila** datan hallintaan
- **🎨 Moderni UI/UX** animaatioilla

### 🎯 Palvelut
1. **🏠 Kotikäynnit** - 35€/päivä
2. **🏥 Lemmikkien Hoitola** - 25€/päivä
3. **🌙 Yöhoito** - 50€/päivä
4. **📅 Koirapäiväkoti** - 15€/päivä
5. **🚶 Koiran Ulkoilutus** - 12€/päivä
6. **🚗 Lemmikkitaksi** - 20€/päivä

## 🛠 Teknologiapino

- **React 18** + **TypeScript**
- **Redux Toolkit** tilan hallintaan
- **Styled Components** tyylittelyyn
- **React Router** navigointiin
- **Firebase** tietokantaan
- **Axios** HTTP-pyyntöihin
- **Remix Icons** kuvakkeisiin

## 🚀 Pikakäynnistys

### Asennus
```bash
# Kloonaa repositorio
git clone https://github.com/Dmitrii0/react-pet-setting.git

# Siirry projektikansioon
cd react-pet-setting

# Asenna riippuvuudet
npm install

# Käynnistä sovellus
npm start
```

### Tuotantoversio
```bash
# Luo tuotantoversio
npm run build

# Käynnistä paikallisesti
npm install -g serve
serve -s build
```

## 📁 Projektirakenne

```
src/
├── components/          # Uudelleenkäytettävät komponentit
│   ├── Header/         # Navigointipalkki
│   └── Footer/         # Alatunniste
├── pages/              # Sovelluksen sivut
│   ├── HomePage.tsx    # Etusivu
│   ├── ServicesPage.tsx # Palvelukatalogi
│   ├── BookingPage.tsx # Varaustilaus
│   └── AboutPage.tsx   # Tietoa meistä
├── store/              # Redux store
│   ├── index.ts        # Store-konfiguraatio
│   └── slices/         # Redux slicet
│       ├── servicesSlice.ts
│       └── bookingsSlice.ts
├── lib/                # Firebase-konfiguraatio
└── styles/             # Globaalit tyylit
```

## 🎨 Suunnittelu

### Väriskeema
- **Päägradientti:** #667eea → #764ba2
- **Korostusväri:** #ffd700 (kulta)
- **Teksti:** #333 (tummanharmaa)
- **Tausta:** Valkoinen gradienttien kanssa

### Ominaisuudet
- **Responsiivinen suunnittelu** (320px - 1200px+)
- **Sujuvat animaatiot** ja siirtymät
- **Hover-efektit** interaktiivisissa elementeissä
- **Emoji-kuvakkeet** selkeyttä varten
- **Modernit kortit** varjoilla

## 🔧 Pääominaisuudet

### Varaustilaus
- **Palvelun valinta** katalogista
- **Päivämäärävalinta** (alku- ja loppupäivä)
- **Automaattinen hinnanlaskenta** keston perusteella
- **Lomakkeen validointi** kaikille kentille
- **Firebase-integraatio** datan tallentamiseen

### Redux Store
- **servicesSlice** - palvelujen hallinta
- **bookingsSlice** - varausten hallinta
- **TypeScript-rajapinnat** tyyppiturvallisuudelle

## 🌐 Julkaisu

### Vercel (Suositeltu)
1. Yhdistä repositorio Verceliin
2. Automaattinen julkaisu push:lla
3. Hanki URL: https://react-pet-setting.vercel.app

### Netlify
1. Yhdistä GitHub-repositorio
2. Aseta build-komento: `npm run build`
3. Aseta kansio: `build`

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 📊 Suorituskyky

- **Bundle-koko:** ~96KB (gzipped)
- **Latausaika:** < 2 sekuntia
- **Lighthouse-pisteet:** 90+ (Suorituskyky)
- **Mobiilioptimointi:** ✅

## 🧪 Testaus

```bash
# Suorita testit
npm test

# Suorita testit kattavuudella
npm run test -- --coverage
```

## 📝 Skriptit

```bash
npm start          # Käynnistä kehityspalvelin
npm run build      # Rakenna tuotantoversio
npm test           # Suorita testit
npm run eject      # Poista konfiguraatio
```

## 🤝 Osallistuminen

1. Forkkaa repositorio
2. Luo ominaisuus-haara (`git checkout -b feature/AmazingFeature`)
3. Commitoi muutokset (`git commit -m 'Add some AmazingFeature'`)
4. Puske haaraan (`git push origin feature/AmazingFeature`)
5. Avaa Pull Request

## 📄 Lisenssi

Tämä projekti on lisensoitu MIT-lisenssillä. Katso `LICENSE`-tiedosto lisätietoja varten.

---

**Kehitetty ❤️:lla lemmikkien ystäville**

---

# 🐾 We Pet Care - React приложение

Современное React приложение для сервиса ухода за домашними животными в Хельсинки, Эспоо и Вантаа.

## 🚀 Demo

**Live Demo:** [https://react-pet-setting.vercel.app](https://react-pet-setting.vercel.app)

## 📱 Functionality

### ✅ Implemented (English)
- **🏠 Home page with hero section and service previews
- **📋 Services catalog with 6 different services
- **📅 Booking form with date selection and automatic price calculation
- **ℹ️ About us with information about the founders
- **📱 Responsive design for all devices
- **🔄 Redux state for data management
- **🎨 Modern UI/UX with animations
### ✅ Реализовано
- **🏠 Главная страница** с hero секцией и превью услуг
- **📋 Каталог услуг** с 6 различными сервисами
- **📅 Форма бронирования** с выбором дат и автоматическим расчетом цены
- **ℹ️ О компании** с информацией о основателях
- **📱 Адаптивный дизайн** для всех устройств
- **🔄 Redux состояние** для управления данными
- **🎨 Современный UI/UX** с анимациями

### 🎯 Услуги
1. **🏠 Kotikäynnit** - 35€/день (Домашние визиты)
2. **🏥 Lemmikkien Hoitola** - 25€/день (Ветеринарная клиника)
3. **🌙 Yöhoito** - 50€/день (Ночной уход)
4. **📅 Koirapäiväkoti** - 15€/день (Дневной сад для собак)
5. **🚶 Koiran Ulkoilutus** - 12€/день (Выгул собак)
6. **🚗 Lemmikkitaksi** - 20€/день (Транспорт для питомцев)

## 🛠 Технологический стек

- **React 18** + **TypeScript**
- **Redux Toolkit** для управления состоянием
- **Styled Components** для стилизации
- **React Router** для навигации
- **Firebase** для базы данных
- **Axios** для HTTP запросов
- **Remix Icons** для иконок

## 🚀 Быстрый старт

### Установка
```bash
# Клонируйте репозиторий
git clone https://github.com/Dmitrii0/react-pet-setting.git

# Перейдите в папку проекта
cd react-pet-setting

# Установите зависимости
npm install

# Запустите приложение
npm start
```

### Сборка для продакшена
```bash
# Создайте production сборку
npm run build

# Запустите локально
npm install -g serve
serve -s build
```

## 📁 Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── Header/         # Навигационная панель
│   └── Footer/         # Подвал сайта
├── pages/              # Страницы приложения
│   ├── HomePage.tsx    # Главная страница
│   ├── ServicesPage.tsx # Каталог услуг
│   ├── BookingPage.tsx # Форма бронирования
│   └── AboutPage.tsx   # О компании
├── store/              # Redux store
│   ├── index.ts        # Конфигурация store
│   └── slices/         # Redux slices
│       ├── servicesSlice.ts
│       └── bookingsSlice.ts
├── lib/                # Firebase конфигурация
└── styles/             # Глобальные стили
```

## 🎨 Дизайн

### Цветовая схема
- **Основной градиент:** #667eea → #764ba2
- **Акцентный цвет:** #ffd700 (золотой)
- **Текст:** #333 (темно-серый)
- **Фон:** Белый с градиентными акцентами

### Особенности
- **Адаптивный дизайн** (320px - 1200px+)
- **Плавные анимации** и переходы
- **Hover эффекты** на интерактивных элементах
- **Emoji иконки** для наглядности
- **Современные карточки** с тенями

## 🔧 Основные функции

### Форма бронирования
- **Выбор услуги** из каталога
- **Выбор дат** начала и окончания
- **Автоматический расчет** стоимости
- **Валидация** всех полей
- **Сохранение** в Firebase

### Redux Store
- **servicesSlice** - управление услугами
- **bookingsSlice** - управление бронированиями
- **Типизированные** интерфейсы

## 🌐 Деплой

### Vercel (Рекомендуется)
1. Подключите репозиторий к Vercel
2. Автоматический деплой при push
3. Получите URL: https://react-pet-setting.vercel.app

### Netlify
1. Подключите GitHub репозиторий
2. Настройте build команду: `npm run build`
3. Укажите папку: `build`

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 📊 Производительность

- **Bundle размер:** ~96KB (gzipped)
- **Время загрузки:** < 2 секунд
- **Lighthouse Score:** 90+ (Performance)
- **Мобильная оптимизация:** ✅

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Запуск тестов с покрытием
npm run test -- --coverage
```

## 📝 Скрипты

```bash
npm start          # Запуск в режиме разработки
npm run build      # Сборка для продакшена
npm test           # Запуск тестов
npm run eject      # Извлечение конфигурации
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для получения дополнительной информации.

---

**Разработано с ❤️ для любителей домашних животных**

*Rakastamme lemmikejä niin kuin sinäkin :)*