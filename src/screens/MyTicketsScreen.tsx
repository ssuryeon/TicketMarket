import { useState } from 'react';
import styled from 'styled-components';
import { Badge, Card } from '../components/ui';
import { ownedTickets, ticketTabs, walletProfile } from '../data/mock';

export function MyTicketsScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Page>
      <Profile>
        <ProfileLeft>
          <Avatar>0x</Avatar>
          <div>
            <Address>{walletProfile.address}</Address>
            <ConnectedVia>{walletProfile.connectedVia}</ConnectedVia>
          </div>
        </ProfileLeft>

        <ProfileStats>
          <Stat>
            <StatValue>{walletProfile.owned}</StatValue>
            <StatLabel>보유 티켓</StatLabel>
          </Stat>
          <StatDivider />
          <Stat>
            <StatValue>{walletProfile.transferred}</StatValue>
            <StatLabel>양도 완료</StatLabel>
          </Stat>
          <StatDivider />
          <Stat>
            <StatValue>{walletProfile.totalSpent}</StatValue>
            <StatLabel>총 지출</StatLabel>
          </Stat>
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

      <List>
        {ownedTickets.map((t) => (
          <TicketRow key={t.id}>
            <AccentBar />
            <RowMain>
              <RowTitle>{t.title}</RowTitle>
              <RowSeat>{t.seat}</RowSeat>
              <RowDate>{t.date}</RowDate>
            </RowMain>
            <TokenId>{t.tokenId}</TokenId>
            <Badge $tone="green">{t.status}</Badge>
            <Value>{t.value}</Value>
            <TransferBtn type="button">양도하기</TransferBtn>
          </TicketRow>
        ))}
      </List>
    </Page>
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

const StatDivider = styled.span`
  width: 1px;
  height: 44px;
  background: ${({ theme }) => theme.color.border};
`;

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

const TransferBtn = styled.button`
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
