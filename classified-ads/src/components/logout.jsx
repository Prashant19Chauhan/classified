import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'

function Logout() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    }
  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Logout
