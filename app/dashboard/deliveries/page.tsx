import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  MapPin,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Delivery {
  id: string;
  tracking_number: string;
  status: string;
  customer_name: string;
  customer_phone: string | null;
  delivery_address: string;
  pickup_address: string | null;
  driver_id: string | null;
  created_at: string;
  scheduled_time: string | null;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Pendiente' },
  assigned: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Asignado' },
  picked_up: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'Recogido' },
  in_transit: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400', label: 'En Tránsito' },
  delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Entregado' },
  failed: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Fallido' },
};

export default async function DeliveriesPage() {
  const supabase = await createClient();

  // Fetch all deliveries
  const { data: deliveriesData } = await supabase
    .from('deliveries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  const deliveries = (deliveriesData as Delivery[]) || [];

  // Count by status
  const counts = {
    all: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    in_progress: deliveries.filter(d => ['assigned', 'picked_up', 'in_transit'].includes(d.status)).length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    failed: deliveries.filter(d => d.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Entregas
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona todas las entregas del sistema
          </p>
        </div>
        <Link
          href="/dashboard/deliveries/new"
          className="flex items-center gap-2 px-4 py-2 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Entrega
        </Link>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'Todas', count: counts.all },
          { key: 'pending', label: 'Pendientes', count: counts.pending },
          { key: 'in_progress', label: 'En Progreso', count: counts.in_progress },
          { key: 'delivered', label: 'Entregadas', count: counts.delivered },
          { key: 'failed', label: 'Fallidas', count: counts.failed },
        ].map((tab) => (
          <button
            key={tab.key}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              tab.key === 'all'
                ? 'bg-am-navy dark:bg-am-orange text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {tab.label}
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/20">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por tracking, cliente o dirección..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
          />
        </div>
        <Link href="/coming-soon" className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Filter className="w-5 h-5" />
          Filtros
        </Link>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {deliveries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tracking
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Dirección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Conductor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {deliveries.map((delivery) => {
                  const config = statusConfig[delivery.status] || statusConfig.pending;
                  return (
                    <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-am-navy/10 dark:bg-am-navy/30 rounded-lg">
                            <Package className="w-4 h-4 text-am-navy dark:text-blue-400" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {delivery.tracking_number}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', config.bg, config.text)}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 dark:text-white">{delivery.customer_name}</p>
                        {delivery.customer_phone && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{delivery.customer_phone}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2 max-w-[200px]">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {delivery.delivery_address}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {delivery.driver_id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-am-green flex items-center justify-center">
                              <Truck className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Asignado</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 dark:text-gray-500">Sin asignar</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(delivery.created_at).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(delivery.created_at).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/coming-soon" className="inline-block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No hay entregas
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Comienza creando tu primera entrega
            </p>
            <Link
              href="/dashboard/deliveries/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
            >
              <Plus className="w-5 h-5" />
              Crear Entrega
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {deliveries.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {deliveries.length} entregas
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50" disabled>
              Anterior
            </button>
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
