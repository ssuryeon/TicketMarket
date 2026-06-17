import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { Landing } from './screens/Landing';
import { EventListScreen } from './screens/EventListScreen';
import { SeatSelectScreen } from './screens/SeatSelectScreen';
import { MarketScreen } from './screens/MarketScreen';
import { MyTicketsScreen } from './screens/MyTicketsScreen';
import { ListTicketScreen } from './screens/ListTicketScreen';
import { SignUpScreen } from './screens/SignUpScreen';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<EventListScreen />} />
          <Route path="/events/:eventId/seats" element={<SeatSelectScreen />} />
          <Route path="/market" element={<MarketScreen />} />
          <Route path="/tickets" element={<MyTicketsScreen />} />
          <Route path="/register" element={<ListTicketScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
