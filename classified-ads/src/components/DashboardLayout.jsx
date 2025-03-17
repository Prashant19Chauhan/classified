import { Link, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'

const DashboardLayout = () => {
  const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6">
        <h2 className="text-2xl font-bold">📊 Dashboard</h2>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block py-2 px-4 bg-gray-700 rounded">🏠 My Ads</Link>
          <Link to="/dashboard/create-ad" className="block py-2 px-4 bg-gray-700 rounded">➕ Create Ad</Link>
          <Link to="/dashboard/settings" className="block py-2 px-4 bg-gray-700 rounded">⚙️ Settings</Link>
        </nav>

        <button className="mt-6 w-full py-2 px-4 bg-red-500 rounded" onClick={logoutHandler}>🚪 Logout</button>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
