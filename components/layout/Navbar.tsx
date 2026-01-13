'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { Menu, X, Truck, LogIn, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navigation');

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-40 transition-colors duration-300 border-b border-gray-200/50 dark:border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_amall.PNG"
                alt="AUTOS MALL LLC"
                width={180}
                height={100}
                className="object-contain h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('home')}
            </Link>
            <Link
              href="#services"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('services')}
            </Link>
            <Link
              href="#drivers"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('drivers')}
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('contact')}
            </Link>
            <a
              href="tel:+13466971041"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-am-green/10 dark:bg-am-green/20 text-am-green rounded-full text-sm font-medium hover:bg-am-green/20 dark:hover:bg-am-green/30 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (346) 697-1041
            </a>
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* Auth Buttons */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange font-medium text-sm transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/register?role=driver"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-am-orange text-white rounded-lg font-medium text-sm hover:bg-am-orange-light transition-colors"
            >
              <Truck className="w-4 h-4" />
              Join as Driver
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                href="#services"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('services')}
              </Link>
              <Link
                href="#drivers"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('drivers')}
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <a
                href="tel:+13466971041"
                className="mx-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-am-green/10 dark:bg-am-green/20 text-am-green rounded-lg font-medium text-sm hover:bg-am-green/20 dark:hover:bg-am-green/30 transition-colors"
              >
                <Phone className="w-4 h-4" />
                (346) 697-1041
              </a>

              <div className="flex items-center space-x-2 px-4 pt-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>

              <Link
                href="/login"
                className="mx-4 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>

              <Link
                href="/register?role=driver"
                className="mx-4 flex items-center justify-center gap-2 px-4 py-2 bg-am-orange text-white rounded-lg font-medium text-sm hover:bg-am-orange-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Truck className="w-4 h-4" />
                Join as Driver
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
