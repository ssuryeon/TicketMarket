import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Button, Card, Eyebrow } from '../components/ui';
import { Overlay } from '../components/Overlay';
import LoginModal from '../components/LoginModal';
import { featuredEvents, heroStats } from '../data/mock';
import { loginModalStore } from '../stores/loginModalStore';

export function Landing() {
  const navigate = useNavigate();
  const isClicked = loginModalStore(state => state.isClicked);
  const setIsClicked = loginModalStore(state => state.setIsClicked);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if(token !== '' && token !== null) navigate('/events');
  }, [])

  return (
    <>
      {isClicked? (<Overlay onClick={(e) => {if(e.target === e.currentTarget) setIsClicked(false);}}><LoginModal /></Overlay>) : null}
      <Navbar />
      <Wrap>
        <Hero>
          <Pill>
            <PillDot aria-hidden />
            블록체인 보안 · NFT 티켓 · 위조 제로
          </Pill>

          <Headline>
            라이브 이벤트의
            <br />
            <Accent>새로운 미래.</Accent>
          </Headline>

          <Lede>
            블록체인 위에서 이벤트 티켓을 사고, 팔고, 양도하세요.
            <br />
            위조 없이, 숨은 수수료 없이, 언제나 진짜 소유권.
          </Lede>

          <Ctas>
            <Button $variant="primary" onClick={() => navigate('/events')}>
              이벤트 둘러보기
            </Button>
            <Button $variant="outline" onClick={() => navigate('/register')}>
              티켓 판매등록
            </Button>
          </Ctas>

          <Stats>
            {heroStats.map((s, i) => (
              <Stat key={s.label} $divider={i < heroStats.length - 1}>
                <StatValue>{s.value}</StatValue>
                <StatLabel>{s.label}</StatLabel>
              </Stat>
            ))}
          </Stats>
        </Hero>

        <FeaturedLabel>추천 이벤트</FeaturedLabel>
        <Grid>
          {featuredEvents.map((ev) => (
            <EventCard key={ev.id} onClick={() => navigate('/events/seats')}>
              <CardTitle>{ev.title}</CardTitle>
              <CardMeta>{ev.venueDate}</CardMeta>
              <CardLine />
              <FloorLabel>최저가</FloorLabel>
              <PriceRow>
                <Price>
                  {ev.fromPrice} <Won>₩</Won>
                </Price>
                <Left>{ev.seatsLeft}</Left>
              </PriceRow>
            </EventCard>
          ))}
        </Grid>
      </Wrap>
    </>
  );
}

const Wrap = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 56px 120px 96px;

  @media (max-width: 1024px) {
    padding: 40px 24px 72px;
  }
`;

const Hero = styled.section`
  margin-bottom: 64px;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  font-size: 13px;
  font-weight: 500;
`;

const PillDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.accent};
`;

const Headline = styled.h1`
  margin: 28px 0 0;
  font-size: 64px;
  line-height: 1.12;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.color.ink};

  @media (max-width: 1024px) {
    font-size: 44px;
  }
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.color.accent};
`;

const Lede = styled.p`
  margin: 28px 0 0;
  font-size: 17px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.muted};
`;

const Ctas = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 36px;
`;

const Stats = styled.div`
  display: flex;
  margin-top: 56px;
`;

const Stat = styled.div<{ $divider: boolean }>`
  padding-right: 48px;
  margin-right: 48px;
  border-right: ${({ $divider, theme }) =>
    $divider ? `1px solid ${theme.color.border}` : 'none'};

  @media (max-width: 1024px) {
    padding-right: 28px;
    margin-right: 28px;
  }
`;

const StatValue = styled.div`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

const StatLabel = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const FeaturedLabel = styled(Eyebrow)`
  display: block;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled(Card).attrs({ as: 'button' })`
  text-align: left;
  padding: 24px;
  cursor: pointer;
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const CardMeta = styled.p`
  margin: 12px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const CardLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 16px 0;
`;

const FloorLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.color.mutedLight};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 6px;
`;

const Price = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const Won = styled.span`
  font-size: 18px;
`;

const Left = styled.span`
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  font-size: 11px;
  font-weight: 500;
`;
