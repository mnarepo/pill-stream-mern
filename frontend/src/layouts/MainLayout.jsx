import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => (
  <>
    <Navbar />
    <main className="main-content"><Outlet /></main>
    <Footer />
  </>
);

export default MainLayout;
