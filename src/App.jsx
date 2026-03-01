import { useCallback, Suspense } from 'react'; 
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocalStorage } from './hooks'; 
import { useTheme } from './context/ThemeContext'; 
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import HowToUse from './components/HowToUse'; 
import AddNoteForm from './components/AddNoteForm'; 
import './App.css';

const Home = ({ notes, searchTerm, togglePin, deleteNote }) => {
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinned = filtered.filter(n => n.isPinned);
  const others = filtered.filter(n => !n.isPinned);

  return (
    <div className="home-layout">
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
    { id: 1, title: "Welcome", text: "Take a new note to get started!", category: "General", isPinned: true }
  ]);

  const togglePin = (id) => setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  const handleAddNote = useCallback((newN) => {
    const newNote = { 
      id: Date.now(), 
      title: newN.title, 
      text: newN.text,   
      category: newN.category || "General", 
      imageUrl: newN.imageUrl,
      isPinned: false 
    };
    setNotes(prev => [newNote, ...prev]);
  }, [setNotes]);

  return (
    <Router>
      <div className={`app-root ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <header className="main-header">
          <div className="nav-container">
            <h1 className="brand-logo-small">Keep Lite</h1>
            
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/add">New Note</Link>
              <Link to="/how-to">How to Use</Link>
            </nav>

            <div className="nav-utility">
              <input 
                type="text" 
                className="nav-search-input"
                placeholder="Search notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={toggleTheme} className="theme-toggle-compact">
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </header>

        <main className="content-stage">
          <Suspense fallback={<div className="intro-text">Loading...</div>}>
            <Routes>
              <Route path="/" element={
                <Home notes={notes} searchTerm={searchTerm} togglePin={togglePin} deleteNote={deleteNote} />
              } />
              <Route path="/add" element={
                <Section>
                  <AddNoteForm onAdd={handleAddNote} />
                </Section>
              } />
              <Route path="/how-to" element={
                <Section>
                  <HowToUse />
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