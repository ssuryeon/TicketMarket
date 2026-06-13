import styled from 'styled-components';
import { Card, Page, PageTitle } from '../components/ui';
import { eventList } from '../data/mock';
import type { RouteKey } from '../types';

interface EventListScreenProps {
  onNavigate: (key: RouteKey) => void;
}

export function EventListScreen({ onNavigate }: EventListScreenProps) {
  return (
    <Page>
      <PageTitle>공연 목록</PageTitle>

      <Grid>
        {eventList.map((ev) => (
          <EventCard key={ev.id} onClick={() => onNavigate('seats')}>
            <Title>{ev.title}</Title>
            <Meta>{ev.venueDate}</Meta>
            <Line />
            <FloorLabel>최저가</FloorLabel>
            <PriceRow>
              <Price>
                {ev.fromPrice} <Won>₩</Won>
              </Price>
              <Left>{ev.seatsLeft}</Left>
            </PriceRow>
          </EventCard>
        ))}
      </Grid>
    </Page>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 36px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled(Card).attrs({ as: 'button' })`
  text-align: left;
  padding: 28px;
  cursor: pointer;
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const Meta = styled.p`
  margin: 12px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 20px 0;
`;

const FloorLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedLight};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 8px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

const Won = styled.span`
  font-size: 19px;
`;

const Left = styled.span`
  padding: 5px 11px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  font-size: 12px;
  font-weight: 500;
`;
