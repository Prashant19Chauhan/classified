import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiHome, FiCheckSquare, FiBarChart2, FiSettings, FiUserPlus, FiMenu, FiLogOut } from "react-icons/fi";
import LogoutModal from "../components/LogoutModal";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";


const AdminDashboard = ({permissions}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setIsModalOpen(false);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 text-white transition-all duration-300 p-4 flex flex-col justify-between`}
      >
        <button onClick={toggleSidebar} className="mb-4 text-xl">
          <FiMenu />
        </button>
        <nav className="flex flex-col space-y-4">
          {permissions.ViewDashboard ?<SidebarLink to="/" icon={<FiHome />} label="Dashboard" isOpen={isOpen}/> : null}
          {permissions.ManageAds ?<SidebarLink to="/ads-approval" icon={<FiCheckSquare />} label="Ads Approval" isOpen={isOpen} /> : null}
          {permissions.ViewAnalytics ?<SidebarLink to="/analytics" icon={<FiBarChart2 />} label="Analytics" isOpen={isOpen} /> : null}
          {permissions.EditSettings ?<SidebarLink to="/settings" icon={<FiSettings />} label="Settings" isOpen={isOpen} /> : null}
          {permissions.ManageUsers ?<SidebarLink to="/add-user" icon={<FiUserPlus />} label="Add User" isOpen={isOpen} /> : null}
        </nav>
        <div>
          {permissions?<button onClick={() => setIsModalOpen(true)}><SidebarLink icon={<FiLogOut/>} label="Logout" isOpen={isOpen}/></button>:null}
        </div>
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={logoutHandler}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, isOpen }) => {
  return (
    <Link to={to} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
      <span className="text-xl">{icon}</span>
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default AdminDashboard;
