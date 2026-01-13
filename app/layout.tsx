import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AUTOS MALL LLC - Delivery Service Partner',
  description: 'AUTOS MALL LLC is your trusted Delivery Service Partner. Professional last-mile delivery services in Houston, Texas. Join our team of drivers or partner with us for reliable delivery solutions.',
  keywords: 'delivery, last-mile, UniUni, DSP, driver, package delivery, Houston, Texas, logistics, same-day delivery',
  authors: [{ name: 'AUTOS MALL LLC' }],
  creator: 'AUTOS MALL LLC',
  openGraph: {
    title: 'AUTOS MALL LLC - Delivery Service Partner',
    description: 'Professional last-mile delivery services in Houston, Texas. Join our team or partner with us.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUTOS MALL LLC',
    description: 'Your trusted Delivery Service Partner in Houston, Texas.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/logo_amall.PNG" type="image/png" />
        <link rel="apple-touch-icon" href="/logo_amall.PNG" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
              {children}
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
