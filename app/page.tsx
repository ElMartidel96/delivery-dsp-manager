'use client';

/**
 * ============================================================================
 * AUTOS MALL LLC - LANDING PAGE
 * ============================================================================
 *
 * Professional landing page - "Entrepreneur Factory" concept
 * Features: i18n (EN/ES), Dark/Light mode, Glass morphism design
 * Sales psychology techniques: scarcity, social proof, transformation narrative
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Shield,
  Users,
  Phone,
  CheckCircle2,
  ArrowRight,
  Star,
  Navigation,
  Headphones,
  DollarSign,
  Car,
  Smartphone,
  FileCheck,
  Award,
  TrendingUp,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  Rocket,
  Crown,
  Briefcase,
  Building2,
  Brain,
  Heart,
  MessageCircle
} from 'lucide-react';

// Animations
const animations = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(245, 166, 35, 0.3),
                  0 0 40px rgba(30, 58, 95, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(245, 166, 35, 0.5),
                  0 0 60px rgba(30, 58, 95, 0.3);
    }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export default function LandingPage() {
  const t = useTranslations('landing');
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen theme-gradient-bg text-gray-900 dark:text-white">
      <style jsx>{animations}</style>

      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-am-orange/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute top-60 right-20 w-72 h-72 bg-am-navy/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-am-green/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className={`space-y-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Badges */}
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-am-orange/10 dark:bg-am-orange/20 backdrop-blur-sm rounded-full border border-am-orange/30 w-fit">
                  <Truck className="w-3.5 h-3.5 text-am-orange" />
                  <span className="text-xs font-medium text-am-navy dark:text-white">{t('hero.badge1')}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-am-navy/10 dark:bg-white/10 backdrop-blur-sm rounded-full border border-am-navy/20 dark:border-white/20 w-fit">
                  <Rocket className="w-3.5 h-3.5 text-am-navy dark:text-am-orange" />
                  <span className="text-xs font-medium text-am-navy dark:text-white">{t('hero.badge2')}</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">
                  {t('hero.title1')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-am-navy via-am-orange to-am-green bg-clip-text text-transparent">
                  {t('hero.title2')}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/register?role=driver"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-am-navy to-am-navy-light rounded-lg font-semibold text-white text-sm hover:from-am-navy-light hover:to-am-navy transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Rocket className="w-4 h-4" />
                  {t('hero.cta1')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#elevation"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-sm text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 hover:bg-white dark:hover:bg-white/20 transition-all hover:scale-105"
                >
                  <Target className="w-4 h-4" />
                  {t('hero.cta2')}
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-am-green" />
                  <span className="text-xs">{t('hero.trust1')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4 text-am-navy dark:text-am-orange" />
                  <span className="text-xs">{t('hero.trust2')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-am-orange" />
                  <span className="text-xs">{t('hero.trust3')}</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Image/Logo */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative flex items-center justify-center">
                {/* Glow effect */}
                <div
                  className="absolute w-full max-w-lg aspect-[16/9] rounded-3xl opacity-60"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(245,166,35,0.3) 0%, rgba(30,58,95,0.2) 50%, transparent 70%)',
                    animation: 'pulse-glow 3s ease-in-out infinite',
                  }}
                />

                {/* Logo Container */}
                <div className="relative w-full max-w-lg rounded-3xl glass-crystal p-6 flex items-center justify-center" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <Image
                    src="/logo_amall.PNG"
                    alt="AUTOS MALL LLC"
                    width={500}
                    height={276}
                    className="object-contain w-full h-auto"
                    priority
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 p-3 rounded-xl glass-crystal" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Crown className="w-6 h-6 text-am-orange" />
                </div>
                <div className="absolute -bottom-4 -left-4 p-3 rounded-xl glass-crystal" style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }}>
                  <TrendingUp className="w-6 h-6 text-am-navy dark:text-am-green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[
              { icon: Package, label: t('stats.deliveries'), color: 'am-orange', darkColor: 'am-orange' },
              { icon: Users, label: t('stats.drivers'), color: 'am-navy', darkColor: 'am-green' },
              { icon: Star, label: t('stats.satisfaction'), color: 'am-green', darkColor: 'am-green' },
              { icon: MapPin, label: t('stats.coverage'), value: 'Houston, TX', color: 'am-orange', darkColor: 'am-orange' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl glass-crystal hover:scale-105 transition-all text-center"
              >
                <stat.icon className={`w-8 h-8 text-${stat.color} dark:text-${stat.darkColor} mx-auto mb-2`} />
                {stat.value && <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-0.5">{stat.value}</div>}
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPPORTUNITY SECTION */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-transparent via-am-navy/5 dark:via-am-navy/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-am-orange/10 dark:bg-am-orange/20 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-am-orange" />
              <span className="text-sm font-medium text-am-orange">{t('opportunity.badge')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('opportunity.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('opportunity.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: t('opportunity.stat1'), label: t('opportunity.stat1Label'), icon: DollarSign, color: 'am-orange' },
              { value: t('opportunity.stat2'), label: t('opportunity.stat2Label'), icon: TrendingUp, color: 'am-green' },
              { value: t('opportunity.stat3'), label: t('opportunity.stat3Label'), icon: Target, color: 'am-orange' },
              { value: t('opportunity.stat4'), label: t('opportunity.stat4Label'), icon: Rocket, color: 'am-green' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl glass-crystal text-center hover:scale-105 transition-all">
                <stat.icon className={`w-8 h-8 text-${stat.color} mx-auto mb-3`} />
                <div className={`text-3xl lg:text-4xl font-bold text-${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / PROBLEM-SOLUTION SECTION */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('problem.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('problem.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="p-6 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-200 dark:border-red-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-red-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">{t('problem.problemTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-500 text-xs">✕</span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t(`problem.problem${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="p-6 bg-am-green/10 dark:bg-am-green/10 rounded-2xl border border-am-green/30 dark:border-am-green/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-am-green/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-am-green" />
                </div>
                <h3 className="text-xl font-bold text-am-green">{t('problem.solutionTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-am-green/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 text-am-green" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t(`problem.solution${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ELEVATION SYSTEM SECTION */}
      <section id="elevation" className="relative py-16 px-4 bg-gradient-to-b from-transparent via-am-orange/5 dark:via-am-orange/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-am-navy/10 dark:bg-am-navy/30 rounded-full mb-4">
              <Rocket className="w-4 h-4 text-am-navy dark:text-am-orange" />
              <span className="text-sm font-medium text-am-navy dark:text-am-orange">{t('elevation.badge')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('elevation.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('elevation.subtitle')}
            </p>
          </div>

          {/* Elevation Levels */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { level: 1, icon: Truck, color: 'am-navy', darkColor: 'blue-400', bgGradient: 'from-am-navy/10 to-am-navy/5' },
              { level: 2, icon: Users, color: 'am-orange', darkColor: 'am-orange', bgGradient: 'from-am-orange/10 to-am-orange/5' },
              { level: 3, icon: Briefcase, color: 'am-green', darkColor: 'am-green', bgGradient: 'from-am-green/10 to-am-green/5' },
              { level: 4, icon: Building2, color: 'am-orange', darkColor: 'am-orange', bgGradient: 'from-am-orange/20 to-am-navy/10' },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${item.bgGradient} border border-${item.color}/20 dark:border-${item.darkColor}/30 hover:scale-[1.02] transition-all group`}
              >
                {/* Level indicator */}
                <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg bg-${item.color} dark:bg-${item.darkColor} text-white`}>
                  {item.level}
                </div>

                <div className="mt-4">
                  <item.icon className={`w-10 h-10 text-${item.color} dark:text-${item.darkColor} mb-3`} />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {t(`elevation.level${item.level}.name`)}
                  </h3>
                  <div className={`text-xs font-medium text-${item.color} dark:text-${item.darkColor} mb-2`}>
                    {t(`elevation.level${item.level}.timeline`)}
                  </div>
                  <div className="text-lg font-bold text-am-green mb-3">
                    {t(`elevation.level${item.level}.earnings`)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t(`elevation.level${item.level}.desc`)}
                  </p>
                  <div className={`p-3 bg-${item.color}/10 dark:bg-${item.color}/20 rounded-lg`}>
                    <p className="text-xs font-medium italic text-gray-700 dark:text-gray-300">
                      &quot;{t(`elevation.level${item.level}.highlight`)}&quot;
                    </p>
                  </div>
                </div>

                {/* Arrow connector for desktop */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/register?role=driver"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-am-navy to-am-orange rounded-lg font-semibold text-white hover:from-am-orange hover:to-am-navy transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              {t('elevation.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { step: 1, icon: Brain, color: 'am-navy', darkColor: 'blue-400', title: t('howItWorks.step1.title'), desc: t('howItWorks.step1.desc') },
              { step: 2, icon: Heart, color: 'am-orange', darkColor: 'am-orange', title: t('howItWorks.step2.title'), desc: t('howItWorks.step2.desc') },
              { step: 3, icon: Zap, color: 'am-green', darkColor: 'am-green', title: t('howItWorks.step3.title'), desc: t('howItWorks.step3.desc') },
            ].map((item, i) => (
              <div key={i} className="relative group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 dark:from-white/20 to-transparent z-0" />
                )}

                <div className="relative z-10 p-6 rounded-2xl glass-crystal hover:scale-[1.02] transition-all">
                  {/* Step number */}
                  <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg bg-${item.color} dark:bg-${item.darkColor} text-white`}>
                    {item.step}
                  </div>

                  <div className={`p-3 bg-${item.color}/10 dark:bg-${item.darkColor}/20 rounded-xl w-fit mb-4 mt-2`}>
                    <item.icon className={`w-6 h-6 text-${item.color} dark:text-${item.darkColor}`} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES/FEATURES SECTION */}
      <section id="services" className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: MapPin, title: t('features.tracking.title'), desc: t('features.tracking.desc'), color: 'am-navy', darkColor: 'blue-400' },
              { icon: DollarSign, title: t('features.speed.title'), desc: t('features.speed.desc'), color: 'am-orange', darkColor: 'am-orange' },
              { icon: Heart, title: t('features.care.title'), desc: t('features.care.desc'), color: 'am-green', darkColor: 'am-green' },
              { icon: Award, title: t('features.drivers.title'), desc: t('features.drivers.desc'), color: 'am-navy', darkColor: 'blue-400' },
              { icon: Headphones, title: t('features.support.title'), desc: t('features.support.desc'), color: 'am-orange', darkColor: 'am-orange' },
              { icon: Navigation, title: t('features.coverage.title'), desc: t('features.coverage.desc'), color: 'am-green', darkColor: 'am-green' },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl glass-crystal hover:scale-105 transition-all"
              >
                <div className={`p-2 bg-${feature.color}/10 dark:bg-${feature.darkColor}/20 rounded-lg w-fit mb-3`}>
                  <feature.icon className={`w-5 h-5 text-${feature.color} dark:text-${feature.darkColor}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVERS/APPLICATION SECTION */}
      <section id="drivers" className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl p-6 lg:p-8 glass-crystal">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-full mb-4">
                  <Zap className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-xs font-medium text-red-500">{t('drivers.badge')}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('drivers.title')}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                  {t('drivers.desc')}
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: FileCheck, text: t('drivers.req1') },
                    { icon: Car, text: t('drivers.req2') },
                    { icon: Smartphone, text: t('drivers.req3') },
                    { icon: Shield, text: t('drivers.req4') },
                    { icon: Rocket, text: t('drivers.req5') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-white/5 rounded-lg">
                      <item.icon className="w-5 h-5 text-am-green" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-am-navy to-am-navy-light text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-am-orange" />
                    <div>
                      <div className="text-sm text-gray-300">{t('drivers.earnings')}</div>
                      <div className="text-2xl font-bold text-am-orange">{t('drivers.earningsValue')}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {['benefit1', 'benefit2', 'benefit3', 'benefit4'].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-am-green" />
                        <span className="text-sm">{t(`drivers.benefits.${benefit}`)}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/register?role=driver"
                    className="block w-full text-center py-3 bg-am-orange text-white rounded-lg font-semibold hover:bg-am-orange-light transition-colors"
                  >
                    {t('drivers.cta')}
                  </Link>

                  <p className="text-xs text-center text-gray-400 mt-3">
                    {t('drivers.urgency')}
                  </p>
                </div>

                {/* Badge */}
                <div className="absolute -top-3 -right-3 p-2 rounded-full bg-am-green text-white">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-am-navy/10 dark:bg-am-navy/30 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-am-navy dark:text-am-orange" />
              <span className="text-sm font-medium text-am-navy dark:text-am-orange">{t('faq.badge')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl glass-crystal overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {t(`faq.q${i}`)}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-am-orange flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(`faq.a${i}`)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CTA SECTION */}
      <section id="contact" className="relative py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register?role=driver"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-am-navy to-am-navy-light rounded-lg font-semibold text-white hover:from-am-navy-light hover:to-am-navy transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              {t('cta.button1')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:contact@autosmall.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 hover:bg-white dark:hover:bg-white/20 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              {t('cta.button2')}
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-am-orange" />
              <span className="text-sm">{t('cta.deliveries')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-am-green" />
              <span className="text-sm">{t('cta.rating')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-transparent via-am-navy/10 dark:via-am-navy/30 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center p-8 lg:p-12 rounded-3xl glass-crystal border border-am-orange/20">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('finalCta.title')}
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('finalCta.line1')}
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('finalCta.line2')}
              </p>
              <p className="text-lg text-am-orange font-medium">
                {t('finalCta.line3')}
              </p>
            </div>

            <Link
              href="/register?role=driver"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-am-orange to-am-navy rounded-xl font-bold text-lg text-white hover:from-am-navy hover:to-am-orange transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Rocket className="w-6 h-6" />
              {t('finalCta.button')}
              <ArrowRight className="w-6 h-6" />
            </Link>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
              {t('finalCta.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
