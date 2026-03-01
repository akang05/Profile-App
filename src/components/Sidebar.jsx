import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="keep-sidebar">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="icon">💡</span> <span className="label">Notes</span>
      </NavLink>
      <NavLink to="/profiles" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="icon">👥</span> <span className="label">Community</span>
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="icon">ℹ️</span> <span className="label">About</span>
      </NavLink>
      <div className="nav-item">
        <span className="icon">🗑️</span> <span className="label">Trash</span>
      </div>
    </aside>
  );
}

export default Sidebar;