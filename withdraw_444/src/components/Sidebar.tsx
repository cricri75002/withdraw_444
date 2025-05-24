import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, Clock, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const links = [
    { to: '/dashboard', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/withdraw', icon: <CreditCard size={20} />, text: 'Withdraw' },
    { to: '/history', icon: <Clock size={20} />, text: 'History' },
    { to: '/settings', icon: <Settings size={20} />, text: 'Settings' },
  ];

  return (
    <div className="hidden md:block w-64 bg-white shadow-md h-screen fixed pt-16">
      <div className="px-4 py-6">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.text}</span>
                  {isActive && (
                    <div className="w-1 h-8 bg-blue-600 absolute right-0 rounded-l-md"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;