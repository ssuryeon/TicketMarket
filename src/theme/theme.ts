export const theme = {
  color: {
    bg: '#FBFBFD',
    card: '#FFFFFF',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    accentSoft: '#EDF1FE',
    ink: '#0F172A',
    muted: '#64748B',
    mutedLight: '#94A3B8',
    border: '#E3E8F0',
    green: '#16A34A',
    greenSoft: '#E8F6ED',
    seatStage: '#6B6B6B',
    seatEmpty: '#D7DCE5',
    seatPicked: '#7C6FE0',
    seatSelected: '#3B82F6',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '999px',
  },
  shadow: {
    card: '0 1px 3px rgba(15, 23, 42, 0.05)',
    cardHover: '0 4px 16px rgba(15, 23, 42, 0.08)',
  },
  font: {
    sans: "'Inter', 'Pretendard', system-ui, -apple-system, sans-serif",
  },
  layout: {
    maxWidth: '1280px',
    pagePadding: '0 120px',
    navHeight: '64px',
  },
} as const;

export type Theme = typeof theme;
