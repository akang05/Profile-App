import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom';
import { useTheme } from './context/ThemeContext'; 
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import AddProfileForm from './components/AddProfileForm'; 
import Introduction from './components/Introduction';
import './App.css';

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Error fetching detail:", err));
  }, [id]);

  if (!profile) return <p className="no-results">Loading profile details...</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img src={profile.image_url} alt={profile.name} style={{ borderRadius: '50%', width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #ceb888', marginBottom: '15px' }} />
      <h2 style={{ color: '#ceb888', margin: '5px 0' }}>{profile.name}</h2>
      <p><strong>{profile.title}</strong></p>
      <p style={{ maxWidth: '500px', margin: '15px auto' }}>{profile.bio}</p>
      <p>Contact: <span style={{ color: '#ceb888' }}>{profile.email}</span></p>
    </div>
  );
};

const ProfileLayout = () => {
  const navigate = useNavigate();
  return (
    <Section title="Profiles Explorer">
      <button onClick={() => navigate(-1)} className="reset-button" style={{ marginBottom: '20px' }}>
        ← Go Back
      </button>
      <Outlet />
    </Section>
  );
};

// FIXED: Home now shows both Pinned AND the rest of your profiles
const Home = ({ notes }) => (
  <>
    <Section title="Welcome"><Introduction /></Section>
    
    <Section title="Pinned Notes">
      <div className="card-wrapper">
        {notes.filter(n => n.isPinned).map(note => (
          <NoteCard key={`note-${note.id}`} {...note} />
        ))}
      </div>
    </Section>

    {/* NEW SECTION: This ensures your unpinned newly added profiles actually show up */}
    <Section title="All Profiles">
      <div className="card-wrapper">
        {notes.filter(n => !n.isPinned).map(note => (
          <NoteCard key={`note-${note.id}`} {...note} />
        ))}
      </div>
    </Section>
  </>
);

const NotFound = () => <Section title="404">Oops! Page not found.</Section>;

function App() {
  const { isDarkMode, toggleTheme } = useTheme(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [apiProfiles, setApiProfiles] = useState([]);      
  const [apiTitles, setApiTitles] = useState([]);          
  const [selectedApiTitle, setSelectedApiTitle] = useState(""); 
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: "Sample Profile", 
      text: "This is a pinned example.", 
      category: "School", 
      isPinned: true,
      imageUrl: "https://picsum.photos/200" 
    }
  ]);

  useEffect(() => {
    fetch('https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php')
      .then(res => res.json()).then(data => setApiTitles(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${encodeURIComponent(selectedApiTitle)}&name=${encodeURIComponent(searchTerm)}`;
    fetch(url).then(res => res.json()).then(data => setApiProfiles(Array.isArray(data) ? data : []));
  }, [selectedApiTitle, searchTerm]);

  const handleAddNote = (newP) => {
    const newNote = { 
      id: Date.now(), 
      title: newP.name, 
      text: newP.bio, 
      imageUrl: newP.imageUrl, 
      category: "Personal", 
      isPinned: false 
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <Router>
      <div className={isDarkMode ? "app-wrapper dark-mode" : "app-wrapper light-mode"}>
        <Header />
        <div style={{ textAlign: 'center', margin: '15px' }}>
          <button onClick={toggleTheme} className="reset-button">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home notes={notes} />} />
          <Route path="/add" element={<Section title="Add Profile"><AddProfileForm onAdd={handleAddNote} /></Section>} />
          <Route path="/about" element={<Section title="About Me"><Introduction /></Section>} />
          
          <Route path="/profiles" element={<ProfileLayout />}>
             <Route index element={
               <>
                <div className="controls-wrapper" style={{marginBottom: '30px'}}>
                  <input type="text" placeholder="Search API..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                  <select value={selectedApiTitle} onChange={(e) => setSelectedApiTitle(e.target.value)} className="filter-dropdown">
                    <option value="">All Titles</option>
                    {apiTitles.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="card-wrapper">
                  {apiProfiles.map((p) => (
                    <NoteCard 
                      key={p.id} 
                      id={p.id} 
                      title={p.name} 
                      text={p.title} 
                      imageUrl={p.image_url} 
                      category="API" 
                      isApi={true} 
                    />
                  ))}
                </div>
               </>
             } />
             <Route path=":id" element={<ProfileDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;