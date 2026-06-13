import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { Navbar } from './components/Navbar';
import { Landing } from './screens/Landing';
import { EventListScreen } from './screens/EventListScreen';
import { SeatSelectScreen } from './screens/SeatSelectScreen';
import { MarketScreen } from './screens/MarketScreen';
import { MyTicketsScreen } from './screens/MyTicketsScreen';
import { ListTicketScreen } from './screens/ListTicketScreen';
import type { RouteKey } from './types';

export default function App() {
  const [route, setRoute] = useState<RouteKey>('home');

  // The navbar highlights one of the four nav items; map sub-routes to them.
  const navActive = route === 'seats' ? 'events' : route === 'sellForm' ? 'sell' : route;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar active={navActive} onNavigate={setRoute} authed={route !== 'home'} />

      {route === 'home' && <Landing onNavigate={setRoute} />}
      {route === 'events' && <EventListScreen onNavigate={setRoute} />}
      {route === 'seats' && <SeatSelectScreen onNavigate={setRoute} />}
      {route === 'market' && <MarketScreen />}
      {route === 'tickets' && <MyTicketsScreen />}
      {route === 'register' && <ListTicketScreen />}
    </ThemeProvider>
  );
}
