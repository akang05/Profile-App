import { Link } from 'react-router-dom';

function Header({ searchTerm, setSearchTerm, toggleTheme, isDarkMode }) {
  return (
    <header className="main-header">
      <div className="nav-container">
        {/* Logo and Title */}
        <div className="header-left">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" 
              alt="Keep Logo" 
              className="keep-logo" 
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
            />
            <h1 className="brand-logo-small">Keep Lite</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add">New Note</Link>
          <Link to="/how-to">How to Use</Link>
        </nav>

        {/* Search and Theme */}
        <div className="nav-utility">
          <div className="search-bar">
            <input 
              type="text" 
              className="nav-search-input"
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={toggleTheme} className="theme-toggle-compact">
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;