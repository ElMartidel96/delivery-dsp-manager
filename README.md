# AUTOS MALL LLC - Delivery Service Partner Platform

Plataforma profesional de gestión de entregas para AUTOS MALL LLC, DSP certificado por UniUni.

## Estado del Proyecto

| Componente | Estado |
|------------|--------|
| Landing Page | Operativa |
| i18n (EN/ES) | Operativo |
| Modo Oscuro/Claro | Operativo |
| Supabase (Auth/DB) | Pendiente |
| Sistema de Entregas | Pendiente |
| POD (Proof of Delivery) | Pendiente |
| Dashboard Admin | Pendiente |

## Tech Stack

- **Framework**: Next.js 15.5.9 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 3.4 + Glass Morphism
- **i18n**: next-intl 4.7
- **UI**: Radix UI + Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Deployment**: Vercel

## Requisitos

- Node.js 20.0+
- pnpm 10.0+

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/ElMartidel96/delivery-dsp-manager.git
cd delivery-dsp-manager

# Instalar dependencias
pnpm install

# Iniciar desarrollo
pnpm dev
```

## Scripts

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # ESLint
pnpm type-check   # Verificar tipos
pnpm format       # Formatear código
```

## Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── providers/         # Theme provider
│   └── ui/                # Componentes UI
├── docs/                  # Documentación
│   ├── PLAN_MAESTRO.md   # Roadmap completo
│   └── INTEGRACIONES.md  # Estado de integraciones
├── lib/                   # Utilidades
├── public/                # Assets estáticos
└── src/
    ├── i18n/              # Configuración i18n
    └── locales/           # Traducciones (EN/ES)
```

## Documentación

- [Plan Maestro](./docs/PLAN_MAESTRO.md) - Roadmap y especificaciones
- [Integraciones](./docs/INTEGRACIONES.md) - Estado de servicios externos

## Colores de Marca

- **AM Navy**: `#1e3a5f` - Primario, confianza
- **AM Orange**: `#f5a623` - Energía, acción
- **AM Green**: `#7cb342` - Éxito, crecimiento

## Licencia

2026 AUTOS MALL LLC. Todos los derechos reservados.

---

Desarrollado por [mbxarts.com](https://mbxarts.com)
