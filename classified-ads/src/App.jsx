import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
const NotFound = lazy(() => import("./components/NotFound")); // custom 404 page

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Logout = lazy(() => import("./components/Logout"));
const Epaper = lazy(() => import("./pages/Epaper"));
const Payment = lazy(() => import("./pages/payment"));
const Confirmation = lazy(() => import("./components/Confirmation"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const CreateAds = lazy(() => import("./pages/dashboard/CreateAds"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));


function App() {
  const { currentUser, loading } = useSelector((state) => state.user);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      {loading && <Loader />}

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <Signup />} />
          <Route path="/logout" element={currentUser ? <Logout /> : <Navigate to="/login" />} />
          <Route path="/epaper" element={<Epaper />} />

          {/* Protected */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="create-ad" element={<CreateAds />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
