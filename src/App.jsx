import { useCallback, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocalStorage } from './hooks'; 
import { useTheme } from './context/ThemeContext'; 
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import Introduction from './components/Introduction';
import './App.css';

const AddNoteForm = lazy(() => import('./components/AddProfileForm'));

const Home = ({ notes, searchTerm, togglePin, deleteNote }) => {
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {notes.some(n => n.isPinned) && (
        <Section title="Welcome">
          <div className="card-wrapper">
            {filtered.filter(n => n.isPinned).map(note => (
              <NoteCard key={note.id} {...note} onPin={() => togglePin(note.id)} onDelete={() => deleteNote(note.id)} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Others">
        <div className="card-wrapper">
          {filtered.filter(n => !n.isPinned).map(note => (
            <NoteCard key={note.id} {...note} onPin={() => togglePin(note.id)} onDelete={() => deleteNote(note.id)} />
          ))}
        </div>
      </Section>
    </div>
  );
};

function App() {
  const { isDarkMode, toggleTheme } = useTheme(); 
  const [searchTerm, setSearchTerm] = useLocalStorage("keepSearch", "");
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
      <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        
        {/* Centered Header Section */}
        <header className="original-header">
          <h1 className="main-title">Keep Lite</h1>
          <nav className="top-nav">
            <Link to="/">Home</Link>
            <Link to="/profiles">Other Profiles</Link>
            <Link to="/add">Add Profile</Link>
            <Link to="/about">About</Link>
          </nav>
          
          <div className="controls">
            <input 
              type="text" 
              className="top-search" 
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={toggleTheme} className="theme-btn">
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        <main className="centered-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home notes={notes} searchTerm={searchTerm} togglePin={togglePin} deleteNote={deleteNote} />} />
              <Route path="/add" element={<AddNoteForm onAdd={handleAddNote} />} />
              <Route path="/about" element={<Introduction />} />
              <Route path="/profiles" element={<div className="placeholder-text">Community Profiles Coming Soon</div>} />
            </Routes>
          </Suspense>
        </main>
        
      </div>
    </Router>
  );
}

export default App;