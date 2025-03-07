import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import SignIn from './pages/signIn'
import AdminDashboard from './pages/adminDashboard'
import Setting from './components/setting'
import AddUser from './components/addUser'
import Analytics from './components/analytics'
import Dashboard from './components/dashboard'
import AdsApproval from './components/adsApproval'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/' element={<AdminDashboard/>}>
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
