import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DreamProvider } from './context/DreamContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreateDreamPage from './pages/CreateDreamPage';
import GalleryPage from './pages/GalleryPage';
import DreamDetailPage from './pages/DreamDetailPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <DreamProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route
                    path="/create"
                    element={
                      <PrivateRoute>
                        <CreateDreamPage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/dream/:id" element={<DreamDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
              
              <Footer />
            </div>
          </Router>
        </DreamProvider>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;