'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Users,
  Truck,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  User,
  MapPin,
  FileText,
  Shield,
  TrendingUp,
  Award,
  Briefcase,
  Clock,
  Globe,
} from 'lucide-react';

// Translations
const translations = {
  es: {
    // Header
    callUs: 'Llámanos',
    individualDriver: 'Soy Conductor Individual',

    // Hero
    dspProgram: 'Programa de Socios DSP',
    heroTitle1: 'Construye Tu Negocio de',
    heroTitle2: 'Entregas con Nosotros',
    heroSubtitle: '¿Tienes más de un vehículo? Conviértete en socio DSP y escala tu negocio de entregas con el respaldo de AUTOS MALL LLC.',

    // Stats
    monthlyIncome: 'Ingresos mensuales',
    vehiclesPerPartner: 'Vehículos por socio',
    activePartners: 'Socios activos',
    commissionPerDelivery: 'Comisión por entrega',

    // Benefits
    benefitsTitle: 'Beneficios de Ser Socio',
    benefits: [
      {
        title: 'Ingresos Escalables',
        description: 'Gana por cada vehículo en tu flota. Más vehículos = más ingresos pasivos.',
      },
      {
        title: 'Gestiona Tu Equipo',
        description: 'Recluta y gestiona tus propios conductores. Construye tu imperio.',
      },
      {
        title: 'Soporte Dedicado',
        description: 'Gerente de cuenta personal y línea prioritaria 24/7.',
      },
      {
        title: 'Crecimiento Garantizado',
        description: 'Acceso prioritario a nuevas rutas y zonas de expansión.',
      },
    ],

    // Commission Levels
    commissionLevelsTitle: 'Niveles de Comisión',
    vehicles: 'vehículos',
    support: 'Soporte',
    levels: [
      { vehicles: '2-5', commission: '15%', support: 'Estándar', name: 'Asociado' },
      { vehicles: '6-15', commission: '18%', support: 'Prioritario', name: 'Socio' },
      { vehicles: '16-30', commission: '22%', support: 'Dedicado', name: 'Socio Premium' },
      { vehicles: '30+', commission: '25%+', support: 'Ejecutivo', name: 'DSP Partner' },
    ],

    // Requirements
    requirementsTitle: 'Requisitos',
    requirements: [
      'Mínimo 2 vehículos disponibles para operación',
      'Capacidad de gestionar conductores',
      'Seguro comercial para flota',
      'Compromiso mínimo de 6 meses',
      'Historial crediticio favorable',
      'Entidad legal registrada (LLC, Corp, etc.) o disposición para crear una',
    ],

    // Form
    formTitle: 'Solicita Ser Socio',
    formSubtitle: 'Completa el formulario y te contactaremos',
    fullName: 'Nombre Completo',
    fullNamePlaceholder: 'Tu nombre completo',
    email: 'Email',
    emailPlaceholder: 'tu@email.com',
    phone: 'Teléfono',
    phonePlaceholder: '(555) 123-4567',
    companyName: 'Nombre de Empresa (si aplica)',
    companyPlaceholder: 'Tu empresa LLC',
    numberOfVehicles: 'Número de Vehículos',
    select: 'Seleccionar',
    vehicleOptions: [
      '2-5 vehículos',
      '6-10 vehículos',
      '11-20 vehículos',
      '21-50 vehículos',
      '50+ vehículos',
    ],
    experience: 'Experiencia',
    experienceOptions: [
      'Sin experiencia previa',
      '1-2 años',
      '3-5 años',
      '5+ años',
    ],
    city: 'Ciudad',
    cityPlaceholder: 'Houston',
    state: 'Estado',
    statePlaceholder: 'Texas',
    aboutYou: 'Cuéntanos sobre ti (opcional)',
    aboutYouPlaceholder: '¿Por qué quieres ser socio? ¿Cuáles son tus metas?',
    submitButton: 'Enviar Solicitud',
    formDisclaimer: 'Al enviar, aceptas ser contactado por nuestro equipo. Tu información está protegida.',

    // Success
    successTitle: '¡Solicitud Recibida!',
    successMessage: 'Gracias por tu interés en ser socio de AUTOS MALL LLC. Nuestro equipo de desarrollo de negocios te contactará en las próximas 24-48 horas.',
    backToHome: 'Volver al Inicio',
    questions: '¿Preguntas? Llámanos al',

    // Footer CTA
    preferToTalk: '¿Prefieres hablar directamente?',
    scheduleCall: 'Agenda una llamada con nuestro equipo de desarrollo de negocios',
    callNow: 'Llamar Ahora:',
  },
  en: {
    // Header
    callUs: 'Call Us',
    individualDriver: "I'm an Individual Driver",

    // Hero
    dspProgram: 'DSP Partner Program',
    heroTitle1: 'Build Your Delivery',
    heroTitle2: 'Business with Us',
    heroSubtitle: 'Have more than one vehicle? Become a DSP partner and scale your delivery business with the support of AUTOS MALL LLC.',

    // Stats
    monthlyIncome: 'Monthly income',
    vehiclesPerPartner: 'Vehicles per partner',
    activePartners: 'Active partners',
    commissionPerDelivery: 'Commission per delivery',

    // Benefits
    benefitsTitle: 'Benefits of Being a Partner',
    benefits: [
      {
        title: 'Scalable Income',
        description: 'Earn for each vehicle in your fleet. More vehicles = more passive income.',
      },
      {
        title: 'Manage Your Team',
        description: 'Recruit and manage your own drivers. Build your empire.',
      },
      {
        title: 'Dedicated Support',
        description: 'Personal account manager and priority 24/7 line.',
      },
      {
        title: 'Guaranteed Growth',
        description: 'Priority access to new routes and expansion zones.',
      },
    ],

    // Commission Levels
    commissionLevelsTitle: 'Commission Levels',
    vehicles: 'vehicles',
    support: 'Support',
    levels: [
      { vehicles: '2-5', commission: '15%', support: 'Standard', name: 'Associate' },
      { vehicles: '6-15', commission: '18%', support: 'Priority', name: 'Partner' },
      { vehicles: '16-30', commission: '22%', support: 'Dedicated', name: 'Premium Partner' },
      { vehicles: '30+', commission: '25%+', support: 'Executive', name: 'DSP Partner' },
    ],

    // Requirements
    requirementsTitle: 'Requirements',
    requirements: [
      'Minimum 2 vehicles available for operation',
      'Ability to manage drivers',
      'Commercial fleet insurance',
      'Minimum 6-month commitment',
      'Favorable credit history',
      'Registered legal entity (LLC, Corp, etc.) or willingness to create one',
    ],

    // Form
    formTitle: 'Apply to Be a Partner',
    formSubtitle: 'Complete the form and we will contact you',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Your full name',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    phone: 'Phone',
    phonePlaceholder: '(555) 123-4567',
    companyName: 'Company Name (if applicable)',
    companyPlaceholder: 'Your company LLC',
    numberOfVehicles: 'Number of Vehicles',
    select: 'Select',
    vehicleOptions: [
      '2-5 vehicles',
      '6-10 vehicles',
      '11-20 vehicles',
      '21-50 vehicles',
      '50+ vehicles',
    ],
    experience: 'Experience',
    experienceOptions: [
      'No prior experience',
      '1-2 years',
      '3-5 years',
      '5+ years',
    ],
    city: 'City',
    cityPlaceholder: 'Houston',
    state: 'State',
    statePlaceholder: 'Texas',
    aboutYou: 'Tell us about yourself (optional)',
    aboutYouPlaceholder: 'Why do you want to be a partner? What are your goals?',
    submitButton: 'Submit Application',
    formDisclaimer: 'By submitting, you agree to be contacted by our team. Your information is protected.',

    // Success
    successTitle: 'Application Received!',
    successMessage: 'Thank you for your interest in becoming a partner with AUTOS MALL LLC. Our business development team will contact you within 24-48 hours.',
    backToHome: 'Back to Home',
    questions: 'Questions? Call us at',

    // Footer CTA
    preferToTalk: 'Prefer to talk directly?',
    scheduleCall: 'Schedule a call with our business development team',
    callNow: 'Call Now:',
  },
};

