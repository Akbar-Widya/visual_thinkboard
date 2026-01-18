import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useTaskStore } from '../store/useTaskStore';
import SearchBox from './SearchBox';

const Sidebar = () => {
  const user = useTaskStore((state) => state.user);
  const getNavLinkClasses = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-white text-accent shadow-sm' : 'text-text-muted hover:bg-white/40'
  }`;


  return (
    <aside className="sidebar-panel">
      <div className="p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">Workspace</h2>
      </div>

      <SearchBox />
      
      <nav className="flex-1 px-4 space-y-1">
        <NavLink to="/board" className={getNavLinkClasses}>
          Board View
        </NavLink>
                <NavLink to="/list" className={getNavLinkClasses}>
          List View
        </NavLink>
      </nav>

      <div className="p-4 border-t border-border bg-white/50">
        <div className="px-3 py-2 text-xs text-text-muted truncate">{user?.email}</div>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;