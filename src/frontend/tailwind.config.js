import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                success: {
                    DEFAULT: 'oklch(var(--success) / <alpha-value>)',
                    foreground: 'oklch(var(--success-foreground))'
                },
                warning: {
                    DEFAULT: 'oklch(var(--warning) / <alpha-value>)',
                    foreground: 'oklch(var(--warning-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                teal: {
                    50: 'oklch(0.98 0.02 185)',
                    100: 'oklch(0.94 0.04 185)',
                    200: 'oklch(0.87 0.08 185)',
                    300: 'oklch(0.77 0.12 185)',
                    400: 'oklch(0.67 0.15 185)',
                    500: 'oklch(0.58 0.16 185)',
                    600: 'oklch(0.50 0.15 185)',
                    700: 'oklch(0.42 0.13 185)',
                    800: 'oklch(0.34 0.11 185)',
                    900: 'oklch(0.26 0.09 185)',
                    950: 'oklch(0.19 0.07 185)',
                },
                slate: {
                    50: 'oklch(0.99 0.002 210)',
                    100: 'oklch(0.96 0.006 210)',
                    200: 'oklch(0.92 0.008 210)',
                    300: 'oklch(0.86 0.010 210)',
                    400: 'oklch(0.66 0.013 210)',
                    500: 'oklch(0.51 0.014 210)',
                    600: 'oklch(0.41 0.015 210)',
                    700: 'oklch(0.36 0.016 210)',
                    800: 'oklch(0.26 0.017 210)',
                    900: 'oklch(0.20 0.018 210)',
                    950: 'oklch(0.14 0.018 210)',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xl: 'calc(var(--radius) + 2px)',
                '2xl': 'calc(var(--radius) + 6px)',
            },
            boxShadow: {
                xs: 'var(--shadow-sm)',
                sm: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
            },
            spacing: {
                xs: 'var(--spacing-xs)',
                sm: 'var(--spacing-sm)',
                md: 'var(--spacing-md)',
                lg: 'var(--spacing-lg)',
                xl: 'var(--spacing-xl)',
                '2xl': 'var(--spacing-2xl)',
            },
            fontFamily: {
                sans: [
                    'Inter',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif'
                ],
            },
            fontSize: {
                xs: ['var(--text-xs)', { lineHeight: 'var(--leading-normal)' }],
                sm: ['var(--text-sm)', { lineHeight: 'var(--leading-normal)' }],
                base: ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
                lg: ['var(--text-lg)', { lineHeight: 'var(--leading-normal)' }],
                xl: ['var(--text-xl)', { lineHeight: 'var(--leading-tight)' }],
                '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-tight)' }],
                '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-tight)' }],
                '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)' }],
            },
            fontWeight: {
                normal: 'var(--font-normal)',
                medium: 'var(--font-medium)',
                semibold: 'var(--font-semibold)',
                bold: 'var(--font-bold)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                slideIn: {
                    from: { transform: 'translateY(-10px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' }
                },
                scaleIn: {
                    from: { transform: 'scale(0.95)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fadeIn': 'fadeIn 0.3s ease-out',
                'slideIn': 'slideIn 0.3s ease-out',
                'scaleIn': 'scaleIn 0.3s ease-out',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
