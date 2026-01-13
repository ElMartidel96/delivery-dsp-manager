'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  Star,
  DollarSign,
  Clock,
  Shield,
  Truck,
  Package,
  MapPin,
  Phone,
  Camera,
  ThumbsUp,
  AlertTriangle,
  Award,
  TrendingUp,
  Users,
  Heart,
  Zap,
  Target,
  Rocket,
} from 'lucide-react';

const successSteps = [
  {
    icon: Package,
    title: 'Recibe tu Asignación',
    description: 'Cada mañana recibirás tu ruta optimizada con todas las entregas del día. Nuestro sistema inteligente organiza las paradas para maximizar tu eficiencia.',
  },
  {
    icon: MapPin,
    title: 'Sigue la Ruta Óptima',
    description: 'La app te guía paso a paso con navegación integrada. Cada minuto ahorrado es dinero en tu bolsillo.',
  },
  {
    icon: Camera,
    title: 'Documenta la Entrega',
    description: 'Toma foto de la entrega completada. Esto protege tanto al cliente como a ti, y acelera el proceso de confirmación.',
  },
  {
    icon: CheckCircle,
    title: 'Confirma y Continúa',
    description: 'Un tap y listo. El sistema actualiza automáticamente tu progreso y te dirige a la siguiente parada.',
  },
];

const earningsTips = [
  {
    icon: Clock,
    title: 'Bloques Premium',
    description: 'Los turnos de 6AM-10AM y 4PM-8PM pagan hasta 25% más. ¡Los madrugadores ganan más!',
    highlight: '+25%',
  },
  {
    icon: Zap,
    title: 'Bono de Velocidad',
    description: 'Completa tu ruta antes del tiempo estimado y recibe bonificaciones automáticas.',
    highlight: '+$15-50',
  },
  {
    icon: Star,
    title: 'Rating Perfecto',
    description: 'Mantén 4.8+ estrellas y desbloquea rutas exclusivas con mejor pago.',
    highlight: '+20%',
  },
  {
    icon: Target,
    title: 'Metas Semanales',
    description: 'Alcanza 100 entregas semanales y recibe un bono adicional garantizado.',
    highlight: '+$100',
  },
];

const proTips = [
  {
    title: 'Organiza tu Vehículo',
    description: 'Ordena los paquetes por zona antes de salir. Los conductores organizados completan 15% más entregas.',
  },
  {
    title: 'Comunica Proactivamente',
    description: 'Un mensaje al cliente cuando estás en camino reduce los intentos fallidos en 40%.',
  },
  {
    title: 'Conoce tu Zona',
    description: 'Después de 2 semanas en la misma área, los conductores reportan rutas 30% más rápidas.',
  },
  {
    title: 'Cuida los Detalles',
    description: 'Paquetes en lugar seguro + foto clara = 5 estrellas garantizadas.',
  },
];

const levels = [
  {
    name: 'Novato',
    range: '0-50 entregas',
    benefits: ['Acceso a rutas básicas', 'Soporte prioritario', 'Capacitación completa'],
    color: 'from-gray-400 to-gray-500',
  },
  {
    name: 'Profesional',
    range: '51-200 entregas',
    benefits: ['Rutas premium disponibles', 'Bonos de rendimiento', 'Horarios flexibles'],
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Experto',
    range: '201-500 entregas',
    benefits: ['Prioridad en asignaciones', 'Bonos exclusivos +15%', 'Acceso a zonas VIP'],
    color: 'from-purple-400 to-purple-600',
  },
  {
    name: 'Élite',
    range: '500+ entregas',
    benefits: ['Máximas ganancias', 'Rutas garantizadas', 'Programa de liderazgo'],
    color: 'from-am-orange to-yellow-500',
  },
];

export default function DriverGuidePage() {
  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/help"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Guía del Conductor Exitoso
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Todo lo que necesitas para maximizar tus ganancias
          </p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-am-navy via-am-navy-light to-am-green p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-8 h-8 text-am-orange" />
            <span className="text-am-orange font-semibold">PROGRAMA DE ÉXITO</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Conductores que siguen esta guía ganan hasta 40% más
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl">
            Hemos analizado los datos de nuestros mejores conductores para crear esta guía.
            Aplica estos consejos y ve la diferencia en tu próximo pago.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-am-orange/20 rounded-full blur-3xl" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700">
          <DollarSign className="w-8 h-8 text-am-green mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$800-2,000</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ganancia semanal</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700">
          <Package className="w-8 h-8 text-am-navy dark:text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">120-180</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Entregas/semana</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700">
          <Clock className="w-8 h-8 text-am-orange mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Flexible</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tus horarios</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700">
          <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Semanal</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pagos garantizados</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Rocket className="w-6 h-6 text-am-orange" />
            Cómo Funciona Tu Día
          </h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {successSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-am-navy to-am-green flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <step.icon className="w-4 h-4 text-am-orange" />
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maximize Earnings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-am-green" />
            Maximiza Tus Ganancias
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Secretos de nuestros conductores top
          </p>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-4">
          {earningsTips.map((tip, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-am-orange transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-am-orange/10 rounded-lg">
                  <tip.icon className="w-5 h-5 text-am-orange" />
                </div>
                <span className="text-lg font-bold text-am-green">{tip.highlight}</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Level System */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-500" />
            Sistema de Niveles
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Sube de nivel y desbloquea más beneficios
          </p>
        </div>
        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((level, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <div className={`h-2 bg-gradient-to-r ${level.color}`} />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">{level.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{level.range}</p>
                <ul className="space-y-1.5">
                  {level.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-am-green flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-gradient-to-br from-am-navy to-am-navy-light rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-am-orange" />
          Tips de Conductores Élite
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {proTips.map((tip, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-am-orange mb-1">{tip.title}</h3>
              <p className="text-sm text-gray-300">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            Tu Seguridad es Primero
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Nunca comprometas tu seguridad</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Si una situación te parece insegura, contacta a soporte inmediatamente. Tu bienestar vale más que cualquier entrega.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-am-green flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Línea de emergencia 24/7</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nuestro equipo está disponible las 24 horas. Nunca estás solo en la carretera.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Seguro incluido</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Todos nuestros conductores están cubiertos durante las horas de trabajo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-am-orange to-am-green rounded-xl p-8 text-center text-white">
        <Users className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">¿Listo para empezar?</h2>
        <p className="text-white/90 mb-6">
          Únete a los cientos de conductores que ya están ganando con nosotros
        </p>
        <Link
          href="/dashboard/my-deliveries"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-am-navy rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Ver Mis Entregas
          <Truck className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
