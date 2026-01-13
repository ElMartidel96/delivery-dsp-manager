-- ============================================
-- AUTOS MALL LLC - DELIVERY DSP MANAGER
-- Schema inicial de base de datos
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS (Tipos personalizados)
-- ============================================

CREATE TYPE user_role AS ENUM ('admin', 'dispatcher', 'driver', 'customer');
CREATE TYPE driver_status AS ENUM ('pending_verification', 'active', 'inactive', 'suspended');
CREATE TYPE delivery_status AS ENUM ('pending', 'assigned', 'picked_up', 'in_transit', 'arrived', 'delivered', 'failed', 'returned');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE package_size AS ENUM ('small', 'medium', 'large', 'extra_large');

-- ============================================
-- TABLA: profiles (Perfiles de usuario)
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  phone VARCHAR(20),
  role user_role DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security) para profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- TABLA: drivers (Conductores)
-- ============================================

CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  license_number VARCHAR(50),
  license_expiry DATE,
  license_photo_url TEXT,
  status driver_status DEFAULT 'pending_verification',
  w9_submitted BOOLEAN DEFAULT FALSE,
  w9_submitted_at TIMESTAMPTZ,
  background_check_passed BOOLEAN,
  onboarding_completed_at TIMESTAMPTZ,
  rating DECIMAL(3, 2) DEFAULT 5.00,
  total_deliveries INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can view own data"
  ON drivers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Drivers can update own data"
  ON drivers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all drivers"
  ON drivers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role IN ('admin', 'dispatcher')
    )
  );

-- ============================================
-- TABLA: vehicles (Vehículos)
-- ============================================

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  plate_number VARCHAR(20) NOT NULL,
  make VARCHAR(50),
  model VARCHAR(50),
  year INTEGER,
  color VARCHAR(30),
  capacity_cubic_ft DECIMAL(6, 2),
  insurance_policy VARCHAR(50),
  insurance_expiry DATE,
  registration_expiry DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can view own vehicles"
  ON vehicles FOR SELECT
  USING (
    driver_id IN (
      SELECT id FROM drivers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all vehicles"
  ON vehicles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role IN ('admin', 'dispatcher')
    )
  );

-- ============================================
-- TABLA: deliveries (Entregas)
-- ============================================

CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  uniuni_order_id VARCHAR(50),
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  status delivery_status DEFAULT 'pending',
  pickup_address JSONB NOT NULL,
  delivery_address JSONB NOT NULL,
  recipient_name VARCHAR(100),
  recipient_phone VARCHAR(20),
  package_size package_size,
  special_instructions TEXT,
  scheduled_date DATE,
  time_window_start TIME,
  time_window_end TIME,
  assigned_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER deliveries_updated_at
  BEFORE UPDATE ON deliveries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can view assigned deliveries"
  ON deliveries FOR SELECT
  USING (
    driver_id IN (
      SELECT id FROM drivers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Drivers can update assigned deliveries"
  ON deliveries FOR UPDATE
  USING (
    driver_id IN (
      SELECT id FROM drivers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all deliveries"
  ON deliveries FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role IN ('admin', 'dispatcher')
    )
  );

-- Índices para deliveries
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_driver_id ON deliveries(driver_id);
CREATE INDEX idx_deliveries_scheduled_date ON deliveries(scheduled_date);

-- ============================================
-- TABLA: delivery_pods (Proof of Delivery)
-- ============================================

CREATE TABLE delivery_pods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  delivery_id UUID REFERENCES deliveries(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT,
  signature_url TEXT,
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  notes TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ
);

ALTER TABLE delivery_pods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can create POD for their deliveries"
  ON delivery_pods FOR INSERT
  WITH CHECK (
    delivery_id IN (
      SELECT d.id FROM deliveries d
      JOIN drivers dr ON d.driver_id = dr.id
      WHERE dr.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view PODs"
  ON delivery_pods FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage PODs"
  ON delivery_pods FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role IN ('admin', 'dispatcher')
    )
  );

-- ============================================
-- TABLA: driver_payments (Pagos a conductores)
-- ============================================

CREATE TABLE driver_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_deliveries INTEGER,
  base_pay DECIMAL(10, 2),
  bonuses DECIMAL(10, 2) DEFAULT 0,
  deductions DECIMAL(10, 2) DEFAULT 0,
  net_pay DECIMAL(10, 2),
  status payment_status DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE driver_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can view own payments"
  ON driver_payments FOR SELECT
  USING (
    driver_id IN (
      SELECT id FROM drivers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payments"
  ON driver_payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- TABLA: driver_locations (Ubicaciones en tiempo real)
-- ============================================

CREATE TABLE driver_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  accuracy_meters DECIMAL(6, 2),
  speed_kmh DECIMAL(5, 2),
  heading DECIMAL(5, 2),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can insert own location"
  ON driver_locations FOR INSERT
  WITH CHECK (
    driver_id IN (
      SELECT id FROM drivers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all locations"
  ON driver_locations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role IN ('admin', 'dispatcher')
    )
  );

-- Índice para consultas de ubicación reciente
CREATE INDEX idx_driver_locations_recent ON driver_locations(driver_id, recorded_at DESC);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Nota: Ejecutar esto en el SQL Editor de Supabase o crear manualmente

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES
--   ('avatars', 'avatars', true),
--   ('documents', 'documents', false),
--   ('pod-photos', 'pod-photos', false),
--   ('signatures', 'signatures', false);
