import type {
  FeaturedEvent,
  EventListItem,
  SeatSection,
  MarketListing,
  MarketFilter,
  OwnedTicket,
  WalletProfile,
  SellListing,
} from '../types';

export const featuredEvents: FeaturedEvent[] = [
  {
    id: 'coldplay',
    title: '콜드플레이 · Music of the Spheres',
    venueDate: '7월 12일 · 서울올림픽주경기장',
    fromPrice: '66,000',
    seatsLeft: '24석 남음',
  },
  {
    id: 'bts',
    title: 'BTS · Permission to Dance',
    venueDate: '8월 3일 · KSPO돔',
    fromPrice: '120,000',
    seatsLeft: '8석 남음',
  },
  {
    id: 'blackpink',
    title: '블랙핑크 · Born Pink World',
    venueDate: '9월 5일 · 잠실실내체육관',
    fromPrice: '99,000',
    seatsLeft: '51석 남음',
  },
];

export const heroStats = [
  { value: '12,847', label: '보안 처리된 티켓' },
  { value: '$4.2M', label: '총 거래액' },
  { value: '340+', label: '이벤트' },
  { value: '99.9%', label: '위조 무발생률' },
];

export const eventList: EventListItem[] = Array.from({ length: 9 }, (_, i) => ({
  id: `event-${i + 1}`,
  title: '블랙핑크 · Born Pink World',
  venueDate: '9월 5일 · 잠실실내체육관',
  fromPrice: '99,000',
  seatsLeft: '51석 남음',
}));

export const seatSections: SeatSection[] = [
  { id: 'vip', name: 'VIP 플로어', seats: '4석', price: 220000, rare: true },
  { id: 'a', name: 'A구역 — 앞열', seats: '24석', price: 150000 },
  { id: 'b', name: 'B구역 — 중앙', seats: '87석', price: 110000 },
  { id: 'c', name: 'C구역 — 상단', seats: '140석', price: 66000 },
];

export const seatEvent = {
  title: '콜드플레이 · Music of the Spheres',
  breadcrumb: '둘러보기 / 서울 / 콜드플레이 — Music of the Spheres',
  dateLine: '2025년 7월 12일 · 오후 7:00 KST · 서울올림픽주경기장',
};

export const marketFilters: MarketFilter[] = [
  { id: 'all', label: '전체' },
  { id: 'concert', label: '콘서트' },
  { id: 'sports', label: '스포츠' },
  { id: 'show', label: '공연' },
  { id: 'festival', label: '페스티벌' },
];

export const marketListings: MarketListing[] = [
  { id: 'm1', title: 'BTS · Permission to Dance', meta: 'VIP 플로어 · 2025년 8월 3일', ask: '1.20 ETH', original: '원가 0.90 ETH', verified: true },
  { id: 'm2', title: '콜드플레이 · Music of the Spheres', meta: 'A구역 · 2025년 7월 12일', ask: '0.95 ETH', original: '원가 0.85 ETH', verified: true },
  { id: 'm3', title: '블랙핑크 · Born Pink', meta: 'B구역 · 2025년 9월 5일', ask: '0.70 ETH', original: '원가 0.65 ETH', verified: true },
  { id: 'm4', title: 'NewJeans · OMG Tour', meta: '플로어 · 2025년 10월 1일', ask: '0.50 ETH', original: '원가 0.40 ETH', verified: true },
  { id: 'm5', title: "IVE · I've Mine Tour", meta: 'A구역 · 2025년 10월 20일', ask: '0.45 ETH', original: '원가 0.35 ETH', verified: true },
  { id: 'm6', title: '에스파 · MY WORLD', meta: 'VIP · 2025년 11월 8일', ask: '1.60 ETH', original: '원가 1.20 ETH', verified: true },
];

export const walletProfile: WalletProfile = {
  address: '0x4a2f8c3d9e1b5f7a2d4e6c8b1a3f5d7e9c',
  connectedVia: 'MetaMask로 연결됨',
  owned: 7,
  transferred: 3,
  totalSpent: '1.20 ETH',
};

export const ownedTickets: OwnedTicket[] = [
  { id: 't1', title: '콜드플레이 · Music of the Spheres', seat: 'A구역 — 앞열 · 14B석', date: 'Jul 12, 2025', tokenId: '토큰 #0042', status: '예정', value: '0.95 ETH' },
  { id: 't2', title: 'BTS · Permission to Dance', seat: 'VIP 플로어 · 스탠딩', date: 'Aug 3, 2025', tokenId: '토큰 #0107', status: '예정', value: '1.20 ETH' },
  { id: 't3', title: '블랙핑크 · Born Pink World', seat: 'B구역 · 3열', date: 'Sep 5, 2025', tokenId: '토큰 #0289', status: '예정', value: '0.68 ETH' },
];

export const ticketTabs = ['내 티켓', '활동 내역', '관심 목록'];

export const sellListings: SellListing[] = Array.from({ length: 9 }, (_, i) => ({
  id: `sell-${i + 1}`,
  title: '블랙핑크 · Born Pink World',
  venueDate: '9월 5일 · 잠실실내체육관',
  seller: '판매자 0x123...abc',
  originalPrice: '99,000',
  sellPrice: '99,000',
  seatsLeft: '51석 남음',
}));

export const orderSummary = {
  title: '콜드플레이 · Music of the Spheres',
  dateLine: '2025년 7월 12일 · 오후 7:00 KST',
  seat: 'A구역 — 앞열 · 14B석',
  tokenId: '#0042 · 0x4a2f...8c3d',
  rows: [
    { label: 'A구역 1매', value: '180,000 ₩' },
    { label: '원가', value: '150,000 ₩' },
    { label: '판매자', value: '0x123...abc' },
  ],
  total: '180,000 ₩',
};
