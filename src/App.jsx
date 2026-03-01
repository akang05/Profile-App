import { useCallback, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocalStorage } from './hooks'; 
import { useTheme } from './context/ThemeContext'; 
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import Introduction from './components/Introduction';
import './App.css';

const AddNoteForm = lazy(() => import('./components/AddProfileForm'));

// This component now USES the variables that were throwing errors
const Home = ({ notes, searchTerm, togglePin, deleteNote }) => {
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-layout">
      {/* If there are pinned notes (like your Welcome note), show them first */}
      <Section title="Welcome">
        <div className="card-stack">
          {filtered.map(note => (
            <NoteCard 
              key={note.id} 
              {...note} 
              onPin={() => togglePin(note.id)} 
              onDelete={() => deleteNote(note.id)} 
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

function App() {
  const { isDarkMode, toggleTheme } = useTheme(); 
  const [searchTerm, setSearchTerm] = useLocalStorage("keepSearch", "");
  
  // These are the variables that were "unused"
  const [notes, setNotes] = useLocalStorage("keepNotes", [
    { id: 1, title: "Welcome", text: "I am a student at Purdue University...", category: "Personal", isPinned: true }
  ]);

  const togglePin = (id) => setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  const handleAddNote = useCallback((newP) => {
    const newNote = { id: Date.now(), title: newP.name, text: newP.bio, category: "Personal", isPinned: false };
    setNotes(prev => [newNote, ...prev]);
  }, [setNotes]);

  return (
    <Router>
      <div className={`app-root ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div className="desktop-container">
          
          <header className="site-header">
            <h1 className="logo">Keep Lite</h1>
            <nav className="main-nav">
              <Link to="/">Home</Link>
              <Link to="/add">Add Profile</Link>
              <Link to="/about">About</Link>
            </nav>

            <div className="utility-bar">
              <input 
                type="text" 
                className="search-input"
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={toggleTheme} className="theme-btn">
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
          </header>

          <main className="page-content">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* We pass the variables here so the errors stop */}
                <Route path="/" element={
                  <Home 
                    notes={notes} 
                    searchTerm={searchTerm} 
                    togglePin={togglePin} 
                    deleteNote={deleteNote} 
                  />
                } />
                <Route path="/add" element={<AddNoteForm onAdd={handleAddNote} />} />
                <Route path="/about" element={<Section title="About Me"><Introduction /></Section>} />
              </Routes>
            </Suspense>
          </main>
          
        </div>
      </div>
    </Router>
  );
}

export default App;