# ChainPass — UI (React + TypeScript + styled-components)

블록체인 티켓팅 플랫폼 UI. Figma 스크린샷 8종을 그대로 옮긴 6개 화면 + 새로 디자인한 스타디움 좌석 배치도.

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입체크 + 프로덕션 빌드
```

## 구조

```
src/
  theme/         디자인 토큰(theme.ts), GlobalStyle, styled-components 타입
  components/
    Navbar.tsx   상단 네비게이션
    ui.tsx       Page / Card / Button / Badge 등 공통 프리미티브
    SeatMap.tsx  스타디움 좌석 배치도 (SVG로 새로 그림, 외부 이미지 제거)
  screens/
    Landing.tsx           랜딩 (히어로 + 통계 + 추천 이벤트)
    EventListScreen.tsx   공연 목록 (3열 그리드)
    SeatSelectScreen.tsx  좌석 선택 (배치도 + 구역 선택 + 수량) — 상태 있음
    MarketScreen.tsx      양도 마켓 (필터 + 인증 배지)
    MyTicketsScreen.tsx   내 티켓 (지갑 헤더 + 탭 + 리스트)
    SellMarketScreen.tsx  양도마켓 (판매등록 진입)
    ListTicketScreen.tsx  티켓 판매등록 (폼 + 실시간 미리보기)
  data/mock.ts   더미 데이터
  types/         공유 타입
  App.tsx        간단한 route state 기반 화면 전환
```

## 라우팅

`App.tsx`의 `useState<RouteKey>`로 화면을 전환합니다. 실제 앱에서는
react-router 등으로 교체하세요. RouteKey: home · events · seats · market ·
tickets · sell · sellForm.

## 좌석 배치도

원본은 외부 이미지였던 부분으로, `SeatMap.tsx`에서 SVG로 새로 그렸습니다.
STAGE + 플로어 좌석 그리드 + 곡면 하부 관람석 구조이며 `pickedSeats`,
`selectedSeats` prop으로 하이라이트를 제어합니다.
