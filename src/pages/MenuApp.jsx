import MenuPhotoProvider from '../components/menu/MenuPhotoProvider.jsx';
import ReservationProvider from '../components/ReservationProvider.jsx';
import Header from '../components/Header.jsx';
import MenuPage from './MenuPage.jsx';
import Membership from '../components/home/Membership.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import Marquee from '../components/Marquee.jsx';
import { usePageAnimations } from '../hooks/usePageAnimations.js';
export default function MenuApp() {
  usePageAnimations();
  return (
    <ReservationProvider>
      <Header />
      <MenuPhotoProvider>
        <MenuPage />
      </MenuPhotoProvider>
      <Marquee orange />
      <Membership />
      <Footer />
      <WhatsAppButton />
    </ReservationProvider>
  );
}
