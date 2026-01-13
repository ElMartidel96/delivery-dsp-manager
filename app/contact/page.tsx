'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  ArrowLeft,
  User,
  Building2,
  FileText,
  Globe,
  Headphones,
  Calendar,
} from 'lucide-react';

// Translations
const translations = {
  es: {
    // Header
    backToHome: 'Volver al inicio',

    // Hero
    heroTitle: 'Contáctanos',
    heroSubtitle: 'Estamos aquí para ayudarte. Elige la forma que prefieras para comunicarte con nosotros.',

    // Contact Cards
    phoneTitle: 'Llámanos',
    phoneDesc: 'Línea directa disponible 24/7',
    phoneNumber: '(346) 697-1041',

    emailTitle: 'Escríbenos',
    emailDesc: 'Respuesta en menos de 24 horas',
    emailAddress: 'contact@autosmall.com',

    locationTitle: 'Ubicación',
    locationDesc: 'Oficina principal',
    locationAddress: 'Houston, TX',

    hoursTitle: 'Horario',
    hoursDesc: 'Atención al cliente',
    hoursValue: 'Lun-Vie: 6AM-10PM',

    // Form
    formTitle: 'Envíanos un Mensaje',
    formSubtitle: 'Completa el formulario y te responderemos lo antes posible',

    fullName: 'Nombre Completo',
    fullNamePlaceholder: 'Tu nombre completo',
    email: 'Email',
    emailPlaceholder: 'tu@email.com',
    phone: 'Teléfono',
    phonePlaceholder: '(555) 123-4567',
    subject: 'Asunto',
    subjectPlaceholder: 'Seleccionar',
    subjectOptions: [
      'Información general',
      'Quiero ser conductor',
      'Quiero ser socio DSP',
      'Problema con una entrega',
      'Soporte técnico',
      'Facturación y pagos',
      'Otro',
    ],
    message: 'Mensaje',
    messagePlaceholder: '¿En qué podemos ayudarte?',
    submitButton: 'Enviar Mensaje',
    formDisclaimer: 'Tu información está protegida y no será compartida con terceros.',

    // Success
    successTitle: '¡Mensaje Enviado!',
    successMessage: 'Gracias por contactarnos. Nuestro equipo te responderá en las próximas 24 horas.',
    sendAnother: 'Enviar otro mensaje',

    // Quick Links
    quickLinksTitle: 'Enlaces Rápidos',
    quickLinks: [
      { label: 'Aplicar como Conductor', href: '/register?role=driver' },
      { label: 'Programa de Socios', href: '/partner' },
      { label: 'Centro de Ayuda', href: '/dashboard/help' },
    ],

    // FAQ
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿Cuánto tiempo tarda la respuesta?',
        a: 'Respondemos todos los mensajes en menos de 24 horas hábiles. Para urgencias, llámanos directamente.',
      },
      {
        q: '¿Cómo puedo aplicar para ser conductor?',
        a: 'Puedes aplicar directamente en nuestra página de registro o llamarnos para asistencia personalizada.',
      },
      {
        q: '¿Tienen oficinas físicas?',
        a: 'Nuestra oficina principal está en Houston, TX. Para visitas, por favor agenda una cita previamente.',
      },
    ],
  },
  en: {
    // Header
    backToHome: 'Back to home',

    // Hero
    heroTitle: 'Contact Us',
    heroSubtitle: "We're here to help. Choose how you'd like to reach us.",

    // Contact Cards
    phoneTitle: 'Call Us',
    phoneDesc: 'Direct line available 24/7',
    phoneNumber: '(346) 697-1041',

    emailTitle: 'Email Us',
    emailDesc: 'Response within 24 hours',
    emailAddress: 'contact@autosmall.com',

    locationTitle: 'Location',
    locationDesc: 'Main office',
    locationAddress: 'Houston, TX',

    hoursTitle: 'Hours',
    hoursDesc: 'Customer service',
    hoursValue: 'Mon-Fri: 6AM-10PM',

    // Form
    formTitle: 'Send Us a Message',
    formSubtitle: 'Fill out the form and we will respond as soon as possible',

    fullName: 'Full Name',
    fullNamePlaceholder: 'Your full name',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    phone: 'Phone',
    phonePlaceholder: '(555) 123-4567',
    subject: 'Subject',
    subjectPlaceholder: 'Select',
    subjectOptions: [
      'General information',
      'I want to be a driver',
      'I want to be a DSP partner',
      'Problem with a delivery',
      'Technical support',
      'Billing and payments',
      'Other',
    ],
    message: 'Message',
    messagePlaceholder: 'How can we help you?',
    submitButton: 'Send Message',
    formDisclaimer: 'Your information is protected and will not be shared with third parties.',

    // Success
    successTitle: 'Message Sent!',
    successMessage: 'Thank you for contacting us. Our team will respond within 24 hours.',
    sendAnother: 'Send another message',

    // Quick Links
    quickLinksTitle: 'Quick Links',
    quickLinks: [
      { label: 'Apply as Driver', href: '/register?role=driver' },
      { label: 'Partner Program', href: '/partner' },
      { label: 'Help Center', href: '/dashboard/help' },
    ],

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How long does it take to get a response?',
        a: 'We respond to all messages within 24 business hours. For emergencies, please call us directly.',
      },
      {
        q: 'How can I apply to be a driver?',
        a: 'You can apply directly on our registration page or call us for personalized assistance.',
      },
      {
        q: 'Do you have physical offices?',
        a: 'Our main office is in Houston, TX. For visits, please schedule an appointment in advance.',
      },
    ],
  },
};

