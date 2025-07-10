import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  BookOpen,
  BarChart2,
  Info,
  Mail,
  MessageCircle
} from 'lucide-react';

const navItems = [
  { name: 'Binary Options', icon: LayoutGrid, to: '/binary-options' },
  { name: 'Markets', icon: BarChart2, to: '/markets' },
  { name: 'Education', icon: BookOpen, to: '/education' },
  { name: 'About', icon: Info, to: '/about' },
  { name: 'Contact', icon: Mail, to: '/contact' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar-bg flex flex-col justify-between h-screen w-20 md:w-24 fixed left-0 top-0 z-40 shadow-strong">
      <div className="flex flex-col items-center pt-6 space-y-2">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg select-none">
            TP
          </div>
        </div>
        {/* Nav Items */}
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={`flex flex-col items-center justify-center w-14 h-14 mb-2 rounded-xl transition-all duration-200 group ${
                isActive ? 'sidebar-active shadow-soft' : 'hover:bg-[hsl(var(--sidebar-active)/0.1)] text-gray-300'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'text-green' : 'text-gray-300 group-hover:text-blue'}`} />
              <span className="text-xs font-medium tracking-wide uppercase group-hover:text-blue" style={{fontSize:'10px'}}>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
      {/* Help Button */}
      <div className="flex flex-col items-center pb-6">
        <button className="w-14 h-14 rounded-xl bg-green text-white flex flex-col items-center justify-center shadow-soft hover:shadow-medium transition-all duration-200">
          <MessageCircle className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold uppercase" style={{fontSize:'10px'}}>Help</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 