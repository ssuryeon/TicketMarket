import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SeatMap } from '../components/SeatMap';
import { Button, formatKRW } from '../components/ui';
import { seatEvent, seatSections } from '../data/mock';
import type { RouteKey } from '../types';

interface SeatSelectScreenProps {
  onNavigate: (key: RouteKey) => void;
}

const PICKED_SEATS = [70, 84, 86, 99, 116, 120];
const SELECTED_TRIBUNE = [0, 1];

export function SeatSelectScreen({ onNavigate }: SeatSelectScreenProps) {
  const [selectedId, setSelectedId] = useState('a');
  const [qty, setQty] = useState(2);

  const selectedSection = useMemo(
    () => seatSections.find((s) => s.id === selectedId) ?? seatSections[1],
    [selectedId],
  );

  const total = selectedSection.price * qty;

  return (
    <Page>
      <Breadcrumb>{seatEvent.breadcrumb}</Breadcrumb>
      <Title>{seatEvent.title}</Title>
      <DateLine>{seatEvent.dateLine}</DateLine>

      <Layout>
        <SeatMap pickedSeats={PICKED_SEATS} selectedSeats={SELECTED_TRIBUNE} />

        <Panel>
          <PanelInner>
            <PanelTitle>구역 선택</PanelTitle>

            <Sections>
              {seatSections.map((section) => {
                const active = section.id === selectedId;
                return (
                  <SectionRow
                    key={section.id}
                    $active={active}
                    onClick={() => setSelectedId(section.id)}
                    aria-pressed={active}
                  >
                    <SectionInfo>
                      <SectionName>
                        {section.name}
                        {section.rare && <RareTag>희소</RareTag>}
                      </SectionName>
                      <SectionSeats>{section.seats}</SectionSeats>
                    </SectionInfo>
                    <SectionPrice $active={active}>
                      {formatKRW(section.price)} <Won>₩</Won>
                    </SectionPrice>
                  </SectionRow>
                );
              })}
            </Sections>

            <QtyRow>
              <QtyLabel>수량</QtyLabel>
              <QtyTotal>
                {formatKRW(total)} <Won>₩</Won>
              </QtyTotal>
            </QtyRow>

            <Stepper>
              <StepBtn
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="수량 감소"
              >
                −
              </StepBtn>
              <StepValue>{qty}</StepValue>
              <StepBtn
                type="button"
                onClick={() => setQty((q) => Math.min(4, q + 1))}
                aria-label="수량 증가"
              >
                +
              </StepBtn>
            </Stepper>
          </PanelInner>

          <CheckoutBtn $variant="primary" onClick={() => onNavigate('home')}>
            결제 진행하기
          </CheckoutBtn>
        </Panel>
      </Layout>
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

const Breadcrumb = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.mutedLight};
`;

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
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 32px;
  margin-top: 32px;
  align-items: start;

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
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 28px;
`;

const PanelTitle = styled.h2`
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionRow = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active, theme }) => ($active ? theme.color.accentSoft : theme.color.card)};
  border: ${({ $active, theme }) =>
    $active ? `1.5px solid ${theme.color.accent}` : `1px solid ${theme.color.border}`};
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${({ $active, theme }) =>
      $active ? theme.color.accent : theme.color.mutedLight};
  }
`;

const SectionInfo = styled.div`
  text-align: left;
`;

const SectionName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const RareTag = styled.span`
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  font-size: 10px;
  font-weight: 600;
`;

const SectionSeats = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const SectionPrice = styled.div<{ $active: boolean }>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $active, theme }) => ($active ? theme.color.accent : theme.color.ink)};
`;

const Won = styled.span`
  font-size: 15px;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28px;
`;

const QtyLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const QtyTotal = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 14px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
`;

const StepBtn = styled.button`
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.color.card};
  border: none;
  font-size: 18px;
  color: ${({ theme }) => theme.color.muted};

  &:hover { background: ${({ theme }) => theme.color.bg}; }
`;

const StepValue = styled.div`
  width: 56px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const CheckoutBtn = styled(Button)`
  align-self: flex-end;
  min-width: 220px;
`;
