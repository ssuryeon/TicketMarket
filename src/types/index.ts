export type RouteKey =
  | 'home'
  | 'events'
  | 'seats'
  | 'market'
  | 'tickets'
  | 'register'
  | 'sellForm';

export interface FeaturedEvent {
  id: string;
  title: string;
  venueDate: string;
  fromPrice: string;
  seatsLeft: string;
}

export interface EventListItem {
  id: string;
  title: string;
  venueDate: string;
  fromPrice: string;
  seatsLeft: string;
}

export interface SeatSection {
  id: string;
  name: string;
  seats: string;
  price: number;
  rare?: boolean;
}

export interface MarketListing {
  id: string;
  title: string;
  meta: string;
  ask: string;
  original: string;
  verified: boolean;
}

export interface MarketFilter {
  id: string;
  label: string;
}

export interface OwnedTicket {
  id: string;
  title: string;
  seat: string;
  date: string;
  tokenId: string;
  status: string;
  value: string;
}

export interface WalletProfile {
  address: string;
  connectedVia: string;
  owned: number;
  transferred: number;
  totalSpent: string;
}

export interface SellListing {
  id: string;
  title: string;
  venueDate: string;
  seller: string;
  originalPrice: string;
  sellPrice: string;
  seatsLeft: string;
}
