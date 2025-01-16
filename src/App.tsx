import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MockDataProvider } from './context/MockDataContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Inventory } from './pages/Inventory';
import { Orders } from './pages/Orders';
import { Rankings } from './pages/Rankings';
import { Reports } from './pages/Reports';
import { Management } from './pages/Management';
import { B2BPortal } from './pages/B2BPortal';
import { Shops } from './pages/Shops';
import { MyPage } from './pages/MyPage';

function App() {
  return (
    <AuthProvider>
      <MockDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/order" element={<Orders />} />
                    <Route path="/ranking" element={<Rankings />} />
                    <Route path="/report" element={<Reports />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/b2b" element={<B2BPortal />} />
                    <Route path="/shops" element={<Shops />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </MockDataProvider>
    </AuthProvider>
  );
}

export default App;