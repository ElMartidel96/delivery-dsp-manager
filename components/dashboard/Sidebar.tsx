'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { User } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  FileText,
  Car,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Profile {
  id: string;
  full_name: string | null;
  role: string;
}

interface SidebarProps {
  user: User;
  profile: Profile | null;
}

export function DashboardSidebar({ user, profile }: SidebarProps) {
  const t = useTranslations('dashboard');
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const role = profile?.role || 'customer';

  // Navegación según rol
  const getNavItems = () => {
    const baseItems = [
      {
        label: t('nav.overview'),
        href: '/dashboard',
        icon: LayoutDashboard,
      },
    ];

    if (role === 'admin' || role === 'dispatcher') {
      return [
        ...baseItems,
        {
          label: t('nav.deliveries'),
          href: '/dashboard/deliveries',
          icon: Package,
        },
        {
          label: t('nav.drivers'),
          href: '/dashboard/drivers',
          icon: Users,
        },
        {
          label: t('nav.vehicles'),
          href: '/dashboard/vehicles',
          icon: Car,
        },
        {
          label: t('nav.tracking'),
          href: '/dashboard/tracking',
          icon: MapPin,
        },
        {
          label: t('nav.payments'),
          href: '/dashboard/payments',
          icon: DollarSign,
        },
        {
          label: t('nav.reports'),
          href: '/dashboard/reports',
          icon: BarChart3,
        },
        {
          label: t('nav.documents'),
          href: '/dashboard/documents',
          icon: FileText,
        },
      ];
    }

    if (role === 'driver') {
      return [
        ...baseItems,
        {
          label: t('nav.myDeliveries'),
          href: '/dashboard/my-deliveries',
          icon: Package,
        },
        {
          label: t('nav.myEarnings'),
          href: '/dashboard/my-earnings',
          icon: DollarSign,
        },
        {
          label: t('nav.myVehicle'),
          href: '/dashboard/my-vehicle',
          icon: Truck,
        },
        {
          label: t('nav.myDocuments'),
          href: '/dashboard/my-documents',
          icon: FileText,
        },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const bottomItems = [
    {
      label: t('nav.settings'),
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      label: t('nav.help'),
      href: '/dashboard/help',
      icon: HelpCircle,
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
          collapsed ? 'w-20' : 'w-72',
          'hidden lg:flex'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center flex-1 min-w-0">
            {collapsed ? (
              <div className="w-10 h-10 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-gray-200 dark:border-white/20 overflow-hidden hover:bg-white/70 dark:hover:bg-white/20 transition-colors">
                <Image
                  src="/logo_amall.PNG"
                  alt="AM"
                  width={60}
                  height={33}
                  className="object-cover object-left scale-150"
                />
              </div>
            ) : (
              <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg p-1.5 border border-gray-200 dark:border-white/20 hover:bg-white/70 dark:hover:bg-white/20 transition-colors">
                <Image
                  src="/logo_amall.PNG"
                  alt="AUTOS MALL LLC"
                  width={140}
                  height={77}
                  className="object-contain h-9 w-auto"
                />
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 ml-2"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-am-navy text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-white')} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom items */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-am-navy text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 rounded-full bg-am-navy flex items-center justify-center text-white font-semibold">
                {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {profile?.full_name || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile overlay - TODO: agregar menú móvil */}
    </>
  );
}
