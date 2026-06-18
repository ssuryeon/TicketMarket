import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { Button, Card, Eyebrow } from '../components/ui';
import { getMyTicketList } from '../utils/ticket';
import { registerMarket } from '../utils/market';
import { userStore } from '../stores/userStore';

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

export function ListTicketScreen() {
  const [myTickets, setMyTickets] = useState<ITicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const token = userStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getMyTicketList(token);
        setMyTickets(Array.isArray(tickets) ? tickets : []);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [token]);

  const handleSelectTicket = (ticket: ITicket) => {
    setSelectedTicket(ticket);
    setPrice('');
  };

  const handleRegister = async () => {
    if (!selectedTicket || !price) return;
    const res = await registerMarket(selectedTicket.token_id, parseFloat(price), token);
    console.log(res);
    if(res.ok) {
      alert('마켓에 티켓이 등록되었습니다.');
      navigate('/market');
    };
    setSelectedTicket(null);
    setPrice('');
  };

  return (
    <>
      <Navbar />
      <Page>
        <Title>티켓 판매등록</Title>
        <Subtitle>가격을 정하고 온체인에 등록하세요. 구매자가 지갑에서 직접 구매합니다.</Subtitle>

        {selectedTicket ? (
          <>
            <BackBtn onClick={() => setSelectedTicket(null)}>← 다른 티켓 선택</BackBtn>
            <Layout>
              <FormCard>
                <FormTitle>판매 정보</FormTitle>

                <Field>
                  <Label>티켓 선택</Label>
                  <Input as="div" $readonly>
                    {selectedTicket.event_name} — {selectedTicket.seat_number}
                  </Input>
                </Field>

                <Field>
                  <Label>판매 가격 (₩)</Label>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    inputMode="decimal"
                  />
                </Field>

                <FeeNote>최종 판매가에서 플랫폼 수수료 2% + 창작자 로열티 1%가 자동 차감됩니다.</FeeNote>

                <Button $variant="primary" $full onClick={handleRegister}>
                  마켓에 티켓 등록
                </Button>
              </FormCard>

              <PreviewSide>
                <Eyebrow>미리보기</Eyebrow>
                <PreviewCard>
                  <PreviewAccent />
                  <ArtistName>{selectedTicket.event_name}</ArtistName>
                  <TourName>{selectedTicket.venue}</TourName>

                  <InfoBlock>
                    <InfoLabel>일시</InfoLabel>
                    <InfoValue>{selectedTicket.event_date.split("T")[0]}</InfoValue>
                  </InfoBlock>
                  <InfoBlock>
                    <InfoLabel>좌석</InfoLabel>
                    <InfoValue>{selectedTicket.seat_number}</InfoValue>
                  </InfoBlock>

                  <PerfLine />

                  <InfoBlock>
                    <InfoLabel>토큰 ID</InfoLabel>
                    <TokenValue>#{selectedTicket.token_id}</TokenValue>
                  </InfoBlock>

                  {price && (
                    <AskBox>
                      <AskLabel>판매 희망가</AskLabel>
                      <AskValue>{Number(price).toLocaleString()} 원</AskValue>
                    </AskBox>
                  )}
                </PreviewCard>

                <ChainNote>스마트 컨트랙트 등록 · 즉시 정산 · 비수탁형</ChainNote>
              </PreviewSide>
            </Layout>
          </>
        ) : (
          <TicketSelectSection>
            <SectionLabel>보유 티켓 선택</SectionLabel>
            {loading ? (
              <EmptyMsg>불러오는 중...</EmptyMsg>
            ) : myTickets.length === 0 ? (
              <EmptyMsg>판매 등록 가능한 티켓이 없습니다.</EmptyMsg>
            ) : (
              <TicketList>
                {myTickets.map((t) => (
                  <TicketRow key={t.id} onClick={() => handleSelectTicket(t)}>
                    <AccentBar />
                    <RowMain>
                      <RowTitle>{t.event_name}</RowTitle>
                      <RowSeat>{t.seat_number}</RowSeat>
                      <RowDate>{t.event_date}</RowDate>
                    </RowMain>
                    <TokenId>#{t.token_id}</TokenId>
                    <OriginalPrice>{Number(t.original_price).toLocaleString()}</OriginalPrice>
                    <SelectHint>선택 →</SelectHint>
                  </TicketRow>
                ))}
              </TicketList>
            )}
          </TicketSelectSection>
        )}
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

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

const Subtitle = styled.p`
  margin: 12px 0 0;
  font-size: 15px;
  color: ${({ theme }) => theme.color.muted};
`;

const BackBtn = styled.button`
  margin-top: 24px;
  background: none;
  border: none;
  font-size: 13px;
  color: ${({ theme }) => theme.color.accent};
  cursor: pointer;
  padding: 0;

  &:hover { opacity: 0.7; }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
  gap: 48px;
  margin-top: 36px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const FormCard = styled(Card)`
  padding: 28px;
`;

const FormTitle = styled.h2`
  margin: 0 0 24px;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const Field = styled.div`
  margin-bottom: 22px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.ink};
`;

const Input = styled.input<{ $readonly?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  font-size: 13px;
  color: ${({ theme }) => theme.color.ink};
  box-sizing: border-box;

  &:focus { border-color: ${({ theme }) => theme.color.accent}; outline: none; }
`;

const FeeNote = styled.div`
  margin: 6px 0 24px;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  font-size: 12px;
  line-height: 1.5;
`;

const PreviewSide = styled.div``;

const PreviewCard = styled(Card)`
  position: relative;
  margin-top: 12px;
  padding: 30px 28px 28px;
  overflow: hidden;
`;

const PreviewAccent = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.color.accent};
`;

const ArtistName = styled.div`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

const TourName = styled.div`
  margin-top: 6px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.muted};
`;

const InfoBlock = styled.div`
  margin-top: 18px;
`;

const InfoLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.color.mutedLight};
`;

const InfoValue = styled.div`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.ink};
`;

const PerfLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 22px 0 0;
`;

const TokenValue = styled.div`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.accent};
`;

const AskBox = styled.div`
  display: inline-block;
  margin-top: 22px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.accentSoft};
`;

const AskLabel = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.color.accent};
`;

const AskValue = styled.div`
  margin-top: 2px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.accent};
`;

const ChainNote = styled.p`
  margin: 22px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedLight};
`;

const TicketSelectSection = styled.div`
  margin-top: 36px;
`;

const SectionLabel = styled.h2`
  margin: 0 0 20px;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const EmptyMsg = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.muted};
`;

const TicketList = styled.div`
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
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.color.accent};
  }

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

const OriginalPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const SelectHint = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.accent};
  font-weight: 500;
`;
