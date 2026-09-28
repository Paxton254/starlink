import { Routes, Route, useLocation } from 'react-router-dom'
import PackagesPage from './pages/PackagesPage.jsx'
import AirtelCheckout from './pages/AirtelCheckout.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BottomNav from './components/BottomNav.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import './App.css'

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <CurrencyProvider>
      {!isAdminRoute && <Navbar />}
      <main style={{ flex: 1, paddingBottom: isAdminRoute ? '0' : '70px' }}>
        <Routes>
          <Route path="/" element={<PackagesPage />} />
          <Route path="/checkout/airtel" element={<AirtelCheckout />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BottomNav />}
    </CurrencyProvider>
  )
}

export default App
