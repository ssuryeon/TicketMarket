import { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { SeatGrid } from '../components/SeatGrid';
import { Button, formatKRW } from '../components/ui';
import { Overlay } from '../components/Overlay';
import { getSeats } from '../utils/event';
import { purchaseTicket } from '../utils/ticket';
import { userStore } from '../stores/userStore';

interface ISeat {
  id: string;
  seat_number: string;
  status: 'AVAILABLE' | 'SOLD';
}

export function SeatSelectScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [selectedSeatIds, setSelectedSeatIds] = useState<Set<string>>(new Set());
  const [seats, setSeats] = useState<ISeat[]>([]);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const token = userStore((state) => state.token);
  const ticketInfo = location.state as { name: string; event_date: string, venue:string, original_price: string, total_seats: string } | null;

  useEffect(() => {
    if (!ticketInfo) {
      navigate(-1);
      return;
    }
    if (!eventId) return;
    const load = async () => {
      const data = await getSeats(eventId);
      setSeats(data);
    };
    load();
  }, [eventId]);

  const handleSeatToggle = (id: string) => {
    setSelectedSeatIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 4) {
        next.add(id);
      }
      return next;
    });
  };

  const derivedSection = { id: 'a', name: 'A구역', seats: `${ticketInfo?.total_seats}석`, price: Number(ticketInfo?.original_price) };

  const availableCount = useMemo(
    () => seats.filter((s) => s.status === 'AVAILABLE').length,
    [seats],
  );

  const total = derivedSection.price * selectedSeatIds.size;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const handleConfirm = async () => {
    if (!eventId || !token) return;
    for (const seatId of selectedSeatIds) {
      const res = await purchaseTicket(eventId, seatId, token);
      console.log(res);
    }
    navigate('/tickets');
  };

  return (
    <>
      <Navbar />
      <Page>
        <Title>{ticketInfo?.name}</Title>
        <DateLine>{ticketInfo?.event_date.split("T")[0]} · {ticketInfo?.venue}</DateLine>

        <Layout>
          <SeatGrid
            seats={seats}
            selectedIds={selectedSeatIds}
            onToggle={handleSeatToggle}
          />

          <Panel>
            <PanelInner>
              <SectionCard>
                <SectionHeader>
                  <SectionName>
                    {derivedSection.name}
                  </SectionName>
                  <SectionPrice>{formatKRW(derivedSection.price)} <Won>₩</Won></SectionPrice>
                </SectionHeader>
                <SectionMeta>
                  {seats.length > 0 ? `${availableCount}석 남음 / 전체 ${seats.length}석` : '불러오는 중...'}
                </SectionMeta>
              </SectionCard>

              <Divider />

              <QtyBlock>
                <QtyRow>
                  <QtyLabel>선택된 좌석</QtyLabel>
                  <QtyCount>{selectedSeatIds.size} / 4</QtyCount>
                </QtyRow>
                <SelectedSeats>
                  {selectedSeatIds.size === 0 ? (
                    <EmptySeat>좌석을 선택하세요</EmptySeat>
                  ) : (
                    [...selectedSeatIds].map((id) => {
                      const seat = seats.find((s) => s.id === id);
                      return seat ? <SeatTag key={id}>{seat.seat_number}</SeatTag> : null;
                    })
                  )}
                </SelectedSeats>
              </QtyBlock>

              <Divider />

              <TotalRow>
                <TotalLabel>합계</TotalLabel>
                <TotalValue>{formatKRW(total)} <Won>₩</Won></TotalValue>
              </TotalRow>
            </PanelInner>

            <CheckoutBtn
              $variant="primary"
              disabled={selectedSeatIds.size === 0}
              onClick={() => setShowModal(true)}
            >
              결제 진행하기
            </CheckoutBtn>
          </Panel>
        </Layout>
      </Page>

      {showModal && ticketInfo && (
        <Overlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <ModalTitle>주문 요약</ModalTitle>

            <ModalEventCard>
              <ModalEventBorder />
              <ModalEventContent>
                <ModalEventName>{ticketInfo.name}</ModalEventName>
                <ModalEventMeta>
                  {formatDate(ticketInfo.event_date)} · {ticketInfo.venue}
                </ModalEventMeta>
                {selectedSeatIds.size > 0 && (
                  <ModalEventSeats>
                    {[...selectedSeatIds]
                      .map((id) => seats.find((s) => s.id === id)?.seat_number)
                      .filter(Boolean)
                      .join(' · ')}
                  </ModalEventSeats>
                )}
              </ModalEventContent>
            </ModalEventCard>

            <ModalPriceRow>
              <span>{derivedSection.name} {selectedSeatIds.size}매</span>
              <span>{formatKRW(total)} ₩</span>
            </ModalPriceRow>

            <ModalDivider />

            <ModalTotalRow>
              <ModalTotalLabel>합계</ModalTotalLabel>
              <ModalTotalValue>{formatKRW(total)} ₩</ModalTotalValue>
            </ModalTotalRow>

            <ModalConfirmBtn $variant="primary" onClick={handleConfirm}>
              블록체인에서 결제 확정
            </ModalConfirmBtn>
            <ModalSubtext>이더리움 스마트 컨트랙트로 보호됨</ModalSubtext>
          </Modal>
        </Overlay>
      )}
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

// const Breadcrumb = styled.div`
//   font-size: 13px;
//   color: ${({ theme }) => theme.color.mutedLight};
// `;

const Title = styled.h1`
  margin: 16px 0 0;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

const DateLine = styled.p`
  margin: 12px 0 0;
  font-size: 15px;
  color: ${({ theme }) => theme.color.muted};
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 32px;
  margin-top: 32px;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PanelInner = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 28px;
  display: flex;
  flex-direction: column;
`;

const SectionCard = styled.div`
  padding: 20px 22px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.accentSoft};
  border: 1.5px solid ${({ theme }) => theme.color.accent};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

// const RareTag = styled.span`
//   padding: 2px 8px;
//   border-radius: ${({ theme }) => theme.radius.sm};
//   background: ${({ theme }) => theme.color.accentSoft};
//   color: ${({ theme }) => theme.color.accent};
//   font-size: 10px;
//   font-weight: 600;
// `;

const SectionPrice = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.accent};
`;

const SectionMeta = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.accent};
  opacity: 0.8;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 22px 0;
`;

const QtyBlock = styled.div`
  flex: 1;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const QtyLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const QtyCount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.accent};
`;

const SelectedSeats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 36px;
`;

const EmptySeat = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.color.mutedLight};
  align-self: center;
`;

const SeatTag = styled.span`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  font-size: 12px;
  font-weight: 600;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const TotalLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const TotalValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const Won = styled.span`
  font-size: 18px;
`;

const CheckoutBtn = styled(Button)`
  align-self: flex-end;
  min-width: 220px;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.color.card};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 36px 32px 28px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const ModalEventCard = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const ModalEventBorder = styled.div`
  width: 4px;
  background: ${({ theme }) => theme.color.accent};
  flex-shrink: 0;
`;

const ModalEventContent = styled.div`
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ModalEventName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const ModalEventMeta = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
`;

const ModalEventSeats = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
`;

const ModalPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.color.ink};
`;

const ModalDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 0;
`;

const ModalTotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const ModalTotalLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const ModalTotalValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const ModalConfirmBtn = styled(Button)`
  width: 100%;
`;

const ModalSubtext = styled.p`
  margin: 0;
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedLight};
`;
