import { useMemo } from 'react';
import styled from 'styled-components';

interface ISeat {
  id: string;
  seat_number: string;
  status: 'AVAILABLE' | 'SOLD';
}

type SeatState = 'available' | 'sold' | 'selected';

interface SeatGridProps {
  seats: ISeat[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  maxSelect?: number;
}

export function SeatGrid({ seats, selectedIds, onToggle, maxSelect = 4 }: SeatGridProps) {
  const rows = useMemo(() => {
    const map = new Map<string, ISeat[]>();
    for (const seat of seats) {
      const row = seat.seat_number[0].toUpperCase();
      if (!map.has(row)) map.set(row, []);
      map.get(row)!.push(seat);
    }
    for (const rowSeats of map.values()) {
      rowSeats.sort(
        (a, b) => parseInt(a.seat_number.slice(1), 10) - parseInt(b.seat_number.slice(1), 10),
      );
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [seats]);

  const maxReached = selectedIds.size >= maxSelect;

  if (seats.length === 0) {
    return (
      <Wrap>
        <Empty>좌석 정보를 불러오는 중...</Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Legend>
        <LegendItem>
          <Dot $state="available" /> 선택 가능
        </LegendItem>
        <LegendItem>
          <Dot $state="selected" /> 선택됨
        </LegendItem>
        <LegendItem>
          <Dot $state="sold" /> 매진
        </LegendItem>
      </Legend>

      {rows.map(([row, rowSeats]) => (
        <RowWrap key={row}>
          <RowLabel>{row}</RowLabel>
          <SeatsWrap>
            {rowSeats.map((seat) => {
              const isSold = seat.status === 'SOLD';
              const isSelected = selectedIds.has(seat.id);
              const isDisabled = isSold || (maxReached && !isSelected);
              const state: SeatState = isSold ? 'sold' : isSelected ? 'selected' : 'available';
              return (
                <SeatBtn
                  key={seat.id}
                  $state={state}
                  disabled={isDisabled}
                  onClick={() => onToggle(seat.id)}
                  aria-pressed={isSelected}
                  title={`${seat.seat_number} — ${isSold ? '매진' : '선택 가능'}`}
                >
                  {seat.seat_number}
                </SeatBtn>
              );
            })}
          </SeatsWrap>
        </RowWrap>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 24px;
  overflow-y: auto;
  max-height: 620px;
`;

const Empty = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.muted};
  padding: 60px 0;
  font-size: 14px;
`;

const Legend = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: ${({ theme }) => theme.color.muted};
`;

const Dot = styled.span<{ $state: SeatState }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${({ $state, theme }) =>
    $state === 'sold'
      ? theme.color.border
      : $state === 'selected'
        ? theme.color.accent
        : theme.color.mutedLight};
`;

const RowWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
`;

const RowLabel = styled.div`
  width: 18px;
  padding-top: 5px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.muted};
  flex-shrink: 0;
`;

const SeatsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const SeatBtn = styled.button<{ $state: SeatState }>`
  width: 38px;
  height: 28px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  border: 1px solid;
  transition: border-color 0.1s ease, background 0.1s ease, color 0.1s ease;

  ${({ $state, theme }) => {
    if ($state === 'sold')
      return `
      background: ${theme.color.bg};
      border-color: ${theme.color.border};
      color: ${theme.color.mutedLight};
      opacity: 0.5;
      cursor: not-allowed;
    `;
    if ($state === 'selected')
      return `
      background: ${theme.color.accent};
      border-color: ${theme.color.accent};
      color: #fff;
      cursor: pointer;
    `;
    return `
      background: ${theme.color.card};
      border-color: ${theme.color.border};
      color: ${theme.color.muted};
      cursor: pointer;
      &:hover:not(:disabled) {
        border-color: ${theme.color.accent};
        color: ${theme.color.accent};
      }
    `;
  }}

  &:disabled {
    cursor: not-allowed;
  }
`;
