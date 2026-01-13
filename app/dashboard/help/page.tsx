'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Book,
  Video,
  Headphones,
  Clock,
} from 'lucide-react';

const faqs = [
  {
    question: '¿Cómo puedo comenzar a hacer entregas?',
    answer: 'Para comenzar, asegúrate de tener tu perfil completo con toda la documentación requerida. Una vez aprobado, podrás ver las entregas disponibles en tu panel de "Ruta de Hoy".',
  },
  {
    question: '¿Cuándo recibo mi pago?',
    answer: 'Los pagos se procesan semanalmente cada lunes. Recibirás tu depósito directo entre 1-2 días hábiles después del procesamiento.',
  },
  {
    question: '¿Qué hago si tengo un problema con una entrega?',
    answer: 'Si tienes algún problema durante una entrega, contacta inmediatamente a tu dispatcher a través del chat en la app o llama a la línea de soporte 24/7.',
  },
  {
    question: '¿Cómo funciona el sistema de niveles?',
    answer: 'El sistema de elevación tiene 4 niveles: Colaborador, Asociado, Socio Estratégico y DSP Independiente. Cada nivel tiene requisitos específicos y beneficios crecientes.',
  },
  {
    question: '¿Puedo elegir mis horarios de trabajo?',
    answer: 'Sí, ofrecemos flexibilidad horaria. Puedes seleccionar los bloques de tiempo que mejor se adapten a tu disponibilidad dentro de las ventanas operativas.',
  },
  {
    question: '¿Qué documentos necesito para registrarme?',
    answer: 'Necesitas: licencia de conducir válida, seguro de vehículo vigente, registro del vehículo, y aprobar la verificación de antecedentes.',
  },
];

const resources = [
  {
    icon: Book,
    title: 'Guía del Conductor',
    description: 'Manual completo con todo lo que necesitas saber',
    link: '/dashboard/help/driver-guide',
  },
  {
    icon: Video,
    title: 'Videos de Capacitación',
    description: 'Tutoriales paso a paso para cada proceso',
    link: '/coming-soon',
  },
  {
    icon: FileText,
    title: 'Políticas y Términos',
    description: 'Documentos legales y políticas de la empresa',
    link: '/dashboard/help/policies',
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Ayuda y Soporte
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Encuentra respuestas o contacta a nuestro equipo
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-am-navy dark:hover:border-am-orange transition-colors">
          <div className="p-3 bg-am-navy/10 dark:bg-am-navy/30 rounded-xl w-fit mb-4">
            <Headphones className="w-6 h-6 text-am-navy dark:text-am-orange" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Soporte 24/7</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Línea directa para emergencias y soporte urgente
          </p>
          <a
            href="tel:+13466971041"
            className="flex items-center gap-2 text-am-navy dark:text-am-orange font-medium text-sm hover:underline"
          >
            <Phone className="w-4 h-4" />
            +1 (346) 697-1041
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-am-green transition-colors">
          <div className="p-3 bg-am-green/10 dark:bg-am-green/30 rounded-xl w-fit mb-4">
            <Mail className="w-6 h-6 text-am-green" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Respuesta en menos de 24 horas
          </p>
          <a
            href="mailto:contact@autosmall.com"
            className="flex items-center gap-2 text-am-green font-medium text-sm hover:underline"
          >
            <Mail className="w-4 h-4" />
            contact@autosmall.com
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-am-orange transition-colors">
          <div className="p-3 bg-am-orange/10 dark:bg-am-orange/30 rounded-xl w-fit mb-4">
            <MessageCircle className="w-6 h-6 text-am-orange" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Chat en Vivo</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Habla con un agente en tiempo real
          </p>
          <Link href="/coming-soon" className="flex items-center gap-2 text-am-orange font-medium text-sm hover:underline">
            <MessageCircle className="w-4 h-4" />
            Iniciar Chat
          </Link>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-gradient-to-r from-am-navy to-am-navy-light rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <Clock className="w-8 h-8 text-am-orange flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Horarios de Atención</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300">Línea de Emergencias</p>
                <p className="font-medium">24 horas, 7 días a la semana</p>
              </div>
              <div>
                <p className="text-gray-300">Soporte General</p>
                <p className="font-medium">Lunes a Viernes: 6:00 AM - 10:00 PM</p>
                <p className="font-medium">Sábados: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Preguntas Frecuentes
          </h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-am-orange flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recursos Útiles
          </h2>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-am-navy dark:hover:border-am-orange hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
            >
              <resource.icon className="w-5 h-5 text-am-navy dark:text-am-orange flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-am-navy dark:group-hover:text-am-orange">
                  {resource.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {resource.description}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-am-navy dark:group-hover:text-am-orange" />
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Envíanos un Mensaje
          </h2>
        </div>
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Asunto
              </label>
              <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white">
                <option>Problema con una entrega</option>
                <option>Consulta sobre pagos</option>
                <option>Problema técnico</option>
                <option>Documentación</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Mensaje
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white resize-none"
                placeholder="Describe tu problema o pregunta..."
              />
            </div>
            <Link
              href="/coming-soon"
              className="inline-block px-6 py-2.5 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
            >
              Enviar Mensaje
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
