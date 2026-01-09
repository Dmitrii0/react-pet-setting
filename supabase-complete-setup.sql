-- ============================================
-- 0. Удаляем старые таблицы (если существуют)
-- ============================================

DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- ============================================
-- 1. Создание таблицы services
-- ============================================

CREATE TABLE services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'home_visit', 'clinic', 'overnight', 'daycare', 'walking', 'transport'
  )),
  features TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. Создание таблицы bookings
-- ============================================

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  service_id TEXT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,

  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,

  pet_name TEXT NOT NULL,
  pet_type TEXT NOT NULL,

  date DATE NOT NULL,
  time TIME NOT NULL,

  start_date DATE,
  end_date DATE,

  message TEXT,

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. Индексы
-- ============================================

CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);

-- ============================================
-- 4. Функция updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. Триггеры
-- ============================================

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. Начальные данные услуг
-- ============================================

INSERT INTO services (id, name, description, price, duration, category, features, icon, is_active) VALUES
('1', 'Kotikäynnit', 'Hoivaa lemmikillesi kotoa käsin.', 35, 60, 'home_visit', ARRAY['Kotikäynti', 'Lääkärintarkastus kotona'], 'ri-home-heart-line', true),
('2', 'Lemmikkien Hoitola', 'Moderni hoitola täydellä varustuksella.', 25, 120, 'clinic', ARRAY['Päivittäinen hoito', 'Valvonta'], 'ri-hospital-line', true),
('3', 'Yöhoito Omassa Kodissasi', 'Yöpäivystyspalvelu lemmikillesi kotona.', 50, 480, 'overnight', ARRAY['Valvonta', 'Rauhallinen yö'], 'ri-moon-line', true),
('4', 'Koirapäiväkoti', 'Sosiaalinen päivähoito koirille.', 15, 480, 'daycare', ARRAY['Leikki', 'Valvonta'], 'ri-calendar-line', true),
('5', 'Koiran Ulkoilutus', 'Ammattitaitoinen ulkoilutuspalvelu.', 12, 30, 'walking', ARRAY['Lenkit', 'Harjoittelu'], 'ri-walk-line', true),
('6', 'Lemmikkitaksi', 'Turvallinen kuljetus lemmikeille.', 20, 45, 'transport', ARRAY['Kuljetus', 'Joustava aikataulu'], 'ri-car-line', true);

-- ============================================
-- 7. Отключение RLS (для разработки)
-- ============================================

ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- ============================================
-- Готово!
-- ============================================







