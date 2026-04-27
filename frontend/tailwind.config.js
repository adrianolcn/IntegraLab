/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        background: 'var(--bg-app)',
        surface: 'var(--bg-surface)',
        surfaceElevated: 'var(--bg-surface-elevated)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textMuted: 'var(--text-muted)',
        borderSubtle: 'var(--border-subtle)',
        borderStrong: 'var(--border-strong)',
        glowPrimary: 'var(--glow-primary)',
      }
    },
  },
  plugins: [],
}
