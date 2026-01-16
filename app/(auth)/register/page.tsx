'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Truck, Phone, CheckCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDriverSignup = searchParams.get('role') === 'driver';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Email verification states
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingEmailCode, setSendingEmailCode] = useState(false);
  const [verifyingEmailCode, setVerifyingEmailCode] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState(0);
  const [generatedEmailCode, setGeneratedEmailCode] = useState('');

  // Phone verification states
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [sendingPhoneCode, setSendingPhoneCode] = useState(false);
  const [verifyingPhoneCode, setVerifyingPhoneCode] = useState(false);
  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const [generatedPhoneCode, setGeneratedPhoneCode] = useState('');

  // Countdown timers
  useEffect(() => {
    if (emailCountdown > 0) {
      const timer = setTimeout(() => setEmailCountdown(emailCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailCountdown]);

  useEffect(() => {
    if (phoneCountdown > 0) {
      const timer = setTimeout(() => setPhoneCountdown(phoneCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phoneCountdown]);

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (phoneVerified) {
      setPhoneVerified(false);
      setPhoneCodeSent(false);
      setPhoneVerificationCode('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailVerified) {
      setEmailVerified(false);
      setEmailCodeSent(false);
      setEmailVerificationCode('');
    }
  };

  const isValidPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Send email verification code
  const sendEmailVerificationCode = async () => {
    if (!isValidEmail()) {
      setError(t('register.phoneInvalid'));
      return;
    }

    setSendingEmailCode(true);
    setError('');

    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedEmailCode(code);

      console.log(`Email verification code for ${email}: ${code}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setEmailCodeSent(true);
      setEmailCountdown(60);
      // TODO: Integrar con servicio de email (SendGrid, AWS SES, etc.)
      // Por ahora el código se guarda en estado para pruebas
    } catch {
      setError('Error al enviar el código');
    } finally {
      setSendingEmailCode(false);
    }
  };

  // Verify email code
  const verifyEmailCode = async () => {
    if (emailVerificationCode.length !== 6) {
      setError(t('register.invalidCode'));
      return;
    }

    setVerifyingEmailCode(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (emailVerificationCode === generatedEmailCode) {
        setEmailVerified(true);
        setEmailCodeSent(false);
      } else {
        setError(t('register.invalidCode'));
      }
    } catch {
      setError(t('register.invalidCode'));
    } finally {
      setVerifyingEmailCode(false);
    }
  };

  // Send phone verification code
  const sendPhoneVerificationCode = async () => {
    if (!isValidPhone()) {
      setError(t('register.phoneInvalid'));
      return;
    }

    setSendingPhoneCode(true);
    setError('');

    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedPhoneCode(code);

      console.log(`Phone verification code for ${phone}: ${code}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPhoneCodeSent(true);
      setPhoneCountdown(60);
      // TODO: Integrar con Twilio u otro servicio SMS
      // Por ahora el código se guarda en estado para pruebas
    } catch {
      setError('Error al enviar el código');
    } finally {
      setSendingPhoneCode(false);
    }
  };

  // Verify phone code
  const verifyPhoneCode = async () => {
    if (phoneVerificationCode.length !== 6) {
      setError(t('register.invalidCode'));
      return;
    }

    setVerifyingPhoneCode(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (phoneVerificationCode === generatedPhoneCode) {
        setPhoneVerified(true);
        setPhoneCodeSent(false);
      } else {
        setError(t('register.invalidCode'));
      }
    } catch {
      setError(t('register.invalidCode'));
    } finally {
      setVerifyingPhoneCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate both verifications
    if (!emailVerified || !phoneVerified) {
      setError(t('register.verifyBothRequired'));
      setLoading(false);
      return;
    }

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
    const phoneDigits = phone.replace(/\D/g, '');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phoneDigits,
          phone_verified: true,
          email_verified: true,
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

  const canSubmit = emailVerified && phoneVerified && !loading;

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
        <div className="glass-crystal rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
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

          {/* Verification Status */}
          <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Estado de verificación:</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${emailVerified ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                <span className={`text-xs ${emailVerified ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                  Email
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${phoneVerified ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                <span className={`text-xs ${phoneVerified ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                  Teléfono
                </span>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
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

            {/* Email with verification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t('register.emailPlaceholder')}
                  required
                  disabled={emailVerified}
                  className="w-full pl-10 pr-24 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400 disabled:opacity-60"
                />
                {emailVerified ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-xs font-medium">{t('register.emailVerified')}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={sendEmailVerificationCode}
                    disabled={!isValidEmail() || sendingEmailCode || emailCountdown > 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-am-navy dark:bg-am-orange text-white text-xs font-medium rounded-md hover:bg-am-navy-light dark:hover:bg-am-orange-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {sendingEmailCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : emailCountdown > 0 ? (
                      `${emailCountdown}s`
                    ) : (
                      t('register.sendEmailCode')
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Email Verification Code Input */}
            {emailCodeSent && !emailVerified && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg space-y-3">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {t('register.emailCodeSent')}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={emailVerificationCode}
                    onChange={(e) => setEmailVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={t('register.verificationCodePlaceholder')}
                    maxLength={6}
                    className="flex-1 px-4 py-2 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400 text-center text-lg tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={verifyEmailCode}
                    disabled={emailVerificationCode.length !== 6 || verifyingEmailCode}
                    className="px-4 py-2 bg-am-green text-white font-medium rounded-lg hover:bg-am-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {verifyingEmailCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      t('register.verifyCode')
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Phone with verification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.phone')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={t('register.phonePlaceholder')}
                  required
                  disabled={phoneVerified}
                  className="w-full pl-10 pr-24 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400 disabled:opacity-60"
                />
                {phoneVerified ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-xs font-medium">{t('register.phoneVerified')}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={sendPhoneVerificationCode}
                    disabled={!isValidPhone() || sendingPhoneCode || phoneCountdown > 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-am-navy dark:bg-am-orange text-white text-xs font-medium rounded-md hover:bg-am-navy-light dark:hover:bg-am-orange-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {sendingPhoneCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : phoneCountdown > 0 ? (
                      `${phoneCountdown}s`
                    ) : (
                      t('register.sendCode')
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Phone Verification Code Input */}
            {phoneCodeSent && !phoneVerified && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg space-y-3">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {t('register.codeSent')}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={phoneVerificationCode}
                    onChange={(e) => setPhoneVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={t('register.verificationCodePlaceholder')}
                    maxLength={6}
                    className="flex-1 px-4 py-2 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400 text-center text-lg tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={verifyPhoneCode}
                    disabled={phoneVerificationCode.length !== 6 || verifyingPhoneCode}
                    className="px-4 py-2 bg-am-green text-white font-medium rounded-lg hover:bg-am-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {verifyingPhoneCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      t('register.verifyCode')
                    )}
                  </button>
                </div>
              </div>
            )}

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
              disabled={!canSubmit}
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

            {/* Verification reminder */}
            {(!emailVerified || !phoneVerified) && (
              <p className="text-xs text-center text-amber-600 dark:text-amber-400">
                {t('register.verifyBothRequired')}
              </p>
            )}
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
