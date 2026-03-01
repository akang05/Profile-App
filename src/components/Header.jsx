import { Link } from 'react-router-dom';

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="keep-header">
      <div className="header-left">
        <div className="menu-icon">☰</div>
        <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="Keep Logo" />
        <h1>Keep Lite</h1>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <nav className="header-right">
        <Link to="/">Notes</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
export default Header;