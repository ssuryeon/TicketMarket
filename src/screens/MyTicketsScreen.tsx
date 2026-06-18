import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { Badge, Card, Button } from '../components/ui';
import {Field, Label, Input} from './SignUpScreen';
import { ticketTabs} from '../data/mock';
import { me, registerAccount } from '../utils/auth';
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

export function MyTicketsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState<IUser | null>(null);
  const [bank, setBank] = useState<IBank | null>(null);
  const [myTickets, setMyTickets] = useState<ITicket[]>([]);
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
      console.log(res);
      setUser(res);
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
            null
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