export default function ContactPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setSubmitted(false);
  };

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
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>
            <a
              href="tel:+13466971041"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-am-orange text-white rounded-lg font-medium text-sm hover:bg-am-orange-light transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t.phoneNumber}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-am-orange mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-am-orange/10 text-am-orange rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              {t.heroTitle}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phone */}
            <a
              href="tel:+13466971041"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-am-orange transition-colors group"
            >
              <div className="w-12 h-12 bg-am-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-am-orange/20 transition-colors">
                <Phone className="w-6 h-6 text-am-orange" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.phoneTitle}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.phoneDesc}</p>
              <p className="font-semibold text-am-orange">{t.phoneNumber}</p>
            </a>

            {/* Email */}
            <a
              href="mailto:contact@autosmall.com"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-am-green transition-colors group"
            >
              <div className="w-12 h-12 bg-am-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-am-green/20 transition-colors">
                <Mail className="w-6 h-6 text-am-green" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.emailTitle}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.emailDesc}</p>
              <p className="font-semibold text-am-green">{t.emailAddress}</p>
            </a>

            {/* Location */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-am-navy/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-am-navy dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.locationTitle}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.locationDesc}</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{t.locationAddress}</p>
            </div>

            {/* Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.hoursTitle}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.hoursDesc}</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{t.hoursValue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-am-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-am-green" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t.successTitle}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {t.successMessage}
                    </p>
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 bg-am-navy dark:bg-am-orange text-white rounded-lg font-semibold hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
                    >
                      {t.sendAnother}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t.formTitle}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.formSubtitle}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.fullName} *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              name="fullName"
                              required
                              value={formData.fullName}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white"
                              placeholder={t.fullNamePlaceholder}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.email} *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white"
                              placeholder={t.emailPlaceholder}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.phone}
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white"
                              placeholder={t.phonePlaceholder}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.subject} *
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              name="subject"
                              required
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white appearance-none"
                            >
                              <option value="">{t.subjectPlaceholder}</option>
                              {t.subjectOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.message} *
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white resize-none"
                          placeholder={t.messagePlaceholder}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-am-orange to-am-navy text-white rounded-lg font-semibold hover:from-am-navy hover:to-am-orange transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        {t.submitButton}
                      </button>

                      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        {t.formDisclaimer}
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-am-orange" />
                  {t.quickLinksTitle}
                </h3>
                <div className="space-y-2">
                  {t.quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-am-orange/10 dark:hover:bg-am-orange/20 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-am-orange"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-am-green" />
                  {t.faqTitle}
                </h3>
                <div className="space-y-4">
                  {t.faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                        {faq.q}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call Card */}
              <div className="bg-gradient-to-br from-am-navy to-am-navy-light rounded-2xl p-6 text-white">
                <Calendar className="w-10 h-10 text-am-orange mb-4" />
                <h3 className="font-bold text-lg mb-2">
                  {lang === 'es' ? '¿Prefieres hablar?' : 'Prefer to talk?'}
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  {lang === 'es'
                    ? 'Llámanos directamente y un representante te atenderá.'
                    : 'Call us directly and a representative will assist you.'}
                </p>
                <a
                  href="tel:+13466971041"
                  className="block w-full py-3 bg-am-orange text-white rounded-lg font-semibold text-center hover:bg-am-orange-light transition-colors"
                >
                  {t.phoneNumber}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-am-navy text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AUTOS MALL LLC. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
