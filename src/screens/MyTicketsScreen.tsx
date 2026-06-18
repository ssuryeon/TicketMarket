import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { Badge, Card, Button } from '../components/ui';
import {Field, Label, Input} from './SignUpScreen';
import { ticketTabs} from '../data/mock';
import { me, registerAccount, getRank } from '../utils/auth';
import { getMyTicketList, cancelTicket } from '../utils/ticket';
import { userStore } from '../stores/userStore';

interface IUser {
  id: string,
  email: string,
  nickname: string,
  role: string,
  wallet_address: string,
  is_kyc: boolean,
  bank_name: string,
  bank_account: string,
  bank_holder: string,
  created_at: string,
}

interface IBank {
  bank_name: string,
  bank_account: string,
  bank_holder: string,
}

interface IRankInfo {
  artist_address: string,
  artist_name: string,
  attendance_count: number,
  next_tier_at: number,
  remaining: number,
  tier: string,
  token_id: string,
}

interface ITicket {
  id: string;
  token_id: number;
  status: string;
  qr_version: number;
  event_name: string;
  venue: string;
  event_date: string;
  original_price: string;
  seat_number: string;
  created_at: string;
}

const BADGE_TIERS = [
  { name: 'BRONZE', label: '브론즈', requirement: '1회 이상', color1: '#B87333', color2: '#CD7F32', shimmer: '#E8A87C', textColor: '#6B3A1F' },
  { name: 'SILVER', label: '실버', requirement: '3회 이상', color1: '#9E9E9E', color2: '#C8C8C8', shimmer: '#E8E8E8', textColor: '#3A3A3A' },
  { name: 'GOLD', label: '골드', requirement: '7회 이상', color1: '#C8960C', color2: '#F0C040', shimmer: '#FFE680', textColor: '#6B4800' },
  { name: 'PLATINUM', label: '플래티넘', requirement: '15회 이상', color1: '#5E8DA0', color2: '#8BBCCC', shimmer: '#C0DCE8', textColor: '#1A3A4A' },
  { name: 'DIAMOND', label: '다이아몬드', requirement: '25회 이상', color1: '#3A7DC4', color2: '#70B0E0', shimmer: '#B8DCF8', textColor: '#0A2A50' },
];


