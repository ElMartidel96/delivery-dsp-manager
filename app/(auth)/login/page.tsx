'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2, Truck, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get('registered') === 'true';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen theme-gradient-bg flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-am-orange/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-am-navy/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
      </div>

      {/* Theme/Language toggles */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Login Card */}
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

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('login.title')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Success message after registration */}
          {justRegistered && (
            <div className="mb-6 p-4 bg-am-green/10 border border-am-green/30 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-am-green flex-shrink-0" />
              <p className="text-sm text-am-green">{t('login.registeredSuccess')}</p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('login.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('login.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  required
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

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-am-navy dark:text-am-orange hover:underline"
              >
                {t('login.forgotPassword')}
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-am-navy to-am-navy-light text-white rounded-lg font-semibold hover:from-am-navy-light hover:to-am-navy transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('login.loading')}
                </>
              ) : (
                t('login.submit')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/20" />
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">{t('login.or')}</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/20" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('login.noAccount')}{' '}
            <Link href="/register" className="text-am-navy dark:text-am-orange font-semibold hover:underline">
              {t('login.registerLink')}
            </Link>
          </p>

          {/* Driver CTA */}
          <div className="mt-6 p-4 bg-am-orange/10 dark:bg-am-orange/20 rounded-lg border border-am-orange/30">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-am-orange" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{t('login.driverCta')}</p>
                <Link href="/register?role=driver" className="text-xs text-am-orange hover:underline">
                  {t('login.driverCtaLink')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-am-navy dark:hover:text-am-orange">
            ← {t('login.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
