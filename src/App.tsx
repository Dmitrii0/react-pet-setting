import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Instagram from './components/Instagram/Instagram';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import BookingsManagementPage from './pages/BookingsManagementPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bookings-management" element={<BookingsManagementPage />} />
      </Routes>
      <Instagram />
      <Footer />
    </div>
  );
}

export default App;
