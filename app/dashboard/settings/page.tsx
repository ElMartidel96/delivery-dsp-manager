'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Save,
  Loader2,
  CheckCircle,
  Camera,
  Lock,
  Eye,
  EyeOff,
  X,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  role: string;
  avatar_url: string | null;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState('');

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  // Password change modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || '');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: profileData } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single() as { data: Profile | null };

        if (profileData) {
          setProfile(profileData);
          setFullName(profileData.full_name || '');
          setPhone(profileData.phone || '');
          setAddress(profileData.address || '');
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('profiles')
      .update({
        full_name: fullName,
        phone: phone,
        address: address,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', profile?.user_id);

    setSaving(false);

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess(false);

    // Validations
    if (!currentPassword) {
      setPasswordError('Ingresa tu contraseña actual');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    setChangingPassword(true);

    try {
      const supabase = createClient();

      // First, verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: currentPassword,
      });

      if (signInError) {
        setPasswordError('La contraseña actual es incorrecta');
        setChangingPassword(false);
        return;
      }

      // Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setPasswordError('Error al cambiar la contraseña: ' + updateError.message);
        setChangingPassword(false);
        return;
      }

      // Success
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(false);
      }, 2000);

    } catch {
      setPasswordError('Error al cambiar la contraseña');
    } finally {
      setChangingPassword(false);
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordError('');
    setPasswordSuccess(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-am-navy dark:text-am-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Configuración
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Administra tu cuenta y preferencias
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Información Personal
          </h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-am-navy to-am-orange flex items-center justify-center text-white text-2xl font-bold">
                {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <Link href="/coming-soon" className="absolute bottom-0 right-0 p-1.5 bg-am-navy dark:bg-am-orange rounded-full text-white hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{fullName || 'Usuario'}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{profile?.role || 'customer'}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Dirección
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="Tu dirección"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Notificaciones por Email</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recibe actualizaciones en tu correo</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.email ? 'bg-am-green' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.email ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Notificaciones Push</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recibe alertas en tu dispositivo</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.push ? 'bg-am-green' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.push ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Notificaciones SMS</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recibe mensajes de texto</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.sms ? 'bg-am-green' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.sms ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Apariencia
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Tema</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Selecciona el modo de visualización</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`p-2.5 rounded-lg border transition-all ${
                  theme === 'light'
                    ? 'bg-am-navy text-white border-am-navy'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-am-navy'
                }`}
              >
                <Sun className="w-5 h-5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2.5 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'bg-am-orange text-white border-am-orange'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-am-orange'
                }`}
              >
                <Moon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Seguridad
          </h2>
        </div>
        <div className="p-6">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="inline-block px-4 py-2 text-sm font-medium text-am-navy dark:text-am-orange border border-am-navy dark:border-am-orange rounded-lg hover:bg-am-navy/10 dark:hover:bg-am-orange/10 transition-colors"
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-am-navy dark:bg-am-orange text-white rounded-lg font-semibold hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Guardar Cambios
            </>
          )}
        </button>

        {saved && (
          <div className="flex items-center gap-2 text-am-green">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Cambios guardados</span>
          </div>
        )}
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePasswordModal}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
            {/* Close button */}
            <button
              onClick={closePasswordModal}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-am-navy/10 dark:bg-am-orange/10 rounded-lg">
                <Lock className="w-6 h-6 text-am-navy dark:text-am-orange" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cambiar Contraseña
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ingresa tu contraseña actual y la nueva
                </p>
              </div>
            </div>

            {/* Success Message */}
            {passwordSuccess && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  ¡Contraseña cambiada exitosamente!
                </p>
              </div>
            )}

            {/* Error Message */}
            {passwordError && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-700 dark:text-red-300">{passwordError}</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Contraseña Actual
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Confirmar Nueva Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                    placeholder="Repite la nueva contraseña"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closePasswordModal}
                  className="flex-1 px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleChangePassword}
                  disabled={changingPassword || passwordSuccess}
                  className="flex-1 px-4 py-2.5 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {changingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Cambiando...
                    </>
                  ) : (
                    'Cambiar Contraseña'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
