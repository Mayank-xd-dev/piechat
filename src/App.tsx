import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CometChatApp from "./CometChat/CometChatApp.tsx";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ResetPassword from "./auth/ResetPassword";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { initCometChat } from "./config/cometChat";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initCometChat();
      await checkAuth();
    };
    initialize();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await CometChat.getLoggedinUser();
      setIsAuthenticated(!!currentUser);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/reset-password"
          element={isAuthenticated ? <Navigate to="/" /> : <ResetPassword />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div style={{ width: "95vw", height: "100vh" }}>
                <CometChatApp />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch all route - redirect to login if not authenticated, home if authenticated */}
        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;