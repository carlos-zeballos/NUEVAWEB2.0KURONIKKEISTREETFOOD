import Header from '../components/Header.jsx';
import Hero from '../components/home/Hero.jsx';
import Favorites from '../components/home/Favorites.jsx';
import ReservationProvider from '../components/ReservationProvider.jsx';
import About from '../components/home/About.jsx';
import Location from '../components/home/Location.jsx';
import Membership from '../components/home/Membership.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import Marquee from '../components/Marquee.jsx';
import { usePageAnimations } from '../hooks/usePageAnimations.js';
export default function HomePage() {
  usePageAnimations();
  return (
    <ReservationProvider>
      <Header home />
      <main>
        <Hero />
        <Membership />
        <Marquee />
        <Favorites />
        <About />
        <Marquee orange />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </ReservationProvider>
  );
}
