/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        border: 'var(--color-border)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        btn: '6px',
        card: '20px',
      },
      spacing: {
        // Strict 8px spacing scale (8, 16, 24, 32, 48, 64, 96, 128)
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      maxWidth: {
        content: '1280px',
      },
      letterSpacing: {
        tightest: '-0.02em',
        mono: '0.12em',
      },
      fontSize: {
        'h1': 'clamp(3rem, 8vw, 7.5rem)',
        'h2': 'clamp(2.25rem, 5vw, 4rem)',
        'h3': '1.5rem',
        'mono-sm': ['12px', { letterSpacing: '0.12em', lineHeight: '1.2' }],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        editorial: '700ms',
      }
    },
  },
  plugins: [],
}

