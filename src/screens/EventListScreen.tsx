import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Card, Page, PageTitle } from '../components/ui';
// import { eventList } from '../data/mock';
import { getEventList } from '../utils/event';
import {useEffect, useState} from 'react';

interface IEvent {
  id: string,
  name: string,
  venue: string,
  event_date: string,
  original_price: string,
  total_seats: number,
}

export function EventListScreen() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState<IEvent[]>([]);
  useEffect(() => {
    const get = async () => {
      const r = await getEventList();
      console.log(r);
      setEventList(r);
    }
    get();
  }, [])

  return (
    <>
      <Navbar />
      <Page>
        <PageTitle>공연 목록</PageTitle>

        <Grid>
          {eventList.map((ev) => (
            <EventCard key={ev.id} onClick={() => navigate(`/events/${ev.id}/seats`, {state: {name: ev.name, event_date: ev.event_date, venue: ev.venue, original_price: ev.original_price, total_seats: ev.total_seats}})}>
              <Title>{ev.name}</Title>
              <Meta>{ev.event_date.split("T")[0]} · {ev.venue}</Meta>
              <Line />
              <FloorLabel>최저가</FloorLabel>
              <PriceRow>
                <Price>
                  {Number(ev.original_price).toLocaleString()} <Won>₩</Won>
                </Price>
                <Left>{ev.total_seats}</Left>
              </PriceRow>
            </EventCard>
          ))}
        </Grid>
      </Page>
    </>
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
