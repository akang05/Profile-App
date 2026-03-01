import { Link } from 'react-router-dom';

function Header({ searchTerm, setSearchTerm, toggleTheme, isDarkMode, toggleSidebar }) {
  return (
    <header className="keep-header">
      <div className="header-left">
        <span className="menu-btn" onClick={toggleSidebar}>☰</span>
        <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="logo" className="keep-logo" />
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
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;