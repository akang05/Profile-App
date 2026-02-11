import { useState, useEffect } from 'react';
// Changed to HashRouter for GitHub Pages compatibility
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import AddProfileForm from './components/AddProfileForm'; 
import Introduction from './components/Introduction';
import './App.css';

// --- Page Components ---

const Home = ({ notes, isDarkMode }) => (
  <>
    <Section title="Welcome">
      <Introduction />
    </Section>
    <Section title="Pinned Notes">
      <div className="card-wrapper">
        {notes.filter(n => n.isPinned).map(note => (
          <NoteCard key={`note-${note.id}`} {...note} isDarkMode={isDarkMode} />
        ))}
      </div>
    </Section>
  </>
);

const AddProfile = ({ onAdd }) => (
  <Section title="Add New Note/Profile">
    <AddProfileForm onAdd={onAdd} />
  </Section>
);

const About = () => (
  <Section title="About Me">
    <Introduction />
  </Section>
);

const NotFound = () => (
  <Section title="404 - Not Found">
    <p className="no-results" style={{ textAlign: 'center', fontSize: '1.5rem' }}>
      Oops! The page you are looking for does not exist.
    </p>
  </Section>
);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [apiProfiles, setApiProfiles] = useState([]);      
  const [apiTitles, setApiTitles] = useState([]);          
  const [selectedApiTitle, setSelectedApiTitle] = useState(""); 

  const [notes, setNotes] = useState([
    { id: 1, title: "Checkpoint 1 Task", text: "Submit the PDF proposal and GitHub link.", category: "School", isPinned: true },
    { id: 2, title: "Grocery List", text: "Milk, eggs, coffee, and pens.", category: "Personal", isPinned: false }
  ]);

  // --- API Fetching Logic ---
  useEffect(() => {
    fetch('https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php')
      .then(res => res.ok ? res.json() : [])
      .then(data => { if (Array.isArray(data)) setApiTitles(data); })
      .catch(err => console.error("Error fetching titles:", err));
  }, []);

  useEffect(() => {
    const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${encodeURIComponent(selectedApiTitle)}&name=${encodeURIComponent(searchTerm)}`;
    
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .then(data => setApiProfiles(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Profile Fetch Error:", err);
        setApiProfiles([]); 
      });
  }, [selectedApiTitle, searchTerm]); 

  const handleAddNote = (newProfile) => {
    const newNote = {
      id: Date.now(),
      title: newProfile.name,
      text: `${newProfile.title}: ${newProfile.bio}`,
      category: "Personal",
      isPinned: false
    };
    setNotes([newNote, ...notes]);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedApiTitle(""); 
  };

  return (
    <Router>
      <div className={isDarkMode ? "app-wrapper dark-mode" : "app-wrapper light-mode"}>
        <Header />
        
        {/* Settings Bar */}
        <div className="controls-wrapper" style={{margin: '20px 0', padding: '10px'}}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="reset-button">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home notes={filteredNotes} isDarkMode={isDarkMode} />} />
          <Route path="/add" element={<AddProfile onAdd={handleAddNote} />} />
          <Route path="/about" element={<About />} />
          <Route path="/profiles" element={
            <>
              <Section title="Search & Filters">
                <div className="controls-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search API profiles..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-input" 
                  />
                  <select 
                    value={selectedApiTitle} 
                    onChange={(e) => setSelectedApiTitle(e.target.value)} 
                    className="filter-dropdown"
                  >
                    <option value="">All API Titles</option>
                    {apiTitles.map((t, i) => <option key={`title-${i}`} value={t}>{t}</option>)}
                  </select>
                  <button onClick={handleReset} className="reset-button">Reset</button>
                </div>
              </Section>

              <Section title="Fetched Profiles (API)">
                <div className="card-wrapper">
                  {apiProfiles.length > 0 ? apiProfiles.map((p, i) => (
                    <NoteCard 
                        key={p.id ? `api-${p.id}` : `api-${i}`} 
                        title={p.name} 
                        text={`${p.title}: ${p.bio}`} 
                        category="Fetched" 
                        isDarkMode={isDarkMode} 
                    />
                  )) : <p className="no-results">No profiles found.</p>}
                </div>
              </Section>

              <Section title="Other Local Notes">
                <div className="card-wrapper">
                  {filteredNotes.filter(n => !n.isPinned).map(note => (
                    <NoteCard key={`note-${note.id}`} {...note} isDarkMode={isDarkMode} />
                  ))}
                </div>
              </Section>
            </>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;