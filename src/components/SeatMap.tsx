import { useMemo } from 'react';
import styled from 'styled-components';

interface SeatMapProps {
  /** Indices of the highlighted seats in the floor grid (purple "picked" dots). */
  pickedSeats?: number[];
  /** Indices of the front-row selected seats (blue). */
  selectedSeats?: number[];
}

const GRID_COLS = 16;
const GRID_ROWS = 14;

/**
 * Stadium-style seat map. Drawn entirely in SVG so it matches the
 * surrounding light/minimal UI and carries no external image dependency.
 * STAGE sits at the top; the floor grid fans out below it, with a curved
 * lower tribune. Seats can be highlighted as "picked" or "selected".
 */
export function SeatMap({ pickedSeats = [], selectedSeats = [] }: SeatMapProps) {
  const floor = useMemo(() => {
    const cells: { x: number; y: number; idx: number }[] = [];
    const startX = 92;
    const startY = 120;
    const gap = 13;
    let idx = 0;
    for (let r = 0; r < GRID_ROWS; r += 1) {
      for (let c = 0; c < GRID_COLS; c += 1) {
        cells.push({ x: startX + c * gap, y: startY + r * gap, idx });
        idx += 1;
      }
    }
    return cells;
  }, []);

  const pickedSet = useMemo(() => new Set(pickedSeats), [pickedSeats]);

  // Lower tribune: two curved blocks of small seats.
  const tribune = useMemo(() => {
    const blocks: { x: number; y: number; selected: boolean }[] = [];
    const selectedSet = new Set(selectedSeats);
    const rows = 2;
    const cols = 22;
    const startX = 70;
    const startY = 430;
    const gap = 11;
    let k = 0;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const curveLift = Math.pow((c - cols / 2) / (cols / 2), 2) * 14;
        blocks.push({
          x: startX + c * gap,
          y: startY + r * gap + curveLift,
          selected: selectedSet.has(k),
        });
        k += 1;
      }
    }
    return blocks;
  }, [selectedSeats]);

  return (
    <Wrap>
      <svg viewBox="0 0 420 500" role="img" aria-labelledby="seatmap-title">
        <title id="seatmap-title">스타디움 좌석 배치도</title>

        {/* Stage */}
        <rect x="120" y="20" width="180" height="44" rx="6" fill="#5F5F5F" />
        <text
          x="210"
          y="48"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          letterSpacing="4"
          fill="#FFFFFF"
        >
          STAGE
        </text>

        {/* Stage side wings */}
        <path d="M120 64 L96 96 L130 96 L150 64 Z" fill="#CDD3DC" />
        <path d="M300 64 L324 96 L290 96 L270 64 Z" fill="#CDD3DC" />

        {/* Standing-area label */}
        <text x="210" y="108" textAnchor="middle" fontSize="9" fill="#94A3B8">
          스탠딩(입장번호)
        </text>

        {/* Floor grid */}
        {floor.map(({ x, y, idx }) => {
          const isPicked = pickedSet.has(idx);
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width={9}
              height={9}
              rx={2}
              fill={isPicked ? '#7C6FE0' : '#D7DCE5'}
            />
          );
        })}

        {/* 1F marker */}
        <circle cx="210" cy="312" r="11" fill="#1F2937" />
        <text x="210" y="316" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">
          1F
        </text>

        {/* Lower tribune curved block */}
        <path
          d="M40 420 Q210 392 380 420 L380 470 Q210 452 40 470 Z"
          fill="#7C8493"
          opacity="0.18"
        />
        {tribune.map((s, i) => (
          <rect
            key={`tr-${i}`}
            x={s.x}
            y={s.y}
            width={8}
            height={8}
            rx={1.5}
            fill={s.selected ? '#3B82F6' : '#D7DCE5'}
          />
        ))}

        {/* 2F marker */}
        <circle cx="210" cy="476" r="11" fill="#1F2937" />
        <text x="210" y="480" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">
          2F
        </text>
      </svg>

      <Legend>
        <LegendItem>
          <Dot $c="#D7DCE5" /> 선택 가능
        </LegendItem>
        <LegendItem>
          <Dot $c="#3B82F6" /> 선택됨
        </LegendItem>
        <LegendItem>
          <Dot $c="#7C6FE0" /> 보유 중
        </LegendItem>
      </Legend>
    </Wrap>
  );
}

const Wrap = styled.div`
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadow.card};

  svg { width: 100%; height: auto; display: block; }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 12px;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: ${({ theme }) => theme.color.muted};
`;

const Dot = styled.span<{ $c: string }>`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: ${({ $c }) => $c};
`;
