'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Truck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-am-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 inline-block mb-2 border border-white/20">
                <Image
                  src="/logo_amall.PNG"
                  alt="AUTOS MALL LLC"
                  width={160}
                  height={88}
                  className="object-contain h-12 w-auto"
                />
              </div>
              <div>
                <div className="font-bold text-xl">{t('brand.name')}</div>
                <div className="text-xs text-am-orange">{t('brand.tagline')}</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {t('brand.description')}
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-300">
              <a href="tel:+13466971041" className="flex items-center gap-2 hover:text-am-orange transition-colors">
                <Phone className="w-4 h-4" />
                <span>(346) 697-1041</span>
              </a>
              <a href="mailto:contact@autosmall.com" className="flex items-center gap-2 hover:text-am-orange transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@autosmall.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Houston, TX</span>
              </div>
            </div>
          </div>

          {/* Services - El Sistema */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('services.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/#elevation" className="hover:text-am-orange transition-colors">
                  {t('services.sameDay')}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-am-orange transition-colors">
                  {t('services.residential')}
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-am-orange transition-colors">
                  {t('services.commercial')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/help" className="hover:text-am-orange transition-colors">
                  {t('services.tracking')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company - Empresa */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('company.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/#about" className="hover:text-am-orange transition-colors">
                  {t('company.about')}
                </Link>
              </li>
              <li>
                <Link href="/register?role=driver" className="hover:text-am-orange transition-colors">
                  {t('company.careers')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-am-orange transition-colors">
                  {t('company.contact')}
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-am-orange transition-colors">
                  {t('company.partner')}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Drivers - Futuros Empresarios */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('drivers.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/register?role=driver" className="hover:text-am-orange transition-colors">
                  {t('drivers.apply')}
                </Link>
              </li>
              <li>
                <Link href="/#drivers" className="hover:text-am-orange transition-colors">
                  {t('drivers.requirements')}
                </Link>
              </li>
              <li>
                <Link href="/#drivers" className="hover:text-am-orange transition-colors">
                  {t('drivers.earnings')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-am-orange">10K+</div>
              <div className="text-xs text-gray-400">{t('stats.deliveries')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-am-green">4.9</div>
              <div className="text-xs text-gray-400">{t('stats.rating')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-am-orange">50+</div>
              <div className="text-xs text-gray-400">{t('stats.drivers')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-am-green">CA</div>
              <div className="text-xs text-gray-400">{t('stats.areas')}</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            {t('bottom.copyright')}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-am-orange" />
              <span>{t('bottom.partner')}</span>
            </div>
            <span>|</span>
            <span>{t('bottom.location')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
