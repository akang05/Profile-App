import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header-style">
      <h1 style={{color: '#ceb888'}}>Keep Lite</h1>
      <nav style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '10px' }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/profiles" style={navLinkStyle}>Other Profiles</Link>
        <Link to="/add" style={navLinkStyle}>Add Profile</Link>
        <Link to="/about" style={navLinkStyle}>About</Link>
      </nav>
    </header>
  );
}

const navLinkStyle = {
  color: '#ceb888',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem'
};

export default Header;