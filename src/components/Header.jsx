import { Link } from 'react-router-dom';

function Header({ searchTerm, setSearchTerm, toggleTheme, isDarkMode, toggleSidebar }) {
  return (
    <header className="keep-header">
      <div className="header-left">
        {/* The 3-line menu button that controls the Sidebar collapse */}
        <div className="menu-btn" onClick={toggleSidebar} title="Main menu">
          ☰
        </div>
        <img 
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" 
          alt="Keep Logo" 
          className="keep-logo" 
        />
        <h1 className="brand-name">Keep Lite</h1>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className="header-right">
        {/* Theme toggle button */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;