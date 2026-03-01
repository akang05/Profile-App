import { useCallback, Suspense } from 'react'; // Removed useState and lazy since they weren't being used
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocalStorage } from './hooks'; 
import { useTheme } from './context/ThemeContext'; 
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import Introduction from './components/Introduction';
import AddProfileForm from './components/AddProfileForm';
import './App.css';

// This component now USES the variables (notes, togglePin, deleteNote)
const Home = ({ notes, searchTerm, togglePin, deleteNote }) => {
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-layout">
      {/* Visual Priority: Pinned items at the top */}
      {notes.some(n => n.isPinned) && (
        <Section title="Pinned">
          <div className="note-grid">
            {filtered.filter(n => n.isPinned).map(note => (
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
          {filtered.filter(n => !n.isPinned).map(note => (
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
  
  // These variables are now passed into the Home component below
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
                placeholder="Search notes..." 
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
                {/* Fixed: Variables are passed as props here */}
                <Route path="/" element={
                  <Home 
                    notes={notes} 
                    searchTerm={searchTerm} 
                    togglePin={togglePin} 
                    deleteNote={deleteNote} 
                  />
                } />
                <Route path="/add" element={<Section title="Add Profile"><AddProfileForm onAdd={handleAddNote} /></Section>} />
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