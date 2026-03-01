import { useState, useCallback, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content-scroll">
      <div className="quick-add-container">
        <div className="quick-add-bar">
          <span>Take a note...</span>
          <div className="quick-icons">☑️ 🖌️ 🖼️</div>
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
    { id: 1, title: "Welcome", text: "I am a student at Purdue...", category: "Personal", isPinned: true }
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const togglePin = (id) => setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  const handleAddNote = useCallback((newP) => {
    const newNote = { id: Date.now(), title: newP.name, text: newP.bio, category: "Personal", isPinned: false };
    setNotes(prev => [newNote, ...prev]);
  }, [setNotes]);

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          toggleTheme={toggleTheme} 
          toggleSidebar={toggleSidebar}
        />
        
        <div className="body-wrapper">
          <Sidebar isOpen={isSidebarOpen} />
          <main className="content-area">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home notes={notes} searchTerm={searchTerm} togglePin={togglePin} deleteNote={deleteNote} />} />
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