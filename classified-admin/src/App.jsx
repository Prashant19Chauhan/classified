import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import SignIn from './pages/signIn'
import AdminDashboard from './pages/adminDashboard'
import Setting from './components/setting'
import AddUser from './components/addUser'
import Analytics from './components/analytics'
import Dashboard from './components/dashboard'
import AdsApproval from './components/adsApproval'
import {useSelector} from 'react-redux'

function App() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={currentUser?<Navigate to="/"/>:<SignIn/>}/>
        <Route path='/' element={currentUser?<AdminDashboard/>:<Navigate to="/sign-in"/>}>
          <Route index element={<Dashboard/>} />
          <Route path='ads-approval' element={<AdsApproval/>}/>
          <Route path='analytics' element={<Analytics/>}/>
          <Route path="add-user" element={<AddUser/>} />
          <Route path="settings" element={<Setting/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
