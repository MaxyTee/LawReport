// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LawReport from "./components/LawReport";
import Footer from "./components/Footer";
import Login from "./Auth/Login";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import EmailVerificationPage from "./Auth/EmailVerificationPage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgetPasswordPage from "./Auth/ForgetPasswordPage";
import { ProfilePage } from "./Dashboard/Component/ProfilePage";
import { SettingsPage } from "./Dashboard/Component/SettingPage";
import { HelpSupportPage } from "./Dashboard/Component/HelpSupportPage";
import { Layout } from "../root/Layout";

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  // const { isCheckingAuth, checkAuth } = useAuthStore();
  // const { user } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth) return <LoadingSpinner />;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Navbar />
              <main className="main-content">
                <LawReport />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
      </Route>
    )
  );
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