export default function PartnerPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    vehicles: '',
    city: '',
    state: '',
    experience: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Partner application:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-am-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-am-green" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.successTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t.successMessage}
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full py-3 bg-am-navy dark:bg-am-orange text-white rounded-lg font-semibold hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
              >
                {t.backToHome}
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.questions} (346) 697-1041
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <a href="tel:+13466971041" className="hidden sm:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-am-orange transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">(346) 697-1041</span>
            </a>
            <Link
              href="/register?role=driver"
              className="px-4 py-2 text-sm font-medium text-am-navy dark:text-am-orange hover:underline"
            >
              {t.individualDriver}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-am-navy/10 to-am-orange/10 dark:from-am-navy/20 dark:to-am-orange/20" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-am-orange/10 text-am-orange rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              {t.dspProgram}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.heroTitle1}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-am-navy to-am-orange">
                {t.heroTitle2}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <DollarSign className="w-8 h-8 text-am-green mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$5K-50K</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.monthlyIncome}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <Truck className="w-8 h-8 text-am-navy dark:text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2-50+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.vehiclesPerPartner}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">15-25%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.commissionPerDelivery}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-am-orange" />
                {t.benefitsTitle}
              </h2>
              <div className="grid gap-4">
                {t.benefits.map((benefit, index) => {
                  const icons = [DollarSign, Users, Shield, TrendingUp];
                  const Icon = icons[index];
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-am-navy/10 dark:bg-am-navy/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-am-navy dark:text-am-orange" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Commission Levels */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-500" />
                {t.commissionLevelsTitle}
              </h2>
              <div className="space-y-3">
                {t.levels.map((level, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{level.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{level.vehicles} {t.vehicles}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-am-green">{level.commission}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.support} {level.support}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-br from-am-navy to-am-navy-light rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-am-orange" />
                {t.requirementsTitle}
              </h2>
              <ul className="space-y-3">
                {t.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-am-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.formTitle}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {t.formSubtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
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
                      {t.phone} *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white"
                        placeholder={t.phonePlaceholder}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.companyName}
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white"
                        placeholder={t.companyPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.numberOfVehicles} *
                    </label>
                    <div className="relative">
                      <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="vehicles"
                        required
                        value={formData.vehicles}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white appearance-none"
                      >
                        <option value="">{t.select}</option>
                        <option value="2-5">{t.vehicleOptions[0]}</option>
                        <option value="6-10">{t.vehicleOptions[1]}</option>
                        <option value="11-20">{t.vehicleOptions[2]}</option>
                        <option value="21-50">{t.vehicleOptions[3]}</option>
                        <option value="50+">{t.vehicleOptions[4]}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.experience} *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white appearance-none"
                      >
                        <option value="">{t.select}</option>
                        <option value="none">{t.experienceOptions[0]}</option>
                        <option value="1-2">{t.experienceOptions[1]}</option>
                        <option value="3-5">{t.experienceOptions[2]}</option>
                        <option value="5+">{t.experienceOptions[3]}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.city} *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white"
                        placeholder={t.cityPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.state} *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white"
                      placeholder={t.statePlaceholder}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.aboutYou}
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-orange text-gray-900 dark:text-white resize-none"
                      placeholder={t.aboutYouPlaceholder}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-am-orange to-am-navy text-white rounded-lg font-semibold hover:from-am-navy hover:to-am-orange transition-all flex items-center justify-center gap-2"
                >
                  {t.submitButton}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  {t.formDisclaimer}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="bg-am-navy py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Clock className="w-12 h-12 mx-auto mb-4 text-am-orange" />
          <h2 className="text-2xl font-bold mb-4">{t.preferToTalk}</h2>
          <p className="text-gray-300 mb-6">
            {t.scheduleCall}
          </p>
          <a
            href="tel:+13466971041"
            className="inline-flex items-center gap-2 px-8 py-3 bg-am-orange text-white rounded-lg font-semibold hover:bg-am-orange-light transition-colors"
          >
            <Phone className="w-5 h-5" />
            {t.callNow} (346) 697-1041
          </a>
        </div>
      </section>
    </div>
  );
}
