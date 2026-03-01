import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen }) {
  return (
    <aside className={`keep-sidebar ${isOpen ? "open" : "collapsed"}`}>
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">💡</span> 
        {isOpen && <span className="nav-text">Notes</span>}
      </NavLink>
      <NavLink to="/profiles" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">👥</span> 
        {isOpen && <span className="nav-text">Other Profiles</span>}
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">➕</span> 
        {isOpen && <span className="nav-text">Add Profile</span>}
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">ℹ️</span> 
        {isOpen && <span className="nav-text">About</span>}
      </NavLink>
    </aside>
  );
}

export default Sidebar;