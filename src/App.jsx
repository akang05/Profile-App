import { useState, useEffect } from 'react'; // Added useEffect
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
  const [apiProfiles, setApiProfiles] = useState([]);      // Data from fetch-data.php
  const [apiTitles, setApiTitles] = useState([]);          // Data from get-titles.php
  const [selectedApiTitle, setSelectedApiTitle] = useState(""); // Title filter state

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

  // A. Fetch titles for the dropdown once on load
  useEffect(() => {
    fetch('https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php')
      .then(res => res.json())
      .then(data => setApiTitles(data))
      .catch(err => console.error("Error fetching titles:", err));
  }, []);

  // B. Fetch profiles based on Title Filter AND Search Term
  useEffect(() => {
    const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${selectedApiTitle}&name=${searchTerm}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => setApiProfiles(data))
      .catch(err => console.error("Error fetching API data:", err));
  }, [selectedApiTitle, searchTerm]); 

  // Function to handle the local form submission (Lab 7)
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

  // Logic to handle local filtering
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedApiTitle(""); // Reset API filter too
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

          {/* Local Category Filter */}
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Local Categories</option>
            <option value="School">School</option>
            <option value="Personal">Personal</option>
          </select>

          {/* Lab 8: API Title Filter */}
          <select 
            value={selectedApiTitle} 
            onChange={(e) => setSelectedApiTitle(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All API Titles</option>
            {apiTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>

          <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </Section>

      {/* Lab 8: Fetched Data Section */}
      <Section title="Fetched Profiles (API)">
        <div className="card-wrapper">
          {apiProfiles.length > 0 ? (
            apiProfiles.map((profile) => (
              <NoteCard 
                key={profile.id} 
                title={profile.name} 
                text={`${profile.title}: ${profile.bio}`} 
                category="Fetched"
                isDarkMode={isDarkMode} 
              />
            ))
          ) : (
            <p className="no-results">No profiles match your search/filter.</p>
          )}
        </div>
      </Section>

      {/* Local Notes Sections */}
      <Section title="Pinned Notes">
        <div className="card-wrapper">
          {filteredNotes.filter(n => n.isPinned).map(note => (
            <NoteCard key={note.id} {...note} isDarkMode={isDarkMode} />
          ))}
        </div>
      </Section>

      <Section title="Others">
        <div className="card-wrapper">
          {filteredNotes.filter(n => !n.isPinned).map(note => (
            <NoteCard key={note.id} {...note} isDarkMode={isDarkMode} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export default App;