import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/signIn';
import AdminDashboard from './pages/adminDashboard';
import Setting from './components/setting';
import AddUser from './components/addUser';
import Analytics from './components/analytics';
import Dashboard from './components/dashboard';
import AdsApproval from './components/adsApproval';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [permissions, setPermissions] = useState({
    ViewDashboard: false,
    ManageUsers: false,
    EditSettings: false,
    ManageAds: false,
    ViewAnalytics: false
  });

  useEffect(() => {
    if (currentUser?.user?.permissions) {
      const newPermissions = {
        ViewDashboard: currentUser.user.permissions.includes("View Dashboard"),
        ManageUsers: currentUser.user.permissions.includes("Manage Users"),
        EditSettings: currentUser.user.permissions.includes("Edit Settings"),
        ManageAds: currentUser.user.permissions.includes("Manage Ads"),
        ViewAnalytics: currentUser.user.permissions.includes("View Analytics")
      };
      setPermissions(newPermissions);
    }
  }, [currentUser]); // Runs when `currentUser` changes


  return (
    <Router>
      <Routes>
        {/* Redirect if user is already logged in */}
        <Route path='/sign-in' element={currentUser ? <Navigate to="/" /> : <AddUser />} />

        {/* Protect Routes - Only allow access if logged in */}
        <Route path='/' element={currentUser ? <AdminDashboard permissions={permissions}/> : <Navigate to="/sign-in" />}>
          <Route index element={permissions.ViewDashboard ? <Dashboard /> : <Navigate to="/" />} />
          <Route path='ads-approval' element={permissions.ManageAds ? <AdsApproval /> : <Navigate to="/" />} />
          <Route path='analytics' element={permissions.ViewAnalytics ? <Analytics /> : <Navigate to="/" />} />
          <Route path="add-user" element={permissions.ManageUsers ? <AddUser /> : <Navigate to="/" />} />
          <Route path="settings" element={permissions.EditSettings ? <Setting /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
