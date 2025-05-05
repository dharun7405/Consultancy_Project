import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, ClipboardCheck, Users, BarChart2, Settings } from 'lucide-react';
import Logo from '../Logo';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar = ({ open, toggleSidebar }: AdminSidebarProps) => {
  const { user, logout } = useAuth();

  const navLinks = [
    {
      to: '/admin/dashboard/overview',
      icon: <LayoutDashboard size={20} />,
      label: 'Overview',
    },
    {
      to: '/admin/dashboard/tender-requests',
      icon: <ClipboardCheck size={20} />,
      label: 'Tender Requests',
    },
    {
      to: '/admin/dashboard/users',
      icon: <Users size={20} />,
      label: 'User Management',
    },
    {
      to: '/admin/dashboard/analytics',
      icon: <BarChart2 size={20} />,
      label: 'Analytics',
    },
    {
      to: '/admin/dashboard/settings',
      icon: <Settings size={20} />,
      label: 'Settings',
    },
  ];

  return (
    <aside 
      className={`bg-white shadow-lg z-20 fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out 
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:w-64 flex-shrink-0`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 flex items-center justify-between border-b">
          <Logo />
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="px-4 py-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user?.username}</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `flex items-center px-3 py-3 rounded-md transition-colors ${
                  isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="px-4 py-4 border-t">
          <button 
            onClick={logout}
            className="w-full flex items-center px-3 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;