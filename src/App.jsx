import { useState } from 'react';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import Section from './components/Section';
import AddProfileForm from './components/AddProfileForm'; 
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 1. Initial Data in State (so it can be updated)
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
    },
    {
      id: 3,
      title: "React Concept",
      text: "Lifting state up means moving state to the closest common ancestor.",
      category: "School",
      isPinned: false
    }
  ]);

  // 2. Function to handle the form submission from AddProfileForm
  const handleAddNote = (newProfile) => {
    const newNote = {
      id: Date.now(),
      title: newProfile.name, // Using Name field as Title
      text: `${newProfile.title}: ${newProfile.bio}`, // Using Title/Bio fields as Text
      category: "Personal", // Default category for new entries
      isPinned: false
    };
    setNotes([newNote, ...notes]); // Adds new note to the top of the list
  };

  // 3. Logic to handle search and category filtering
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <div className={isDarkMode ? "app-wrapper dark-mode" : "app-wrapper light-mode"}>
      <Header />
      
      {/* Lab 7 Form Section */}
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
            placeholder="Search your notes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Categories</option>
            <option value="School">School</option>
            <option value="Personal">Personal</option>
          </select>

          <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </Section>

      {/* Pinned Section */}
      <Section title="Pinned Notes">
        <div className="card-wrapper">
          {filteredNotes.filter(n => n.isPinned).map(note => (
            <NoteCard key={note.id} {...note} isDarkMode={isDarkMode} />
          ))}
        </div>
      </Section>

      {/* Others Section */}
      <Section title="Others">
        <div className="card-wrapper">
          {filteredNotes.filter(n => !n.isPinned).length > 0 ? (
            filteredNotes.filter(n => !n.isPinned).map(note => (
              <NoteCard key={note.id} {...note} isDarkMode={isDarkMode} />
            ))
          ) : (
            <p className="no-results">No notes found.</p>
          )}
        </div>
      </Section>
    </div>
  );
}

export default App;