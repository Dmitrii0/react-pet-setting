-- ============================================
-- Supabase Database Setup Script
-- ============================================
-- Выполните этот скрипт в Supabase Dashboard → SQL Editor

-- 1. Создание таблицы bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id TEXT NOT NULL,
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
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- 2. Создание таблицы services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('home_visit', 'clinic', 'overnight', 'daycare', 'walking', 'transport')),
  features TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);

-- 4. Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. Вставка начальных данных услуг
INSERT INTO services (id, name, description, price, duration, category, features, icon, is_active) VALUES
('1', 'Kotikäynnit', 'Hoivaa lemmikillesi kotoa käsin. Mukavaa ja stressitöntä hoivaa tutussa ympäristössä.', 35, 60, 'home_visit', ARRAY['Lääkärintarkastus kotona', 'Rokotukset kotona', 'Hoidot kotona', 'Yksilöllinen hoito'], 'ri-home-heart-line', true),
('2', 'Lemmikkien Hoitola', 'Moderni hoitola täydellä varustuksella kaikille lemmikkien hoitotarpeille.', 25, 120, 'clinic', ARRAY['Päivittäinen hoito', 'Lääkärintarkastukset', 'Hoidot ja toimenpiteet', 'Valvottu ympäristö'], 'ri-hospital-line', true),
('3', 'Yöhoito Omassa Kodissasi', 'Yöpäivystyspalvelu lemmikillesi kotona. Rauhallinen yöhoito tutussa ympäristössä.', 50, 480, 'overnight', ARRAY['Yöpäivystys kotona', 'Valvonta ja hoito', 'Hätätilanteet', 'Rauhallinen yö'], 'ri-moon-line', true),
('4', 'Koirapäiväkoti Tuntivelvollisuudella', 'Koirapäiväkoti, jossa koirasi voi viettää päivänsä muiden koirien kanssa.', 15, 480, 'daycare', ARRAY['Päivähoito koirille', 'Sosiaalinen leikki', 'Valvottu toiminta', 'Joustava aikataulu'], 'ri-calendar-line', true),
('5', 'Koiran Ulkoilutus', 'Ammattitaitoista ulkoilutuspalvelua koirillesi. Säännölliset lenkit ja liikunta.', 12, 30, 'walking', ARRAY['Säännölliset lenkit', 'Liikunta ja harjoittelu', 'Turvallinen ulkoilu', 'Henkilökohtainen palvelu'], 'ri-walk-line', true),
('6', 'Lemmikkitaksi', 'Turvallinen kuljetuspalvelu lemmikeillesi. Kuljetamme lemmikkejä turvallisesti.', 20, 45, 'transport', ARRAY['Turvallinen kuljetus', 'Mukava matka', 'Joustava aikataulu', 'Erityisvarusteet'], 'ri-car-line', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category = EXCLUDED.category,
  features = EXCLUDED.features,
  icon = EXCLUDED.icon,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 7. ВАЖНО: Настройка Row Level Security (RLS)
-- Для разработки можно временно отключить RLS:
-- ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- Для продакшена рекомендуется настроить политики:
-- CREATE POLICY "Allow public read access to services" ON services FOR SELECT USING (is_active = true);
-- CREATE POLICY "Allow public insert to bookings" ON bookings FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow admin read access to bookings" ON bookings FOR SELECT USING (true);
-- CREATE POLICY "Allow admin update bookings" ON bookings FOR UPDATE USING (true);
-- CREATE POLICY "Allow admin delete bookings" ON bookings FOR DELETE USING (true);

-- ============================================
-- Готово! Теперь ваша база данных настроена.
-- ============================================








