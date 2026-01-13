'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Calendar,
  CheckCircle,
  Lightbulb,
  Handshake,
  GraduationCap,
  Phone,
  Rocket,
  Shield,
} from 'lucide-react';

const programPhases = [
  {
    phase: 1,
    title: 'Fundamentos',
    duration: '0-30 días',
    description: 'Aprende las bases del negocio de entregas y maximiza tu eficiencia desde el día uno.',
    topics: [
      'Optimización de rutas',
      'Servicio al cliente excepcional',
      'Manejo eficiente del tiempo',
      'Uso de la plataforma',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    phase: 2,
    title: 'Crecimiento',
    duration: '30-90 días',
    description: 'Desarrolla habilidades avanzadas y prepárate para el siguiente nivel.',
    topics: [
      'Estrategias de ingresos',
      'Gestión financiera básica',
      'Networking con otros conductores',
      'Preparación para liderazgo',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    phase: 3,
    title: 'Liderazgo',
    duration: '90-180 días',
    description: 'Transición de conductor a líder. Aprende a gestionar equipos.',
    topics: [
      'Reclutamiento de conductores',
      'Gestión de equipos',
      'Operaciones de flota',
      'Relaciones con socios',
    ],
    color: 'from-orange-500 to-orange-600',
  },
  {
    phase: 4,
    title: 'Empresario',
    duration: '180+ días',
    description: 'Consolida tu negocio y escala hacia el éxito empresarial.',
    topics: [
      'Estructura legal y fiscal',
      'Expansión de flota',
      'Estrategia de negocio',
      'Mentoría a nuevos líderes',
    ],
    color: 'from-green-500 to-green-600',
  },
];

const mentorBenefits = [
  {
    icon: MessageCircle,
    title: 'Mentor Dedicado',
    description: 'Un conductor experimentado asignado personalmente para guiarte.',
  },
  {
    icon: Calendar,
    title: 'Sesiones Semanales',
    description: 'Llamadas de seguimiento para revisar progreso y resolver dudas.',
  },
  {
    icon: Users,
    title: 'Comunidad Exclusiva',
    description: 'Acceso a grupo privado de conductores en tu mismo nivel.',
  },
  {
    icon: GraduationCap,
    title: 'Capacitación Continua',
    description: 'Webinars, talleres y recursos educativos actualizados.',
  },
];


export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg p-1.5 border border-gray-200 dark:border-white/20">
              <Image
                src="/logo_amall.PNG"
                alt="AUTOS MALL LLC"
                width={120}
                height={66}
                className="object-contain h-8 w-auto"
              />
            </div>
          </Link>
          <Link
            href="/register?role=driver"
            className="px-4 py-2 bg-am-orange text-white rounded-lg font-medium hover:bg-am-orange-light transition-colors flex items-center gap-2"
          >
            Comenzar Ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10 dark:from-purple-500/20 dark:to-orange-500/20" />
        <div className="container mx-auto max-w-6xl relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-am-orange mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Programa de Mentoría
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Nunca Caminas<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-am-orange">
                  Solo en Este Camino
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Cada conductor exitoso tuvo a alguien que le mostró el camino.
                Nuestro programa de mentoría te conecta con líderes que ya lograron
                lo que tú quieres lograr.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register?role=driver"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Rocket className="w-5 h-5" />
                  Unirme al Programa
                </Link>
                <a
                  href="tel:+13466971041"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Hablar con un Mentor
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-am-orange rounded-full flex items-center justify-center">
                    <Handshake className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">1:1 Personalizado</h3>
                    <p className="text-gray-500 dark:text-gray-400">Mentoría adaptada a tus metas</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {['Mentor con experiencia comprobada', 'Sesiones semanales de seguimiento', 'Plan de desarrollo personalizado', 'Acceso a comunidad exclusiva'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-am-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Phases */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tu Camino de Transformación
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Un programa estructurado que te lleva desde conductor principiante
              hasta empresario exitoso, paso a paso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programPhases.map((phase) => (
              <div
                key={phase.phase}
                className="relative bg-gray-50 dark:bg-gray-700/50 rounded-2xl overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${phase.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white font-bold`}>
                      {phase.phase}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{phase.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{phase.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {phase.description}
                  </p>
                  <ul className="space-y-2">
                    {phase.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-am-orange" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Lo Que Incluye el Programa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentorBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:border-purple-500 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Lightbulb className="w-16 h-16 mx-auto mb-6 text-am-orange" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Listo Para Tener un Mentor?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            El programa de mentoría está incluido para todos los conductores activos.
            Solo necesitas dar el primer paso.
          </p>
          <Link
            href="/register?role=driver"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-am-orange text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-am-orange-light transition-colors"
          >
            Comenzar Mi Transformación
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-am-navy text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AUTOS MALL LLC. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
