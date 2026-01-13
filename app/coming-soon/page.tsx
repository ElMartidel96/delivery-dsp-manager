'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Wrench, Mail, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-white/20 hover:bg-white/70 dark:hover:bg-white/20 transition-colors inline-block">
              <Image
                src="/logo_amall.PNG"
                alt="AUTOS MALL LLC"
                width={160}
                height={88}
                className="object-contain h-12 w-auto"
              />
            </div>
          </Link>
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-am-orange/10 dark:bg-am-orange/20 rounded-full flex items-center justify-center">
            <Wrench className="w-12 h-12 text-am-orange" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            Mantenimiento
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Página en Mantenimiento
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Estamos trabajando para restablecer este servicio.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-2 h-2 bg-am-orange rounded-full animate-pulse" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Trabajando en ello</span>
            <div className="w-2 h-2 bg-am-orange rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-am-navy to-am-orange h-2 rounded-full w-2/3 animate-pulse" />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/20 mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            ¿Necesitas ayuda urgente? Contáctanos:
          </p>
          <a
            href="mailto:contact@autosmall.com"
            className="inline-flex items-center gap-2 text-am-navy dark:text-am-orange font-medium hover:underline"
          >
            <Mail className="w-4 h-4" />
            contact@autosmall.com
          </a>
        </div>

        {/* Back buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ir al Inicio
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Ir al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
