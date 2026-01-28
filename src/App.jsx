import { useState } from 'react'; // MUST ADD THIS
import Header from './components/Header';
import Introduction from './components/Introduction';
import Card from './components/Card';
import Section from './components/Section';
import './App.css';

function App() {
  // 1. Setup State for inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const profiles = [
    {
      id: 1,
      title: "Academic Profile",
      email: "kang540@purdue.brightspace.com",
      university: "Purdue University",
      extraInfo: "Fact: Octopuses have three hearts and blue blood.",
      isFeatured: true
    },
    {
      id: 2,
      title: "Personal Profile",
      email: "alvinkang758@gmail.com",
      university: "Purdue University",
      extraInfo: "Hobby: I enjoy music and playing games.",
      isFeatured: false
    }
  ];

  // 2. Filter Logic: This happens every time a user types or clicks
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch = profile.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDropdown = selectedTitle === "" || profile.title === selectedTitle;
    return matchesSearch && matchesDropdown;
  });

  // 3. Reset Function
  const handleReset = () => {
    setSearchTerm("");
    setSelectedTitle("");
  };

  return (
    <div className="App">
      <Header />
      <Introduction />

      {/* NEW SECTION FOR LAB 5 CONTROLS */}
      <Section title="Search & Filter">
        <div className="controls-wrapper">
          <input 
            type="text" 
            placeholder="Search by name/title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select 
            value={selectedTitle} 
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Profiles</option>
            <option value="Academic Profile">Academic Profile</option>
            <option value="Personal Profile">Personal Profile</option>
          </select>

          <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </Section>

      <Section title="My Profiles">
        <div className="card-wrapper">
          {/* 4. Map through FILTERED profiles instead of the original array */}
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Card 
                key={profile.id} 
                title={profile.title}
                email={profile.email}
                university={profile.university}
                extraInfo={profile.extraInfo}
                isFeatured={profile.isFeatured}
              />
            ))
          ) : (
            <p style={{color: "white"}}>No profiles match your search.</p>
          )}
        </div>
      </Section>
    </div>
  );
}

export default App;