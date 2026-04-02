import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#030712] text-white selection:bg-neon-blue selection:text-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/emails" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