export function MyTicketsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState<IUser | null>(null);
  const [bank, setBank] = useState<IBank | null>(null);
  const [myTickets, setMyTickets] = useState<ITicket[]>([]);
  const [rankInfo, setRankInfo] = useState<IRankInfo[]>([]);
  const token = userStore((state) => state.token);
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    const formData = new FormData(e.currentTarget);
    const name = formData.get('bank_name') as string;
    const account = formData.get('bank_account') as string;
    const holder = formData.get('bank_holder') as string;
    const res = await registerAccount(name, account, holder, token);
    console.log(res);
    setBank({ bank_name: res.bank_name, bank_account: res.bank_account, bank_holder: res.bank_holder });
  }

  useEffect(() => {
    if (!token) return;
    const getInfo = async () => {
      const res = await me(token);
      const info_rank = await getRank(token);
      console.log(res);
      console.log(info_rank);
      setUser(res);
      setRankInfo(Array.isArray(info_rank?.badges) ? info_rank.badges : []);
      if (res.bank_name) {
        setBank({bank_name: res.bank_name, bank_account: res.bank_account, bank_holder: res.bank_holder});
      }
    }
    const getTicketList = async () => {
      const tickets = await getMyTicketList(token);
      console.log(tickets);
      setMyTickets(tickets);
    }
    getInfo();
    getTicketList();
  }, [token])

  const onCancelClick = async (ticketId:string) => {
    const res = await cancelTicket(ticketId, token);
    console.log(res);
    alert(res.message);
    if (res.message) {
      setMyTickets(prev => prev.filter(t => t.id !== ticketId));
    }
  }

  return (
    <>
      <Navbar />
      <Page>
      <Profile>
        <ProfileLeft>
          <Avatar>0x</Avatar>
          <div>
            <Address>{user?.nickname}</Address>
            <ConnectedVia>{user?.wallet_address}</ConnectedVia>
          </div>
        </ProfileLeft>

        <ProfileStats>
          <Stat>
            <StatValue>{myTickets.length}</StatValue>
            <StatLabel>보유 티켓</StatLabel>
          </Stat>
          {/* <StatDivider />
          <Stat>
            <StatValue>{walletProfile.transferred}</StatValue>
            <StatLabel>양도 완료</StatLabel>
          </Stat> */}
          {/* <StatDivider />
          <Stat>
            <StatValue>{walletProfile.totalSpent}</StatValue>
            <StatLabel>총 지출</StatLabel>
          </Stat> */}
        </ProfileStats>
      </Profile>

      <Tabs>
        {ticketTabs.map((tab, i) => (
          <Tab key={tab} $active={activeTab === i} onClick={() => setActiveTab(i)}>
            {tab}
            {activeTab === i && <TabUnderline />}
          </Tab>
        ))}
      </Tabs>
      
      {
        activeTab == 0 ? 
          (
            <List>
            {myTickets?.map((t) => 
            (
              <TicketRow key={t.id}>
                <AccentBar />
                <RowMain>
                  <RowTitle>{t.event_name}</RowTitle>
                  <RowSeat>{t.seat_number}</RowSeat>
                  <RowDate>{t.event_date.split("T")[0]}</RowDate>
                </RowMain>
                <TokenId>{t.token_id}</TokenId>
                <Badge $tone="green">{t.status}</Badge>
                <Value>{Number(t.original_price).toLocaleString()}</Value>
                <TransferBtn onClick={() => onCancelClick(t.id)}>티켓 취소</TransferBtn>
              </TicketRow>
            ))}
          </List>
        ) : 
        (
          activeTab == 1 ? 
          (
            <div style={{width: '100%'}}>
              {
                bank == null ? null : (
                  <TicketRow style={{marginBottom: 40}}>
                    <AccentBar />
                    <RowMain>
                      <RowTitle>{bank.bank_name}</RowTitle>
                      <RowSeat>{bank.bank_account}</RowSeat>
                      <RowDate>{bank.bank_holder}</RowDate>
                    </RowMain>
                  </TicketRow>
                )
              }
              <BankForm onSubmit={onSubmit}>
                <Field>
                  <Label>은행</Label>
                  <Input name='bank_name'/>
                </Field>
                <Field>
                  <Label>계좌번호</Label>
                  <Input name='bank_account'/>
                </Field>
                <Field>
                  <Label>예금주</Label>
                  <Input name='bank_holder'/>
                </Field>
                <Button>정산 계좌 등록</Button>
              </BankForm>
            </div>
          ) : 
          (
            activeTab == 2 ? (
              <>
                <BadgeGuideSection>
                  <BadgeGuideHeader>
                    <BadgeGuideTitle>활동 뱃지</BadgeGuideTitle>
                    <BadgeGuideDesc>티켓 구매 횟수에 따라 뱃지를 획득할 수 있어요</BadgeGuideDesc>
                  </BadgeGuideHeader>
                  <BadgeGrid>
                    {BADGE_TIERS.map((tier) => (
                      <BadgeCard key={tier.name}>
                        <BadgeIconWrap $color1={tier.color1} $color2={tier.color2} $shimmer={tier.shimmer}>
                          <BadgeInner>
                            <BadgeGem $color1={tier.color1} $shimmer={tier.shimmer} />
                          </BadgeInner>
                        </BadgeIconWrap>
                        <BadgeTierName>{tier.label}</BadgeTierName>
                        <BadgeTierReq $textColor={tier.color1}>{tier.requirement}</BadgeTierReq>
                      </BadgeCard>
                    ))}
                  </BadgeGrid>
                </BadgeGuideSection>

                {rankInfo.length > 0 && (
                  <MyBadgeSection>
                    <BadgeGuideHeader>
                      <BadgeGuideTitle>내 뱃지</BadgeGuideTitle>
                      <BadgeGuideDesc>관람한 공연별 뱃지 현황이에요</BadgeGuideDesc>
                    </BadgeGuideHeader>
                    <MyBadgeList>
                      {rankInfo.map((rank, i) => {
                        const tierIdx = BADGE_TIERS.findIndex(t => t.name === rank.tier);
                        const tier = BADGE_TIERS[Math.max(0, tierIdx)];
                        const isMaxTier = !rank.next_tier_at || tierIdx === BADGE_TIERS.length - 1;
                        const progress = isMaxTier
                          ? 100
                          : Math.min(100, (rank.attendance_count / rank.next_tier_at) * 100);
                        return (
                          <MyBadgeCard key={i}>
                            <BadgeIconWrap $color1={tier.color1} $color2={tier.color2} $shimmer={tier.shimmer}>
                              <BadgeInner>
                                <BadgeGem $color1={tier.color1} $shimmer={tier.shimmer} />
                              </BadgeInner>
                            </BadgeIconWrap>
                            <MyBadgeInfo>
                              <MyBadgeArtist>{rank.artist_name}</MyBadgeArtist>
                              <MyBadgeTierRow>
                                <BadgeTierReq $textColor={tier.color1}>{tier.label}</BadgeTierReq>
                                {!isMaxTier && (
                                  <MyBadgeRemaining>다음 등급까지 {rank.remaining}회 남음</MyBadgeRemaining>
                                )}
                                {isMaxTier && <MyBadgeRemaining>최고 등급 달성!</MyBadgeRemaining>}
                              </MyBadgeTierRow>
                              <ProgressBarWrap>
                                <ProgressFill $percent={progress} $color={tier.color2} />
                              </ProgressBarWrap>
                              <ProgressLabel>
                                <span>{rank.attendance_count}회 관람</span>
                                {!isMaxTier && <span>{rank.next_tier_at}회</span>}
                              </ProgressLabel>
                            </MyBadgeInfo>
                          </MyBadgeCard>
                        );
                      })}
                    </MyBadgeList>
                  </MyBadgeSection>
                )}
              </>
            ) : null
          )   
        )
      }
    </Page>
    </>
  );
}

