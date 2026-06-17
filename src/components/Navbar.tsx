import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginModalStore } from '../stores/loginModalStore';
import { useEffect } from 'react';
import { userStore } from '../stores/userStore';
interface NavItem {
  path: string;
  label: string;
  activeOn: string[];
}

const NAV_ITEMS: NavItem[] = [
  { path: '/events', label: '공연목록', activeOn: ['/events', '/events/seats'] },
  { path: '/market', label: '마켓', activeOn: ['/market'] },
  { path: '/tickets', label: '내 티켓', activeOn: ['/tickets'] },
  { path: '/register', label: '판매등록', activeOn: ['/register'] },
];

export function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const storedUser = localStorage.getItem('user-storage');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const authed = Boolean(user?.state?.token);

  const setIsClicked = loginModalStore((state) => state.setIsClicked);
  const logOut = userStore((state) => state.logOut);
  useEffect(() => {
    setIsClicked(false);
  }, []);
  
  return (
    <Bar>
      <Inner>
        <Brand onClick={() => navigate('/')}>
          <Logo aria-hidden />
          <BrandName>ChainPass</BrandName>
        </Brand>

        <Links>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              $active={item.activeOn.includes(pathname)}
              onClick={() => {
                if(authed) navigate(item.path);
              }}
              canClick={authed}
            >
              {item.label}
            </Link>
          ))}
        </Links>

        <Auth>
          {authed ? (
            <PrimaryPill type="button" onClick={() => {
              logOut();
              navigate('/');
            }}>로그아웃</PrimaryPill>
          ) : (
            <>
              <PrimaryPill type="button" onClick={() => navigate('/signup')}>회원가입</PrimaryPill>
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

const Link = styled.button<{ $active: boolean, canClick: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active, theme }) => ($active ? theme.color.ink : theme.color.muted)};
  transition: color 0.15s ease;
  cursor: ${({canClick}) => (canClick ? 'pointer' : 'not-allowed')};
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
