# INTEGRACIONES - Estado Actual

> Última actualización: 2026-01-08

## Estado de Conexión

### CONECTADAS
| Servicio | Propósito | Estado |
|----------|-----------|--------|
| **Supabase** | DB + Auth + Storage + Realtime | Conectado |

### PENDIENTES DE CONECTAR

#### Prioridad ALTA (Fase 1)
| Servicio | Propósito | Necesitas |
|----------|-----------|-----------|
| **Resend** | Emails transaccionales | API Key de resend.com |

#### Prioridad ALTA (Fase 2-3)
| Servicio | Propósito | Necesitas |
|----------|-----------|-----------|
| **Firebase** | Push notifications | Proyecto en Firebase Console |
| **Radar** o **Geoapify** | Maps, Geocoding, Routing | API Key |
| **Twilio** | SMS para confirmaciones | Account SID + Auth Token |

#### Prioridad MEDIA (Fase 4-5)
| Servicio | Propósito | Necesitas |
|----------|-----------|-----------|
| **Gusto** o **OnPay** | Payroll, 1099 generation | Cuenta empresarial |
| **Checkr** | Background checks de drivers | Cuenta empresarial |

### NO APLICAN A ESTE PROYECTO
| Servicio | Razón |
|----------|-------|
| Thirdweb | Era para blockchain/crypto - No necesario |
| Smart Contracts | No es proyecto Web3 |
| Crypto Wallets | Pagos tradicionales |

---

## Pasos para Conectar

### 1. Supabase (PRIMERO)
```bash
# 1. Ir a https://supabase.com
# 2. Crear nuevo proyecto
# 3. Copiar:
#    - Project URL
#    - anon/public key
#    - service_role key (para server)

# 4. Crear archivo .env.local:
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-key
```

### 2. Resend (Emails)
```bash
# 1. Ir a https://resend.com
# 2. Crear API Key
# 3. Agregar a .env.local:
RESEND_API_KEY=re_xxxxx
```

### 3. Firebase (Push Notifications)
```bash
# 1. Ir a https://console.firebase.google.com
# 2. Crear proyecto
# 3. Habilitar Cloud Messaging
# 4. Descargar config y agregar keys
```

### 4. Radar/Geoapify (Maps)
```bash
# Radar: https://radar.com (más económico)
# Geoapify: https://geoapify.com (flexible)
# Agregar a .env.local:
NEXT_PUBLIC_MAPS_API_KEY=xxxxx
```

---

## Variables de Entorno Necesarias

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (Email)
RESEND_API_KEY=

# Firebase (Push)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Maps (Radar o Geoapify)
NEXT_PUBLIC_MAPS_API_KEY=

# Twilio (SMS)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Payroll (Gusto o OnPay) - Fase 5
GUSTO_API_KEY=
```
