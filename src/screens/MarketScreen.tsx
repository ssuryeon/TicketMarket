import { useState } from 'react';
import styled from 'styled-components';
import { Badge, Button, Card, Page, PageSubtitle, PageTitle } from '../components/ui';
import { marketFilters, marketListings } from '../data/mock';

export function MarketScreen() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <Page>
      <PageTitle>양도 마켓</PageTitle>
      <PageSubtitle>온체인으로 보호되는 P2P 티켓 양도. 모든 매물은 지갑 인증을 거쳤습니다.</PageSubtitle>

      <Filters>
        {marketFilters.map((f) => (
          <FilterPill
            key={f.id}
            $active={activeFilter === f.id}
            onClick={() => setActiveFilter(f.id)}
            aria-pressed={activeFilter === f.id}
          >
            {f.label}
          </FilterPill>
        ))}
      </Filters>

      <Grid>
        {marketListings.map((listing) => (
          <Listing key={listing.id}>
            <CardHead>
              <ListingTitle>{listing.title}</ListingTitle>
              {listing.verified && <Badge $tone="green">인증됨</Badge>}
            </CardHead>
            <Meta>{listing.meta}</Meta>
            <Line />
            <AskLabel>판매 희망가</AskLabel>
            <AskRow>
              <Ask>{listing.ask}</Ask>
              <BuyBtn $variant="primary">바로 구매</BuyBtn>
            </AskRow>
            <Original>{listing.original}</Original>
          </Listing>
        ))}
      </Grid>
    </Page>
  );
}

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
`;

const FilterPill = styled.button<{ $active: boolean }>`
  height: 36px;
  padding: 0 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: ${({ $active, theme }) => ($active ? theme.color.accent : theme.color.card)};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.color.muted)};
  border: ${({ $active, theme }) =>
    $active ? 'none' : `1px solid ${theme.color.border}`};
  transition: background 0.15s ease;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Listing = styled(Card)`
  padding: 24px;
`;

const CardHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ListingTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const Meta = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 18px 0 16px;
`;

const AskLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedLight};
`;

const AskRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const Ask = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const BuyBtn = styled(Button)`
  height: 36px;
  padding: 0 18px;
  font-size: 13px;
`;

const Original = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedLight};
`;
