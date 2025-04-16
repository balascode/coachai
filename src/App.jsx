import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from './theme/lightTheme';
import { darkTheme } from './theme/darkTheme';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LiveAnalysis from './pages/LiveAnalysis';
import Analysis from './pages/Analysis';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ThemeProvider as CustomThemeProvider, useThemeContext } from './contexts/ThemeContext';

const ProtectedRoute = ({ isLoggedIn, userRole, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const { isDarkMode } = useThemeContext();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        setUserRole(user.uid.endsWith('coach') ? 'coach' : 'player');
      }
    });
    return unsubscribe;
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <Layout userRole={userRole}>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/LiveAnalysis"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <Layout userRole={userRole}>
                <LiveAnalysis userRole={userRole} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <Layout userRole={userRole}>
                <Analysis userRole={userRole} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <Layout userRole={userRole}>
                <Reports userRole={userRole} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <Layout userRole={userRole}>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;