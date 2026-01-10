import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import {
  Package,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  role: string;
}

interface Delivery {
  id: string;
  tracking_number: string;
  status: string;
  customer_name: string;
  delivery_address: string;
  created_at: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  iconBg: string;
}

function StatCard({ title, value, change, changeType = 'neutral', icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change && (
            <p
              className={cn(
                'mt-2 text-sm font-medium flex items-center gap-1',
                changeType === 'positive' && 'text-green-600 dark:text-green-400',
                changeType === 'negative' && 'text-red-600 dark:text-red-400',
                changeType === 'neutral' && 'text-gray-500 dark:text-gray-400'
              )}
            >
              {changeType === 'positive' && <TrendingUp className="w-4 h-4" />}
              {change}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconBg)}>{icon}</div>
      </div>
    </div>
  );
}

interface DeliveryRowProps {
  id: string;
  trackingNumber: string;
  status: string;
  customerName: string;
  address: string;
  time: string;
}

function DeliveryRow({ trackingNumber, status, customerName, address, time }: DeliveryRowProps) {
  const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Pending' },
    assigned: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Assigned' },
    picked_up: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'Picked Up' },
    in_transit: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400', label: 'In Transit' },
    delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Delivered' },
    failed: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Failed' },
  };

  const style = statusStyles[status] || statusStyles.pending;

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 last:border-0">
      <td className="py-4 pr-4">
        <p className="font-medium text-gray-900 dark:text-white">{trackingNumber}</p>
      </td>
      <td className="py-4 pr-4">
        <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', style.bg, style.text)}>
          {style.label}
        </span>
      </td>
      <td className="py-4 pr-4">
        <p className="text-gray-900 dark:text-white">{customerName}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{address}</p>
      </td>
      <td className="py-4 text-right">
        <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
      </td>
    </tr>
  );
}

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');
  const supabase = await createClient();

  // Get user profile for role-based content
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user?.id || '')
    .single();

  const profile = profileData as Profile | null;
  const role = profile?.role || 'customer';

  // Fetch statistics based on role
  let deliveriesCount = 0;
  let driversCount = 0;
  let pendingDeliveries = 0;
  let completedToday = 0;

  if (role === 'admin' || role === 'dispatcher') {
    // Get total deliveries
    const { count: totalDeliveries } = await supabase
      .from('deliveries')
      .select('*', { count: 'exact', head: true });
    deliveriesCount = totalDeliveries || 0;

    // Get active drivers
    const { count: activeDrivers } = await supabase
      .from('drivers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');
    driversCount = activeDrivers || 0;

    // Get pending deliveries
    const { count: pending } = await supabase
      .from('deliveries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    pendingDeliveries = pending || 0;

    // Get completed today
    const today = new Date().toISOString().split('T')[0];
    const { count: completed } = await supabase
      .from('deliveries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'delivered')
      .gte('delivered_at', today);
    completedToday = completed || 0;
  }

  // Get recent deliveries
  const { data: deliveriesData } = await supabase
    .from('deliveries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const recentDeliveries = deliveriesData as Delivery[] | null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('overview.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {t('overview.subtitle', { name: profile?.full_name || 'Usuario' })}
        </p>
      </div>

      {/* Stats Grid - Admin/Dispatcher View */}
      {(role === 'admin' || role === 'dispatcher') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t('stats.totalDeliveries')}
            value={deliveriesCount}
            change={t('stats.thisMonth')}
            changeType="neutral"
            icon={<Package className="w-6 h-6 text-white" />}
            iconBg="bg-am-navy"
          />
          <StatCard
            title={t('stats.activeDrivers')}
            value={driversCount}
            change={t('stats.online')}
            changeType="positive"
            icon={<Users className="w-6 h-6 text-white" />}
            iconBg="bg-am-green"
          />
          <StatCard
            title={t('stats.pendingDeliveries')}
            value={pendingDeliveries}
            change={t('stats.needsAttention')}
            changeType={pendingDeliveries > 10 ? 'negative' : 'neutral'}
            icon={<Clock className="w-6 h-6 text-white" />}
            iconBg="bg-am-orange"
          />
          <StatCard
            title={t('stats.completedToday')}
            value={completedToday}
            change={t('stats.deliveries')}
            changeType="positive"
            icon={<CheckCircle className="w-6 h-6 text-white" />}
            iconBg="bg-emerald-500"
          />
        </div>
      )}

      {/* Stats Grid - Driver View */}
      {role === 'driver' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t('stats.myDeliveriesToday')}
            value={0}
            change={t('stats.assigned')}
            changeType="neutral"
            icon={<Package className="w-6 h-6 text-white" />}
            iconBg="bg-am-navy"
          />
          <StatCard
            title={t('stats.completed')}
            value={0}
            change={t('stats.today')}
            changeType="positive"
            icon={<CheckCircle className="w-6 h-6 text-white" />}
            iconBg="bg-am-green"
          />
          <StatCard
            title={t('stats.pending')}
            value={0}
            change={t('stats.toDeliver')}
            changeType="neutral"
            icon={<Clock className="w-6 h-6 text-white" />}
            iconBg="bg-am-orange"
          />
          <StatCard
            title={t('stats.earnings')}
            value="$0.00"
            change={t('stats.thisWeek')}
            changeType="positive"
            icon={<DollarSign className="w-6 h-6 text-white" />}
            iconBg="bg-emerald-500"
          />
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Deliveries */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('recentDeliveries.title')}
              </h2>
              <a
                href="/dashboard/deliveries"
                className="text-sm text-am-navy dark:text-am-orange hover:underline font-medium"
              >
                {t('recentDeliveries.viewAll')}
              </a>
            </div>
          </div>
          <div className="p-6">
            {recentDeliveries && recentDeliveries.length > 0 ? (
              <table className="w-full">
                <tbody>
                  {recentDeliveries.map((delivery) => (
                    <DeliveryRow
                      key={delivery.id}
                      id={delivery.id}
                      trackingNumber={delivery.tracking_number}
                      status={delivery.status}
                      customerName={delivery.customer_name}
                      address={delivery.delivery_address}
                      time={new Date(delivery.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">{t('recentDeliveries.empty')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('quickActions.title')}
            </h2>
          </div>
          <div className="p-6 space-y-3">
            {(role === 'admin' || role === 'dispatcher') && (
              <>
                <a
                  href="/dashboard/deliveries/new"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-am-navy/10 dark:bg-am-navy/30 rounded-lg">
                    <Package className="w-5 h-5 text-am-navy dark:text-am-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('quickActions.newDelivery')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('quickActions.newDeliveryDesc')}
                    </p>
                  </div>
                </a>
                <a
                  href="/dashboard/drivers"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-am-green/10 dark:bg-am-green/30 rounded-lg">
                    <Users className="w-5 h-5 text-am-green" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('quickActions.manageDrivers')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('quickActions.manageDriversDesc')}
                    </p>
                  </div>
                </a>
                <a
                  href="/dashboard/tracking"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-am-orange/10 dark:bg-am-orange/30 rounded-lg">
                    <Truck className="w-5 h-5 text-am-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('quickActions.liveTracking')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('quickActions.liveTrackingDesc')}
                    </p>
                  </div>
                </a>
              </>
            )}

            {role === 'driver' && (
              <>
                <a
                  href="/dashboard/my-deliveries"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-am-navy/10 dark:bg-am-navy/30 rounded-lg">
                    <Package className="w-5 h-5 text-am-navy dark:text-am-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('quickActions.viewMyDeliveries')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('quickActions.viewMyDeliveriesDesc')}
                    </p>
                  </div>
                </a>
                <a
                  href="/dashboard/my-earnings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-am-green/10 dark:bg-am-green/30 rounded-lg">
                    <DollarSign className="w-5 h-5 text-am-green" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('quickActions.viewEarnings')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('quickActions.viewEarningsDesc')}
                    </p>
                  </div>
                </a>
              </>
            )}

            {/* Alerts Section */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{t('quickActions.alerts')}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('quickActions.noAlerts')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
