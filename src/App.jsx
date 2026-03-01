import { useState, useCallback, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks'; 
import { useTheme } from './context/ThemeContext'; 
import Header from './components/Header';
import Sidebar from './components/Sidebar'; 
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import Introduction from './components/Introduction';
import './App.css';

const AddNoteForm = lazy(() => import('./components/AddProfileForm'));

const Home = ({ notes, searchTerm, togglePin, deleteNote }) => {
  const navigate = useNavigate();
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="quick-add-container" onClick={() => navigate('/add')}>
        <div className="quick-add-bar">
          <span className="placeholder-text">Take a note...</span>
          <div className="quick-icons">
            <span>☑️</span> <span>🖌️</span> <span>🖼️</span>
          </div>
        </div>
      </div>

      {notes.some(n => n.isPinned) && (
        <Section title="PINNED">
          <div className="card-wrapper">
            {filtered.filter(n => n.isPinned).map(note => (
              <NoteCard key={note.id} {...note} onPin={() => togglePin(note.id)} onDelete={() => deleteNote(note.id)} />
            ))}
          </div>
        </Section>
      )}

      <Section title="OTHERS">
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useLocalStorage("keepSearch", "");
  const [notes, setNotes] = useLocalStorage("keepNotes", [
    { id: 1, title: "Welcome", text: "I am a student at Purdue University...", category: "Personal", isPinned: true }
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const togglePin = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

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
  }, [setNotes]);

  return (
    <Router>
      {/* The class here controls the entire screen background */}
      <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          toggleTheme={toggleTheme} 
          isDarkMode={isDarkMode} 
          toggleSidebar={toggleSidebar}
        />
        
        <div className="body-wrapper">
          <Sidebar isOpen={isSidebarOpen} />
          
          <Suspense fallback={<div className="loading-screen">Loading...</div>}>
            <div className="content-area">
              <Routes>
                <Route path="/" element={<Home notes={notes} searchTerm={searchTerm} togglePin={togglePin} deleteNote={deleteNote} />} />
                <Route path="/add" element={<Section title="Add Profile"><AddNoteForm onAdd={handleAddNote} /></Section>} />
                <Route path="/about" element={<Section title="About Me"><Introduction /></Section>} />
                <Route path="/profiles" element={<Section title="Other Profiles">Community content goes here.</Section>} />
              </Routes>
            </div>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;