const Page = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 40px 120px 96px;

  @media (max-width: 1024px) {
    padding: 32px 24px 72px;
  }
`;

const Profile = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 32px;
`;

const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
`;

const Address = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.ink};
`;

const ConnectedVia = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const ProfileStats = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const Stat = styled.div`
  text-align: left;
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const StatLabel = styled.div`
  margin-top: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.color.muted};
`;

// const StatDivider = styled.span`
//   width: 1px;
//   height: 44px;
//   background: ${({ theme }) => theme.color.border};
// `;

const Tabs = styled.div`
  display: flex;
  gap: 40px;
  margin: 36px 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Tab = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 0 0 14px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active, theme }) => ($active ? theme.color.accent : theme.color.muted)};
`;

const TabUnderline = styled.span`
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.color.accent};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TicketRow = styled(Card)`
  position: relative;
  display: grid;
  grid-template-columns: 1.6fr 0.8fr auto auto auto;
  align-items: center;
  gap: 24px;
  padding: 22px 28px 22px 32px;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const AccentBar = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: ${({ theme }) => theme.color.accent};
`;

const RowMain = styled.div``;

const RowTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const RowSeat = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const RowDate = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const TokenId = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.accent};
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const BankForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 480px;
`;

const BadgeGuideSection = styled.div`
  width: 100%;
`;

const BadgeGuideHeader = styled.div`
  margin-bottom: 28px;
`;

const BadgeGuideTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const BadgeGuideDesc = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BadgeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px 16px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
`;

const BadgeIconWrap = styled.div<{ $color1: string; $color2: string; $shimmer: string }>`
  position: relative;
  width: 64px;
  height: 72px;
  background: linear-gradient(160deg, ${({ $shimmer }) => $shimmer} 0%, ${({ $color2 }) => $color2} 40%, ${({ $color1 }) => $color1} 100%);
  clip-path: polygon(50% 0%, 100% 18%, 100% 68%, 50% 100%, 0% 68%, 0% 18%);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 8px ${({ $color1 }) => $color1}66);
`;

const BadgeInner = styled.div`
  width: 44px;
  height: 50px;
  clip-path: polygon(50% 0%, 100% 18%, 100% 68%, 50% 100%, 0% 68%, 0% 18%);
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeGem = styled.div<{ $color1: string; $shimmer: string }>`
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #ffffff 0%, ${({ $shimmer }) => $shimmer} 50%, ${({ $color1 }) => $color1} 100%);
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
`;

const BadgeTierName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const BadgeTierReq = styled.div<{ $textColor: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ $textColor }) => $textColor};
  background: ${({ $textColor }) => $textColor}18;
  padding: 3px 10px;
  border-radius: 20px;
`;

const MyBadgeSection = styled.div`
  width: 100%;
  margin-top: 48px;
`;

const MyBadgeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MyBadgeCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 28px;
`;

const MyBadgeInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MyBadgeArtist = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const MyBadgeTierRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MyBadgeRemaining = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const ProgressBarWrap = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 99px;
  background: ${({ theme }) => theme.color.border};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  border-radius: 99px;
  background: ${({ $color }) => $color};
  transition: width 0.4s ease;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: ${({ theme }) => theme.color.muted};
`;

export const TransferBtn = styled.button`
  height: 34px;
  padding: 0 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};

  &:hover { border-color: ${({ theme }) => theme.color.mutedLight}; }
`;
