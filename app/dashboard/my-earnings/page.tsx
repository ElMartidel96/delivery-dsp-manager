'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - in production this would come from the database
const weeklyEarnings = [
  { day: 'Lun', amount: 145.50, deliveries: 12 },
  { day: 'Mar', amount: 178.25, deliveries: 15 },
  { day: 'Mié', amount: 132.00, deliveries: 11 },
  { day: 'Jue', amount: 195.75, deliveries: 16 },
  { day: 'Vie', amount: 210.50, deliveries: 18 },
  { day: 'Sáb', amount: 165.00, deliveries: 14 },
  { day: 'Dom', amount: 0, deliveries: 0 },
];

const recentPayments = [
  { id: 1, date: '2026-01-06', amount: 1027.00, status: 'completed', method: 'Depósito Directo' },
  { id: 2, date: '2025-12-30', amount: 945.50, status: 'completed', method: 'Depósito Directo' },
  { id: 3, date: '2025-12-23', amount: 1102.25, status: 'completed', method: 'Depósito Directo' },
  { id: 4, date: '2025-12-16', amount: 878.75, status: 'completed', method: 'Depósito Directo' },
];

const earningsBreakdown = [
  { label: 'Entregas Base', amount: 850.00, percentage: 78 },
  { label: 'Bonos de Puntualidad', amount: 125.00, percentage: 11 },
  { label: 'Propinas', amount: 52.00, percentage: 5 },
  { label: 'Bonos de Fin de Semana', amount: 65.00, percentage: 6 },
];

export default function MyEarningsPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const totalWeekly = weeklyEarnings.reduce((sum, day) => sum + day.amount, 0);
  const totalDeliveries = weeklyEarnings.reduce((sum, day) => sum + day.deliveries, 0);
  const avgPerDelivery = totalDeliveries > 0 ? totalWeekly / totalDeliveries : 0;
  const maxAmount = Math.max(...weeklyEarnings.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mis Ganancias
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Resumen de tus ingresos y pagos
          </p>
        </div>
        <Link href="/coming-soon" className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Download className="w-4 h-4" />
          Exportar
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-am-green/10 dark:bg-am-green/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-am-green" />
            </div>
            <span className="flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="w-4 h-4" />
              +12%
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Esta Semana</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalWeekly.toFixed(2)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-am-navy/10 dark:bg-am-navy/20 rounded-lg">
              <Package className="w-6 h-6 text-am-navy dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Entregas</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalDeliveries}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-am-orange/10 dark:bg-am-orange/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-am-orange" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Promedio/Entrega</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${avgPerDelivery.toFixed(2)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Próximo Pago</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalWeekly.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lunes, 13 Ene</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ganancias Semanales
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedWeek(prev => prev + 1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[120px] text-center">
              {selectedWeek === 0 ? 'Esta Semana' : `Hace ${selectedWeek} semana${selectedWeek > 1 ? 's' : ''}`}
            </span>
            <button
              onClick={() => setSelectedWeek(prev => Math.max(0, prev - 1))}
              disabled={selectedWeek === 0}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyEarnings.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    ${day.amount.toFixed(0)}
                  </span>
                  <div
                    className={cn(
                      'w-full max-w-[40px] rounded-t-lg transition-all',
                      day.amount > 0 ? 'bg-gradient-to-t from-am-navy to-am-green' : 'bg-gray-200 dark:bg-gray-700'
                    )}
                    style={{
                      height: maxAmount > 0 ? `${(day.amount / maxAmount) * 140}px` : '4px',
                      minHeight: day.amount > 0 ? '20px' : '4px',
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Earnings Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Desglose de Ganancias
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {earningsBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">${item.amount.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-am-navy to-am-green rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-xl font-bold text-am-green">
                ${earningsBreakdown.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Historial de Pagos
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${payment.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(payment.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    Completado
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{payment.method}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <Link href="/coming-soon" className="block w-full text-center text-sm text-am-navy dark:text-am-orange font-medium hover:underline">
              Ver todo el historial
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gradient-to-r from-am-navy to-am-navy-light rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <CreditCard className="w-8 h-8 text-am-orange flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Información de Pago</h3>
            <p className="text-gray-300 text-sm mb-4">
              Los pagos se procesan cada lunes y se depositan en 1-2 días hábiles.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-400">Cuenta</p>
                <p className="font-medium">****4521</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Banco</p>
                <p className="font-medium">Chase Bank</p>
              </div>
              <Link href="/coming-soon" className="ml-auto text-sm text-am-orange hover:underline">
                Actualizar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
