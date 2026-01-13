'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import {
  Bell,
  Search,
  Menu,
  LogOut,
  User as UserIcon,
  Settings,
  ChevronDown,
} from 'lucide-react';

interface Profile {
  id: string;
  full_name: string | null;
  role: string;
}

interface HeaderProps {
  user: User;
  profile: Profile | null;
}

export function DashboardHeader({ user, profile }: HeaderProps) {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      admin: { label: 'Admin', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
      dispatcher: { label: 'Dispatcher', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      driver: { label: 'Driver', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      customer: { label: 'Customer', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
    };
    return badges[role] || badges.customer;
  };

  const roleBadge = getRoleBadge(profile?.role || 'customer');

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left side - Mobile menu + Search */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center">
            <Link href="/coming-soon" className="relative block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <div className="w-64 pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-400 cursor-pointer hover:border-am-navy dark:hover:border-am-orange transition-colors">
                {t('header.search')}
              </div>
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme & Language */}
          <div className="hidden sm:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Notifications */}
          <Link href="/coming-soon" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-am-orange rounded-full" />
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-am-navy flex items-center justify-center text-white text-sm font-semibold">
                {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {profile?.full_name || 'Usuario'}
                </p>
                <span className={`text-xs px-1.5 py-0.5 rounded ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {profile?.full_name || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/coming-soon"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <UserIcon className="w-4 h-4" />
                    {t('header.profile')}
                  </Link>
                  <a
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4" />
                    {t('header.settings')}
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('header.signOut')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
