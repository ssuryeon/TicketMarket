import styled, { css } from 'styled-components';

export const Page = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 40px 120px 96px;

  @media (max-width: 1024px) {
    padding: 32px 24px 72px;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

export const PageSubtitle = styled.p`
  margin: 12px 0 0;
  font-size: 15px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.5;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 0;
`;

type ButtonVariant = 'primary' | 'outline';

export const Button = styled.button<{ $variant?: ButtonVariant; $full?: boolean }>`
  height: 50px;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 14px;
  font-weight: 600;
  width: ${({ $full }) => ($full ? '100%' : 'auto')};
  transition: background 0.15s ease, border-color 0.15s ease;

  ${({ $variant = 'primary', theme }) =>
    $variant === 'primary'
      ? css`
          border: none;
          background: ${theme.color.accent};
          color: #fff;
          &:hover { background: ${theme.color.accentHover}; }
        `
      : css`
          border: 1px solid ${theme.color.border};
          background: ${theme.color.card};
          color: ${theme.color.ink};
          &:hover { border-color: ${theme.color.mutedLight}; }
        `}
`;

type BadgeTone = 'accent' | 'green';

export const Badge = styled.span<{ $tone?: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 11px;
  font-weight: 500;

  ${({ $tone = 'accent', theme }) =>
    $tone === 'green'
      ? css`
          background: ${theme.color.greenSoft};
          color: ${theme.color.green};
        `
      : css`
          background: ${theme.color.accentSoft};
          color: ${theme.color.accent};
        `}
`;

export const Eyebrow = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.color.mutedLight};
`;

export const formatKRW = (value: number): string =>
  new Intl.NumberFormat('ko-KR').format(value);
