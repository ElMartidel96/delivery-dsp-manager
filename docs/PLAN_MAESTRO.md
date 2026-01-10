# PLAN MAESTRO: PLATAFORMA DE DELIVERY MANAGEMENT

> **Empresa:** AUTOS MALL LLC - DSP Asociado a UniUni
> **Última actualización:** 2026-01-08
> **Estado:** En desarrollo - Fase 1

---

## 1. RESUMEN EJECUTIVO

### Contexto del Proyecto
Plataforma de Delivery Service Partner (DSP) asociada a UniUni, compañía de logística last-mile que opera en 50+ centros de distribución en Norteamérica.

### Modelo de Negocio
```
UniUni (Cliente) → TU EMPRESA (DSP) → Conductores (ICD)
       ↓                  ↓                    ↓
Asigna paquetes    Gestiona flota      Ejecuta entregas
Paga por entrega   Paga a drivers      Foto/Firma POD
```

### Características Clave
| Aspecto | Detalle |
|---------|---------|
| Compensación | Pay-per-delivery, sin tope de ganancias |
| Tipo de paquetes | Pequeños y livianos únicamente |
| Vehículos | Propios o arrendados |
| Rango salarial DSP | $4,000 - $10,000 USD/mes |
| Tecnología requerida | Smartphones con GPS, escaneo, fotos |

---

## 2. ESFERAS DEL SISTEMA

### 2.1 Gestión de Usuarios y Roles
| Rol | Funcionalidades |
|-----|-----------------|
| Admin | Dashboard completo, reportes, pagos, configuración |
| Dispatcher | Asignación de rutas, monitoreo en tiempo real |
| Driver (ICD) | Ver entregas asignadas, subir POD, ver ganancias |
| Cliente Final | Tracking de paquete, feedback (opcional) |

### 2.2 Sistema de Entregas (Core)
```
CICLO DE VIDA DE ENTREGA:
1. PENDING    → Paquete asignado por UniUni
2. ASSIGNED   → Asignado a driver específico
3. PICKED_UP  → Driver recogió en warehouse
4. IN_TRANSIT → En camino con GPS tracking
5. ARRIVED    → Llegó a ubicación
6. DELIVERED  → POD capturado (foto + firma)
7. FAILED     → Entrega fallida (razón documentada)
8. RETURNED   → Devuelto a warehouse
```

### 2.3 Proof of Delivery (POD) - CRÍTICO
| Tipo | Uso | Implementación |
|------|-----|----------------|
| Foto | Contactless delivery | Cámara + geolocation |
| Firma electrónica | Entrega en mano | Canvas signature |
| Código QR/Barcode | Verificación de paquete | Scanner nativo |
| GPS Timestamp | Prueba de ubicación/hora | Automático |
| Notas del driver | Casos especiales | Campo de texto |

### 2.4 Tracking en Tiempo Real
- GPS Location (cada 30 segundos)
- Estado del vehículo/driver
- Estado de cada paquete
- ETA dinámico
- Notificaciones push
- Dashboard en tiempo real

### 2.5 Gestión de Conductores (ICD)
```
ONBOARDING:
├── Formulario W-9 (TIN/SSN)
├── Verificación de licencia de conducir
├── Verificación de seguro de vehículo
├── Background check
└── Contrato de servicios independientes

PAGOS:
├── Cálculo por entrega completada
├── Bonos por rendimiento
├── Deducciones (si aplican)
└── Generación 1099-NEC anual ($600+)

COMPLIANCE:
├── Retención de W-9 por 4 años
├── Filing deadline: 31 de enero
├── Multas: $60-$660 por form late
└── Clasificación correcta (ABC test en CA)
```

### 2.6 Gestión de Flota
- Registro de vehículos (placa, marca, modelo, año)
- Documentos (seguro, registro)
- Capacidad de carga
- Calendario de mantenimiento
- Alertas de vencimiento
- Registro de combustible

### 2.7 Comunicación y Notificaciones
| Canal | Uso | Tecnología |
|-------|-----|------------|
| Push notifications | Nuevas entregas, alertas | Firebase Cloud Messaging |
| SMS | Confirmaciones críticas | Twilio |
| Email | Reportes, documentos | Resend |
| In-app messages | Driver-dispatcher | Supabase Realtime |

### 2.8 Reportes y Analytics
```
MÉTRICAS OPERATIVAS:
├── Entregas completadas (diario/semanal/mensual)
├── Tasa de éxito de entregas
├── Tiempo promedio por entrega
├── Entregas por driver
└── Zonas con mayor demanda (heatmap)

MÉTRICAS FINANCIERAS:
├── Ingresos totales
├── Costo por entrega
├── Margen de ganancia
├── Pagos a drivers
└── Proyecciones

MÉTRICAS DE DRIVERS:
├── Performance individual
├── Ranking/leaderboard
├── Attendance rate
└── Customer ratings
```

---

## 3. SCHEMA DE BASE DE DATOS

### Tablas Necesarias

