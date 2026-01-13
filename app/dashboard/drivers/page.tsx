import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Users,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Star,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Driver {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  vehicle_type: string | null;
  license_plate: string | null;
  rating: number | null;
  total_deliveries: number | null;
  created_at: string;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500', label: 'Activo' },
  inactive: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400', label: 'Inactivo' },
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500', label: 'Pendiente' },
  suspended: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500', label: 'Suspendido' },
};

export default async function DriversPage() {
  const supabase = await createClient();

  // Fetch all drivers
  const { data: driversData } = await supabase
    .from('drivers')
    .select('*')
    .order('created_at', { ascending: false });

  const drivers = (driversData as Driver[]) || [];

  // Count by status
  const counts = {
    all: drivers.length,
    active: drivers.filter(d => d.status === 'active').length,
    inactive: drivers.filter(d => d.status === 'inactive').length,
    pending: drivers.filter(d => d.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mi Equipo
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona conductores y su desempeño
          </p>
        </div>
        <Link
          href="/dashboard/drivers/new"
          className="flex items-center gap-2 px-4 py-2 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
        >
          <Plus className="w-5 h-5" />
          Agregar Conductor
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-am-navy/10 dark:bg-am-navy/30 rounded-lg">
              <Users className="w-5 h-5 text-am-navy dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{counts.all}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{counts.active}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Activos</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{counts.pending}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <XCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{counts.inactive}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Inactivos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
          />
        </div>
        <Link href="/coming-soon" className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Filter className="w-5 h-5" />
          Filtros
        </Link>
      </div>

      {/* Drivers Grid */}
      {drivers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((driver) => {
            const config = statusConfig[driver.status] || statusConfig.inactive;
            return (
              <div
                key={driver.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:border-am-navy dark:hover:border-am-orange transition-colors"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-am-navy to-am-orange flex items-center justify-center text-white font-bold text-lg">
                        {driver.full_name ? driver.full_name.charAt(0).toUpperCase() : 'D'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {driver.full_name || 'Sin nombre'}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className={cn('w-2 h-2 rounded-full', config.dot)} />
                          <span className={cn('text-xs font-medium', config.text)}>
                            {config.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link href="/coming-soon" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {driver.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 truncate">{driver.email}</span>
                    </div>
                  )}
                  {driver.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{driver.phone}</span>
                    </div>
                  )}
                  {driver.vehicle_type && (
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {driver.vehicle_type} {driver.license_plate && `(${driver.license_plate})`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {driver.rating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Package className="w-4 h-4" />
                    <span>{driver.total_deliveries || 0} entregas</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No hay conductores
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Comienza agregando tu primer conductor al equipo
          </p>
          <Link
            href="/dashboard/drivers/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
          >
            <Plus className="w-5 h-5" />
            Agregar Conductor
          </Link>
        </div>
      )}
    </div>
  );
}
