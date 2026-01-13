'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Truck } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDriverSignup = searchParams.get('role') === 'driver';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validar passwords
    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('register.passwordTooShort'));
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          is_driver_signup: isDriverSignup,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/login?registered=true');
  };

  return (
    <div className="min-h-screen theme-gradient-bg flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-am-green/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-am-navy/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
      </div>

      {/* Theme/Language toggles */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass-crystal rounded-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="block">
              <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-xl p-3 shadow-lg">
                <Image
                  src="/logo_amall.PNG"
                  alt="AUTOS MALL LLC"
                  width={200}
                  height={110}
                  className="object-contain h-16 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Driver badge */}
          {isDriverSignup && (
            <div className="mb-4 p-3 bg-am-orange/10 border border-am-orange/30 rounded-lg flex items-center gap-3">
              <Truck className="w-5 h-5 text-am-orange" />
              <p className="text-sm font-medium text-am-orange">{t('register.driverSignup')}</p>
            </div>
          )}

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('register.title')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('register.subtitle')}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.fullName')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('register.fullNamePlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('register.emailPlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('register.passwordPlaceholder')}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.confirmPassword')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('register.confirmPasswordPlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-am-navy focus:ring-am-navy"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('register.terms')}{' '}
                <Link href="/terms" className="text-am-navy dark:text-am-orange hover:underline">
                  {t('register.termsLink')}
                </Link>{' '}
                {t('register.and')}{' '}
                <Link href="/privacy" className="text-am-navy dark:text-am-orange hover:underline">
                  {t('register.privacyLink')}
                </Link>
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-am-green to-am-green-light text-white rounded-lg font-semibold hover:from-am-green-light hover:to-am-green transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('register.loading')}
                </>
              ) : (
                t('register.submit')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/20" />
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">{t('register.or')}</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/20" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('register.hasAccount')}{' '}
            <Link href="/login" className="text-am-navy dark:text-am-orange font-semibold hover:underline">
              {t('register.loginLink')}
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-am-navy dark:hover:text-am-orange">
            ← {t('register.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
