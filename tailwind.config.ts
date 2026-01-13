import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Dynamic color classes for dark mode contrast
    'text-blue-400',
    'bg-blue-400',
    'border-blue-400/30',
    'bg-blue-400/20',
    // Brand colors (dynamic usage)
    'text-am-orange',
    'text-am-green',
    'text-am-navy',
    'bg-am-orange',
    'bg-am-green',
    'bg-am-navy',
    'border-am-orange/20',
    'border-am-orange/30',
    'border-am-green/20',
    'border-am-green/30',
    'border-am-navy/20',
    'border-am-navy/30',
    'bg-am-orange/10',
    'bg-am-orange/20',
    'bg-am-green/10',
    'bg-am-green/20',
    'bg-am-navy/10',
    'bg-am-navy/20',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%',
      },
    },
    extend: {
      colors: {
        // AUTOS MALL LLC Brand Colors
        'am-navy': '#1e3a5f',
        'am-navy-light': '#2d5a8a',
        'am-orange': '#f5a623',
        'am-orange-light': '#ffc107',
        'am-green': '#7cb342',
        'am-green-light': '#9ccc65',
        'am-cream': '#fef3c7',
        // Shadcn/UI semantic colors
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
