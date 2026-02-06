import { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import AddProfileForm from './components/AddProfileForm'; 
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // --- Lab 8 State Variables ---
  const [apiProfiles, setApiProfiles] = useState([]);      
  const [apiTitles, setApiTitles] = useState([]);          
  const [selectedApiTitle, setSelectedApiTitle] = useState(""); 

  // 1. Initial Data for local notes (Lab 7)
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Checkpoint 1 Task",
      text: "Submit the PDF proposal and the GitHub link by the deadline.",
      category: "School",
      isPinned: true
    },
    {
      id: 2,
      title: "Grocery List",
      text: "Milk, eggs, coffee, and Purdue gold-colored pens.",
      category: "Personal",
      isPinned: false
    }
  ]);

  // --- Lab 8: Fetch Logic ---

  useEffect(() => {
    fetch('https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) setApiTitles(data);
      })
      .catch(err => console.error("Error fetching titles:", err));
  }, []);

  useEffect(() => {
    // Only fetch if state is healthy
    const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${encodeURIComponent(selectedApiTitle)}&name=${encodeURIComponent(searchTerm)}`;
    
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setApiProfiles(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Error fetching API data:", err);
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
    <div className={isDarkMode ? "app-wrapper dark-mode" : "app-wrapper light-mode"}>
      <Header />
      
      <Section title="Add New Note/Profile">
         <AddProfileForm onAdd={handleAddNote} />
      </Section>

      <Section title="Settings & Search">
        <div className="controls-wrapper">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="reset-button">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <input 
            type="text" 
            placeholder="Search all sections..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Local Categories</option>
            <option value="School">School</option>
            <option value="Personal">Personal</option>
          </select>

          <select 
            value={selectedApiTitle} 
            onChange={(e) => setSelectedApiTitle(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All API Titles</option>
            {apiTitles.map((title, index) => (
              <option key={`title-${index}`} value={title}>{title}</option>
            ))}
          </select>

          <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </Section>

      <Section title="Fetched Profiles (API)">
        <div className="card-wrapper">
          {apiProfiles.length > 0 ? (
            apiProfiles.map((profile, index) => (
              <NoteCard 
                // FIXED KEY: Combines ID and Index for guaranteed uniqueness and stability
                key={profile.id ? `api-${profile.id}` : `api-idx-${index}`} 
                title={profile.name || "Unknown Name"} 
                text={`${profile.title || "No Title"}: ${profile.bio || "No Bio available"}`} 
                category="Fetched"
                isDarkMode={isDarkMode} 
              />
            ))
          ) : (
            <p className="no-results">No profiles found in the database.</p>
          )}
        </div>
      </Section>

      <Section title="Pinned Notes">
        <div className="card-wrapper">
          {filteredNotes.filter(n => n.isPinned).map(note => (
            <NoteCard key={`note-${note.id}`} {...note} isDarkMode={isDarkMode} />
          ))}
        </div>
      </Section>

      <Section title="Others">
        <div className="card-wrapper">
          {filteredNotes.filter(n => !n.isPinned).map(note => (
            <NoteCard key={`note-${note.id}`} {...note} isDarkMode={isDarkMode} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export default App;