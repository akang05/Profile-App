import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { useLocalStorage } from './hooks';
import { useTheme } from './context/ThemeContext'; 
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import Introduction from './components/Introduction';
import './App.css';

// Lab 13 Optimization: Lazy load components
const AddProfileForm = lazy(() => import('./components/AddProfileForm'));
const ProfileDetail = lazy(() => import('./components/ProfileDetail'));

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
  const [searchTerm, setSearchTerm] = useLocalStorage("lastSearch", "");
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

  // Lab 13 Optimization: useCallback prevents the function from being re-created
  const handleAddNote = useCallback((newP) => {
    const newNote = { 
      id: Date.now(), 
      title: newP.name, 
      text: newP.bio, 
      imageUrl: newP.imageUrl, 
      category: "Personal", 
      isPinned: false 
    };
    setNotes(prev => [newNote, ...prev]);
  }, []); 

  return (
    <Router>
      <div className={isDarkMode ? "app-wrapper dark-mode" : "app-wrapper light-mode"}>
        <Header />
        <div style={{ textAlign: 'center', margin: '15px' }}>
          <button onClick={toggleTheme} className="reset-button">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Lab 13 Optimization: Suspense handles the loading state for Lazy components */}
        <Suspense fallback={<div style={{textAlign: 'center', padding: '50px', color: '#ceb888'}}>Loading Page Content...</div>}>
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
        </Suspense>
      </div>
    </Router>
  );
}

export default App;