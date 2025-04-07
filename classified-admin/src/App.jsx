import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/signIn';
import AdminDashboard from './pages/adminDashboard';
import Setting from './components/setting';
import AddUser from './components/addUser';
import Analytics from './components/analytics';
import Dashboard from './components/dashboard';
import AdsApproval from './components/adsApproval';
import Classified from './components/classified';
import ClassifiedSetting from './components/classifiedSetting';
import Publish from './execution/publish';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  const [permissions, setPermissions] = useState({
    ViewDashboard: false,
    ManageUsers: false,
    EditSettings: false,
    ManageAds: false,
    ViewAnalytics: false,
    Classified: false,
    ClassifiedSettings: false
  });

  useEffect(() => {
    if (currentUser?.user?.permissions) {
      const newPermissions = {
        ViewDashboard: currentUser.user.permissions.includes("View Dashboard"),
        ManageUsers: currentUser.user.permissions.includes("Manage Users"),
        EditSettings: currentUser.user.permissions.includes("Edit Settings"),
        ManageAds: currentUser.user.permissions.includes("Manage Ads"),
        ViewAnalytics: currentUser.user.permissions.includes("View Analytics"),
        Classified: currentUser.user.permissions.includes("Classified"),
        ClassifiedSettings: currentUser.user.permissions.includes("Classified Settings")
      };
      setPermissions(newPermissions);
    }
  }, [currentUser]);

  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={currentUser ? <Navigate to="/" /> : <SignIn />} />

        <Route path='/' element={currentUser ? <AdminDashboard permissions={permissions} /> : <Navigate to="/sign-in" />}>
          <Route index element={permissions.ViewDashboard ? <Dashboard /> : <Navigate to="/" />} />
          <Route path='ads-approval' element={permissions.ManageAds ? <AdsApproval /> : <Navigate to="/" />} />
          <Route path='analytics' element={permissions.ViewAnalytics ? <Analytics /> : <Navigate to="/" />} />
          <Route path="add-user" element={permissions.ManageUsers ? <AddUser /> : <Navigate to="/" />} />
          <Route path="settings" element={permissions.EditSettings ? <Setting /> : <Navigate to="/" />} />
          <Route path='classified' element={permissions.Classified ? <Classified /> : <Navigate to="/" />} />
          <Route path='classified-setting' element={permissions.ClassifiedSettings ? <ClassifiedSetting /> : <Navigate to="/" />} />
          <Route path='publish/:duration' element={<Publish />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
