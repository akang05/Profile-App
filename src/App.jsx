import { useCallback, Suspense } from 'react'; 
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocalStorage } from './hooks'; 
import { useTheme } from './context/ThemeContext'; 
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import Introduction from './components/Introduction';
import AddProfileForm from './components/AddProfileForm';
import './App.css';

// Logic for the Notes Grid
const Home = ({ notes, searchTerm, togglePin, deleteNote }) => {
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinned = filtered.filter(n => n.isPinned);
  const others = filtered.filter(n => !n.isPinned);

  return (
    <div className="home-layout">
      {/* Visual Priority: Pinned Section */}
      {pinned.length > 0 && (
        <Section title="Pinned">
          <div className="note-grid">
            {pinned.map(note => (
              <NoteCard 
                key={note.id} 
                {...note} 
                onPin={() => togglePin(note.id)} 
                onDelete={() => deleteNote(note.id)} 
              />
            ))}
          </div>
        </Section>
      )}

      {/* Others Section */}
      <Section title="Others">
        <div className="note-grid">
          {others.length > 0 ? (
            others.map(note => (
              <NoteCard 
                key={note.id} 
                {...note} 
                onPin={() => togglePin(note.id)} 
                onDelete={() => deleteNote(note.id)} 
              />
            ))
          ) : (
            <p className="intro-text">No notes found matching your search.</p>
          )}
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
    const newNote = { 
      id: Date.now(), 
      title: newP.name, 
      text: newP.bio, 
      category: newP.title || "Personal", 
      isPinned: false 
    };
    setNotes(prev => [newNote, ...prev]);
  }, [setNotes]);

  return (
    <Router>
      {/* Root fills the whole screen width */}
      <div className={`app-root ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        
        {/* Header matches CSS .main-header */}
        <header className="main-header">
          <h1 className="brand-logo">Keep Lite</h1>
          
          <nav className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/">Other Profiles</Link> 
            <Link to="/add">Add Profile</Link>
            <Link to="/about">About</Link>
          </nav>

          <div className="search-row">
            <input 
              type="text" 
              className="search-input"
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        {/* Content stage handles the gold-bordered box area */}
        <main className="content-stage">
          <Suspense fallback={<div className="intro-text">Loading...</div>}>
            <Routes>
              <Route path="/" element={
                <Home 
                  notes={notes} 
                  searchTerm={searchTerm} 
                  togglePin={togglePin} 
                  deleteNote={deleteNote} 
                />
              } />
              <Route path="/add" element={
                <Section title="Add Profile">
                  <AddProfileForm onAdd={handleAddNote} />
                </Section>
              } />
              <Route path="/about" element={
                <Section title="About Me">
                  <Introduction />
                </Section>
              } />
            </Routes>
          </Suspense>
        </main>
        
      </div>
    </Router>
  );
}

export default App;