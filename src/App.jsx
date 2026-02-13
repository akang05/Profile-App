import { useState, useEffect } from 'react';
// Added useParams, useNavigate, and Outlet for Lab 10
import { HashRouter as Router, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import AddProfileForm from './components/AddProfileForm'; 
import Introduction from './components/Introduction';
import './App.css';

// --- NEW: Profile Detail Component (Fetches specific user by ID) ---
const ProfileDetail = () => {
  const { id } = useParams(); // Grabs the ID from the URL
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

// --- NEW: Layout Component (Handles Nested Route & "Go Back" button) ---
const ProfileLayout = () => {
  const navigate = useNavigate();
  return (
    <Section title="Profiles Explorer">
      <button onClick={() => navigate(-1)} className="reset-button" style={{ marginBottom: '20px' }}>
        ← Go Back
      </button>
      <Outlet /> {/* This is where either the list OR the detail page renders */}
    </Section>
  );
};

// --- Page Components ---
const Home = ({ notes, isDarkMode }) => (
  <>
    <Section title="Welcome"><Introduction /></Section>
    <Section title="Pinned Notes">
      <div className="card-wrapper">
        {notes.filter(n => n.isPinned).map(note => (
          <NoteCard key={`note-${note.id}`} {...note} isDarkMode={isDarkMode} />
        ))}
      </div>
    </Section>
  </>
);

const NotFound = () => <Section title="404">Oops! Page not found.</Section>;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [apiProfiles, setApiProfiles] = useState([]);      
  const [apiTitles, setApiTitles] = useState([]);          
  const [selectedApiTitle, setSelectedApiTitle] = useState(""); 
  const [notes, setNotes] = useState([
    { id: 1, title: "Checkpoint 1 Task", text: "Submit the PDF proposal.", category: "School", isPinned: true }
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
    const newNote = { id: Date.now(), title: newP.name, text: newP.bio, category: "Personal", isPinned: false };
    setNotes([newNote, ...notes]);
  };

  return (
    <Router>
      <div className={isDarkMode ? "app-wrapper dark-mode" : "app-wrapper light-mode"}>
        <Header />
        <div style={{ textAlign: 'center', margin: '15px' }}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="reset-button">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home notes={notes} isDarkMode={isDarkMode} />} />
          <Route path="/add" element={<Section title="Add Profile"><AddProfileForm onAdd={handleAddNote} /></Section>} />
          <Route path="/about" element={<Section title="About Me"><Introduction /></Section>} />
          
          {/* NESTED ROUTES: Profiles */}
          <Route path="/profiles" element={<ProfileLayout />}>
             {/* The index route (list) */}
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
                    <NoteCard key={p.id} id={p.id} title={p.name} text={p.title} category="API" isDarkMode={isDarkMode} isApi={true} />
                  ))}
                </div>
               </>
             } />
             {/* Dynamic detail route */}
             <Route path=":id" element={<ProfileDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;