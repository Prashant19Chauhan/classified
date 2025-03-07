import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/Signup'
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateAd from "./pages/dashboard/CreateAd";
import Settings from "./pages/dashboard/Settings";
import Payment from './pages/payment';
import Confirmation from './components/confirmation';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard with Sidebar Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="create-ad" element={<CreateAd />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
      </Routes>
    </Router>
  )
}

export default App