```sql
-- Entregas/Paquetes
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  uniuni_order_id VARCHAR(50),
  driver_id UUID REFERENCES drivers(id),
  status delivery_status NOT NULL DEFAULT 'pending',
  pickup_address JSONB NOT NULL,
  delivery_address JSONB NOT NULL,
  recipient_name VARCHAR(100),
  recipient_phone VARCHAR(20),
  package_size package_size_enum,
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

-- Proof of Delivery
CREATE TABLE delivery_pods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID REFERENCES deliveries(id) NOT NULL,
  photo_url TEXT,
  signature_url TEXT,
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  notes TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ
);

-- Conductores/Drivers
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
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

-- Vehículos
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES drivers(id),
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

-- Pagos a Drivers
CREATE TABLE driver_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES drivers(id) NOT NULL,
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

-- Tracking de ubicación en tiempo real
CREATE TABLE driver_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES drivers(id) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  accuracy_meters DECIMAL(6, 2),
  speed_kmh DECIMAL(5, 2),
  heading DECIMAL(5, 2),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rutas optimizadas
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES drivers(id),
  date DATE NOT NULL,
  optimized_order JSONB,
  total_distance_km DECIMAL(8, 2),
  estimated_duration_mins INTEGER,
  actual_duration_mins INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. ROADMAP DE DESARROLLO

### FASE 1: FUNDACIÓN (2-3 semanas) ← ACTUAL
- [x] Clonar/crear proyecto base
- [x] Configurar Next.js 15 + React 19
- [x] Sistema i18n bilingüe (EN/ES)
- [x] Landing page con Glass Morphism
- [x] Modo oscuro/claro
- [ ] Configurar Supabase (DB + Auth)
- [ ] Crear schema de base de datos
- [ ] Sistema de autenticación con roles
- [ ] Páginas de login/registro

### FASE 2: CORE DELIVERY SYSTEM (3-4 semanas)
- [ ] Modelo de datos de entregas
- [ ] DeliveryCard, DeliveryList components
- [ ] Sistema de estados de entrega
- [ ] Asignación de entregas a drivers
- [ ] Dashboard de dispatcher
- [ ] Vista "Mis Entregas" para drivers

### FASE 3: POD & TRACKING (2-3 semanas)
- [ ] Captura de fotos con geolocalización
- [ ] Canvas de firma electrónica
- [ ] Almacenamiento en Supabase Storage
- [ ] GPS tracking en tiempo real
- [ ] Mapa de entregas activas
- [ ] ETA dinámico

### FASE 4: DRIVER MANAGEMENT (2-3 semanas)
- [ ] Flujo de onboarding de drivers
- [ ] Verificación de documentos
- [ ] Gestión de vehículos
- [ ] Perfil de driver con métricas
- [ ] Leaderboard de drivers
- [ ] Sistema de ratings

### FASE 5: PAGOS & FINANCIERO (2-3 semanas)
- [ ] Cálculo de pagos por entrega
- [ ] Dashboard de ganancias
- [ ] Generación de statements
- [ ] Integración con Gusto/OnPay
- [ ] Reportes financieros
- [ ] Preparación de 1099s

### FASE 6: OPTIMIZACIÓN & MOBILE (2-3 semanas)
- [ ] Route optimization API
- [ ] PWA para drivers
- [ ] Push notifications
- [ ] SMS notifications
- [ ] Modo offline

### FASE 7: ANALYTICS & POLISH (1-2 semanas)
- [ ] Dashboard de analytics
- [ ] Reportes exportables
- [ ] Heatmaps de zonas
- [ ] Testing E2E
- [ ] Documentación

---

## 5. INTEGRACIONES REQUERIDAS

### Críticas (Fase 1-2)
| Servicio | Propósito | Estado |
|----------|-----------|--------|
| Supabase | DB + Auth + Storage + Realtime | Pendiente |
| Resend | Emails transaccionales | Configurado en package.json |

### Fase 3-4
| Servicio | Propósito | Estado |
|----------|-----------|--------|
| Firebase | Push notifications | Pendiente |
| Radar/Geoapify | Maps & Routing | Pendiente |
| Twilio | SMS | Pendiente |

### Fase 5+
| Servicio | Propósito | Estado |
|----------|-----------|--------|
| Gusto/OnPay | Payroll & 1099 | Pendiente |
| Checkr | Background checks | Pendiente |

---

## 6. COSTOS ESTIMADOS (Post-lanzamiento)

| Servicio | Costo/mes |
|----------|-----------|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Radar/Geoapify | $100-300 |
| Twilio (SMS) | $50-200 |
| Firebase | Gratis-$25 |
| Gusto/OnPay | $50-150 |
| **TOTAL** | **$245-720/mes** |

---

## 7. NOTAS IMPORTANTES

### Lo que NO aplica (del proyecto anterior DAO)
- Smart Contracts / Blockchain
- Thirdweb
- Crypto wallets
- Token economics

### Prioridades inmediatas
1. Configurar Supabase
2. Sistema de autenticación
3. Formularios de contacto/aplicación
4. Dashboard básico

---

## 8. REFERENCIAS

- [UniUni DSP Program](https://www.uniuni.com)
- [POD Guide - Upper](https://www.upperinc.com)
- [Route Optimization - Routific](https://www.routific.com)
- [1099 Compliance - Oforce](https://www.oforce.com)
- [Payroll - Gusto](https://www.gusto.com)
