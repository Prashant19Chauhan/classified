import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/Signup'
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateAd from "./pages/dashboard/CreateAd";
import Settings from "./pages/dashboard/Settings";
import Payment from './pages/payment';
import Confirmation from './components/confirmation';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/logout';
import { useSelector } from 'react-redux';


function App() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={currentUser? <Navigate to="/"/> : <Login/>} />
        <Route path="/signup" element={currentUser? <Navigate to="/"/> : <Signup/>} />
        <Route path='/logout' element={currentUser? <Logout/> : <Navigate to="/login"/>}/>

        {/* Dashboard with Sidebar Layout */}
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="create-ad" element={<CreateAd />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/confirmation' element={<Confirmation/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
