import { useState } from 'react'; // Tambahkan useState
import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useTaskStore } from '../store/useTaskStore';
import SearchBox from './SearchBox';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State untuk kontrol buka-tutup
  const user = useTaskStore((state) => state.user);
  
  const getNavLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
      isActive ? 'bg-white text-accent shadow-sm' : 'text-text-muted hover:bg-white/40'
    }`;

  return (
    <aside className={`${isCollapsed ? 'w-auto' : 'w-64'} sidebar-panel flex flex-col transition-all duration-100`}>
      {/* Header & Hamburger Button */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">Workspace</h2>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/50 rounded-md cursor-pointer text-text-muted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Content Wrapper - Sembunyi saat collapse */}
      <div className={`${isCollapsed ? 'hidden' : 'flex flex-col flex-1'}`}>
        <SearchBox />
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavLink to="/board" className={getNavLinkClasses}>
            Board View
          </NavLink>
          <NavLink to="/list" className={getNavLinkClasses}>
            List View
          </NavLink>
        </nav>

        {/* Identity & Branding Section */}
        <div className="border-t border-border bg-white/50">
          <div className="px-6 pt-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-tighter text-text-muted">
              Developed by Akbar Widya
            </span>
            <a 
              href="https://github.com/Akbar-Widya" 
              target="_blank" 
              rel="noreferrer"
              className="text-text-muted hover:text-text-main"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>

          <div className="p-4 pt-2">
            <div className="px-3 py-1 text-[11px] text-text-muted truncate opacity-70">
              {user?.email}
            </div>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="w-full text-left px-3 py-1 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;