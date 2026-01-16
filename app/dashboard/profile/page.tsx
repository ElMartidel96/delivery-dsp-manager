'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Truck,
  Award,
  Star,
  Package,
  Clock,
  Camera,
  Edit3,
  Save,
  X,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  role: string;
  avatar_url: string | null;
  created_at: string;
}

interface DriverStats {
  totalDeliveries: number;
  completedDeliveries: number;
  rating: number;
  totalEarnings: number;
  onTimeRate: number;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState('');
  const [stats, setStats] = useState<DriverStats>({
    totalDeliveries: 0,
    completedDeliveries: 0,
    rating: 4.9,
    totalEarnings: 0,
    onTimeRate: 98,
  });

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

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

        // Get driver stats
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { count: totalDeliveries } = await (supabase as any)
          .from('deliveries')
          .select('*', { count: 'exact', head: true })
          .eq('driver_id', user.id);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { count: completedDeliveries } = await (supabase as any)
          .from('deliveries')
          .select('*', { count: 'exact', head: true })
          .eq('driver_id', user.id)
          .eq('status', 'delivered');

        setStats(prev => ({
          ...prev,
          totalDeliveries: totalDeliveries || 0,
          completedDeliveries: completedDeliveries || 0,
        }));
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
      setEditing(false);
      setProfile(prev => prev ? { ...prev, full_name: fullName, phone, address } : null);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const cancelEdit = () => {
    setFullName(profile?.full_name || '');
    setPhone(profile?.phone || '');
    setAddress(profile?.address || '');
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-am-navy dark:text-am-orange" />
      </div>
    );
  }

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
      })
    : 'N/A';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mi Perfil
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Visualiza y edita tu informacion personal
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-am-green">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Cambios guardados</span>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-am-navy via-am-navy-light to-am-green" />

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-am-navy to-am-orange flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-am-navy dark:bg-am-orange rounded-full text-white hover:scale-110 transition-transform shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name and Role */}
            <div className="flex-1 sm:pb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {fullName || 'Usuario'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full font-medium',
                  profile?.role === 'driver' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                  profile?.role === 'admin' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                  profile?.role === 'dispatcher' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                  (!profile?.role || profile?.role === 'customer') && 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                )}>
                  {profile?.role === 'driver' ? 'Conductor' :
                   profile?.role === 'admin' ? 'Administrador' :
                   profile?.role === 'dispatcher' ? 'Despachador' : 'Cliente'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Miembro desde {memberSince}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="sm:pb-2">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Editar Perfil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-am-green text-white rounded-lg font-medium hover:bg-am-green-light transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Guardar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Only for drivers */}
      {profile?.role === 'driver' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="p-2 bg-am-navy/10 dark:bg-am-navy/20 rounded-lg w-fit mx-auto mb-2">
              <Package className="w-6 h-6 text-am-navy dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDeliveries}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Entregas Totales</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="p-2 bg-am-green/10 dark:bg-am-green/20 rounded-lg w-fit mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-am-green" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedDeliveries}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completadas</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg w-fit mx-auto mb-2">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rating}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Calificacion</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-2">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.onTimeRate}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Puntualidad</p>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Informacion Personal
          </h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Nombre Completo
              </label>
              {editing ? (
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
              ) : (
                <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  {fullName || 'No especificado'}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Correo Electronico
              </label>
              <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                {email}
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Verificado
                </span>
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Telefono
              </label>
              {editing ? (
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
              ) : (
                <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  {phone || 'No especificado'}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Direccion
              </label>
              {editing ? (
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                    placeholder="Tu direccion"
                  />
                </div>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {address || 'No especificado'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements - Only for drivers */}
      {profile?.role === 'driver' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5" />
              Logros y Reconocimientos
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="w-12 h-12 mx-auto mb-2 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-900" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Top Performer</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Enero 2026</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">100% On-Time</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Diciembre 2025</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">500 Entregas</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hito alcanzado</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Driver Pro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Certificado</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Security */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Seguridad de la Cuenta
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Contrasena</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ultima actualizacion hace 30 dias</p>
            </div>
            <a
              href="/dashboard/settings"
              className="px-4 py-2 text-sm font-medium text-am-navy dark:text-am-orange border border-am-navy dark:border-am-orange rounded-lg hover:bg-am-navy/10 dark:hover:bg-am-orange/10 transition-colors"
            >
              Cambiar Contrasena
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
