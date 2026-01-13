import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Navigation,
  Phone,
  User,
  AlertCircle,
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
  notes: string | null;
  scheduled_time: string | null;
  created_at: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string; icon: React.ElementType }> = {
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Pendiente', icon: Clock },
  assigned: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Asignado', icon: Package },
  picked_up: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'Recogido', icon: Package },
  in_transit: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400', label: 'En Camino', icon: Navigation },
  delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Entregado', icon: CheckCircle },
  failed: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Fallido', icon: AlertCircle },
};

function DeliveryCard({ delivery }: { delivery: Delivery }) {
  const config = statusConfig[delivery.status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg', config.bg)}>
            <StatusIcon className={cn('w-5 h-5', config.text)} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{delivery.tracking_number}</p>
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', config.bg, config.text)}>
              {config.label}
            </span>
          </div>
        </div>
        {delivery.scheduled_time && (
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Hora programada</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(delivery.scheduled_time).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        )}
      </div>

      {/* Customer Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{delivery.customer_name}</p>
            {delivery.customer_phone && (
              <a
                href={`tel:${delivery.customer_phone}`}
                className="text-sm text-am-navy dark:text-am-orange hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                {delivery.customer_phone}
              </a>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-am-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Entregar en</p>
            <p className="text-gray-900 dark:text-white">{delivery.delivery_address}</p>
          </div>
        </div>

        {delivery.notes && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Nota:</strong> {delivery.notes}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex gap-2">
        {delivery.status === 'assigned' && (
          <Link href="/coming-soon" className="flex-1 py-2 px-4 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors text-sm text-center">
            Iniciar Recogida
          </Link>
        )}
        {delivery.status === 'picked_up' && (
          <Link href="/coming-soon" className="flex-1 py-2 px-4 bg-am-green text-white rounded-lg font-medium hover:bg-am-green-light transition-colors text-sm text-center">
            Iniciar Entrega
          </Link>
        )}
        {delivery.status === 'in_transit' && (
          <>
            <Link href="/coming-soon" className="flex-1 py-2 px-4 bg-am-green text-white rounded-lg font-medium hover:bg-am-green-light transition-colors text-sm text-center">
              Marcar Entregado
            </Link>
            <Link href="/coming-soon" className="py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm text-center">
              Reportar Problema
            </Link>
          </>
        )}
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(delivery.delivery_address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm flex items-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          Navegar
        </a>
      </div>
    </div>
  );
}

export default async function MyDeliveriesPage() {
  const t = await getTranslations('dashboard');
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get driver's deliveries for today
  const today = new Date().toISOString().split('T')[0];
  const { data: deliveriesData } = await supabase
    .from('deliveries')
    .select('*')
    .eq('driver_id', user?.id || '')
    .gte('created_at', today)
    .order('scheduled_time', { ascending: true });

  const deliveries = (deliveriesData as Delivery[]) || [];

  // Count by status
  const pending = deliveries.filter(d => ['pending', 'assigned'].includes(d.status)).length;
  const inProgress = deliveries.filter(d => ['picked_up', 'in_transit'].includes(d.status)).length;
  const completed = deliveries.filter(d => d.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Ruta de Hoy
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pending}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inProgress}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">En Progreso</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completed}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completadas</p>
        </div>
      </div>

      {/* Deliveries List */}
      {deliveries.length > 0 ? (
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <DeliveryCard key={delivery.id} delivery={delivery} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No tienes entregas asignadas hoy
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Las nuevas entregas aparecerán aquí cuando sean asignadas a tu ruta
          </p>
        </div>
      )}
    </div>
  );
}
