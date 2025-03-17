import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiHome, FiCheckSquare, FiBarChart2, FiSettings, FiUserPlus, FiMenu } from "react-icons/fi";


const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 text-white transition-all duration-300 p-4 flex flex-col`}
      >
        <button onClick={toggleSidebar} className="mb-4 text-xl">
          <FiMenu />
        </button>
        <nav className="flex flex-col space-y-4">
          <SidebarLink to="/" icon={<FiHome />} label="Dashboard" isOpen={isOpen} />
          <SidebarLink to="/ads-approval" icon={<FiCheckSquare />} label="Ads Approval" isOpen={isOpen} />
          <SidebarLink to="/analytics" icon={<FiBarChart2 />} label="Analytics" isOpen={isOpen} />
          <SidebarLink to="/settings" icon={<FiSettings />} label="Settings" isOpen={isOpen} />
          <SidebarLink to="/add-user" icon={<FiUserPlus />} label="Add User" isOpen={isOpen} />
        </nav>
      </div>

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
