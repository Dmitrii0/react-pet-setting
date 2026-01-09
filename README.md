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






**Разработано с ❤️ для любителей домашних животных**

*Rakastamme lemmikejä niin kuin sinäkin :)*
