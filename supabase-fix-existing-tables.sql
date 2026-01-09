-- ============================================
-- Исправление существующих таблиц
-- ============================================
-- Используйте этот скрипт, если таблицы уже созданы, но без нужных колонок

-- 1. Проверка и добавление колонки status в bookings (если её нет)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'status'
  ) THEN
    ALTER TABLE bookings ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';
    ALTER TABLE bookings ADD CONSTRAINT bookings_status_check 
      CHECK (status IN ('pending', 'confirmed', 'cancelled'));
  END IF;
END $$;

-- 2. Проверка и добавление других колонок в bookings (если их нет)
DO $$ 
BEGIN
  -- start_date
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE bookings ADD COLUMN start_date DATE;
  END IF;
  
  -- end_date
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE bookings ADD COLUMN end_date DATE;
  END IF;
  
  -- message
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'message'
  ) THEN
    ALTER TABLE bookings ADD COLUMN message TEXT;
  END IF;
  
  -- updated_at
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE bookings ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- 3. Проверка и добавление колонок в services (если их нет)
DO $$ 
BEGIN
  -- features
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'services' AND column_name = 'features'
  ) THEN
    ALTER TABLE services ADD COLUMN features TEXT[] NOT NULL DEFAULT '{}';
  END IF;
  
  -- is_active
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'services' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE services ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
  END IF;
  
  -- updated_at
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'services' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE services ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- 4. Создание индексов (если их нет)
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);

-- 5. Создание функции для updated_at (если её нет)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Создание триггеров (удаляем старые и создаем новые)
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Отключение RLS для разработки
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- ============================================
-- Готово! Таблицы исправлены.
-- ============================================








