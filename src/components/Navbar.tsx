import styled from 'styled-components';
import type { RouteKey } from '../types';
import { useState } from 'react';
import { logIn } from '../utils/auth';

interface NavItem {
  key: RouteKey;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'events', label: '공연목록' },
  { key: 'market', label: '마켓' },
  { key: 'tickets', label: '내 티켓' },
  { key: 'register', label: '판매등록' },
];

interface NavbarProps {
  active: string;
  onNavigate: (key: RouteKey) => void;
  authed?: boolean;
}

export function Navbar({ active, onNavigate, authed = false }: NavbarProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Bar>
      <Inner>
        <Brand onClick={() => onNavigate('home')}>
          <Logo aria-hidden />
          <BrandName>ChainPass</BrandName>
        </Brand>

        <Links>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              $active={active === item.key}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </Link>
          ))}
        </Links>

        <Auth>
          {authed ? (
            <PrimaryPill type="button">로그아웃</PrimaryPill>
          ) : (
            <>
              <PrimaryPill type="button" onClick={() => onNavigate('signup')}>회원가입</PrimaryPill>
              <GhostText type="button" onClick={() => setIsClicked(true)}>로그인</GhostText>
            </>
          )}
        </Auth>
      </Inner>
    </Bar>
  );
}

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  height: ${({ theme }) => theme.layout.navHeight};
  background: ${({ theme }) => theme.color.card};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Inner = styled.div`
  height: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.pagePadding};
  display: flex;
  align-items: center;
  gap: 56px;

  @media (max-width: 1024px) {
    padding: 0 24px;
    gap: 28px;
  }
`;

const Brand = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  padding: 0;
`;

const Logo = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: ${({ theme }) => theme.color.accent};
`;

const BrandName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 48px;
  flex: 1;

  @media (max-width: 1024px) {
    gap: 24px;
  }
`;

const Link = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active, theme }) => ($active ? theme.color.ink : theme.color.muted)};
  transition: color 0.15s ease;

  &:hover { color: ${({ theme }) => theme.color.ink}; }
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const PrimaryPill = styled.button`
  height: 36px;
  padding: 0 18px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.accent};
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s ease;

  &:hover { background: ${({ theme }) => theme.color.accentHover}; }
`;

const GhostText = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;
