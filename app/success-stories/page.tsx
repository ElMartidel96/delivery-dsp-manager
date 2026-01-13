'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Star,
  Quote,
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Truck,
  Building2,
} from 'lucide-react';

const stories = [
  {
    name: 'Roberto M.',
    role: 'De Conductor a Socio DSP',
    location: 'Houston, TX',
    image: null,
    initials: 'RM',
    quote: 'Empecé con mi carro personal hace 2 años. Hoy tengo 8 vehículos y un equipo de 12 conductores. AUTOS MALL me dio las herramientas y el soporte para crecer.',
    stats: {
      before: '$800/semana',
      after: '$12,000/mes',
      time: '18 meses',
    },
    highlight: 'De empleado a empresario',
    color: 'from-blue-500 to-purple-600',
  },
  {
    name: 'María Elena G.',
    role: 'Conductora Élite',
    location: 'Dallas, TX',
    image: null,
    initials: 'MG',
    quote: 'Como madre soltera, necesitaba flexibilidad. Aquí elijo mis horarios y gano más que en mi trabajo anterior de oficina. Mis hijos me ven triunfar.',
    stats: {
      before: 'Trabajo de oficina',
      after: '$1,800/semana',
      time: '8 meses',
    },
    highlight: 'Flexibilidad + Ingresos',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Carlos & Ana R.',
    role: 'Negocio Familiar',
    location: 'San Antonio, TX',
    image: null,
    initials: 'CR',
    quote: 'Empezamos juntos con 2 carros. El sistema de niveles nos motivó a seguir creciendo. Ahora nuestros hijos trabajan con nosotros en las vacaciones.',
    stats: {
      before: '2 vehículos',
      after: '15 vehículos',
      time: '2 años',
    },
    highlight: 'Negocio familiar',
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Juan Pablo S.',
    role: 'Ex-Uber Driver',
    location: 'Austin, TX',
    image: null,
    initials: 'JS',
    quote: 'Cansado de las tarifas de Uber, busqué algo mejor. Aquí gano el doble por las mismas horas y tengo un camino claro hacia tener mi propio negocio.',
    stats: {
      before: '$500/semana en Uber',
      after: '$1,400/semana',
      time: '6 meses',
    },
    highlight: '2x más ingresos',
    color: 'from-orange-500 to-amber-600',
  },
];

const milestones = [
  { number: '500+', label: 'Conductores activos', icon: Users },
  { number: '$2M+', label: 'Pagado a conductores/mes', icon: DollarSign },
  { number: '50+', label: 'Socios DSP', icon: Building2 },
  { number: '4.9', label: 'Satisfacción promedio', icon: Star },
];

export default function SuccessStoriesPage() {
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
            Únete Ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-am-navy/5 to-am-orange/5 dark:from-am-navy/20 dark:to-am-orange/20" />
        <div className="container mx-auto max-w-6xl relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-am-orange mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-am-green/10 text-am-green rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Historias Reales de Éxito
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              De Conductores a<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-am-orange to-am-green">
                Dueños de Negocios
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Conoce a las personas que transformaron su futuro con AUTOS MALL LLC.
              Sus historias podrían ser la tuya.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <milestone.icon className="w-8 h-8 mx-auto mb-3 text-am-orange" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{milestone.number}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{milestone.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="md:flex">
                  {/* Left side - Profile */}
                  <div className={`md:w-1/3 bg-gradient-to-br ${story.color} p-8 text-white`}>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold mb-4">
                        {story.initials}
                      </div>
                      <h3 className="text-2xl font-bold">{story.name}</h3>
                      <p className="text-white/80">{story.role}</p>
                      <p className="text-sm text-white/60 mt-1">{story.location}</p>

                      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        {story.highlight}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="md:w-2/3 p-8">
                    <Quote className="w-10 h-10 text-am-orange/30 mb-4" />
                    <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">
                      "{story.quote}"
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Antes</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{story.stats.before}</p>
                      </div>
                      <div className="text-center p-4 bg-am-green/10 rounded-xl">
                        <p className="text-xs text-am-green uppercase mb-1">Después</p>
                        <p className="font-bold text-am-green text-lg">{story.stats.after}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Tiempo</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{story.stats.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-am-navy to-am-navy-light rounded-2xl p-8 md:p-12 text-center text-white">
            <Truck className="w-16 h-16 mx-auto mb-6 text-am-orange" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tu Historia Comienza Hoy
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Cada una de estas historias empezó con una decisión.
              La tuya podría ser la próxima en inspirar a otros.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register?role=driver"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-am-orange text-white rounded-xl font-semibold hover:bg-am-orange-light transition-colors"
              >
                <Users className="w-5 h-5" />
                Comenzar como Conductor
              </Link>
              <Link
                href="/partner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/30"
              >
                <Building2 className="w-5 h-5" />
                Aplicar como Socio DSP
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-am-green" />
                Sin inversión inicial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-am-green" />
                Capacitación incluida
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-am-green" />
                Soporte 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ¿Cuánto tiempo toma ver resultados?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                La mayoría de nuestros conductores ven ingresos significativos desde la primera semana.
                El crecimiento a socio DSP típicamente toma 12-24 meses de trabajo consistente.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ¿Necesito experiencia previa?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                No. Nuestro programa de capacitación te prepara para el éxito.
                Solo necesitas ganas de trabajar y aprender.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ¿Estas historias son reales?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Absolutamente. Todos los testimonios son de conductores y socios reales.
                Los resultados varían según dedicación y mercado.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ¿Puedo empezar medio tiempo?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Sí. Muchos de nuestros conductores exitosos empezaron trabajando algunas horas
                mientras mantenían otro empleo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-am-navy text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AUTOS MALL LLC. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Los resultados pueden variar. Las cifras presentadas son ejemplos de conductores exitosos
            y no garantizan resultados específicos.
          </p>
        </div>
      </footer>
    </div>
  );
}
