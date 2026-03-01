import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="keep-sidebar">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">💡</span> <span className="nav-text">Notes</span>
      </NavLink>
      <NavLink to="/profiles" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">👥</span> <span className="nav-text">Other Profiles</span>
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">➕</span> <span className="nav-text">Add Profile</span>
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="nav-icon">ℹ️</span> <span className="nav-text">About</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;