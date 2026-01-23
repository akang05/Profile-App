// src/App.jsx
import Header from './components/Header';
import Introduction from './components/Introduction';
import Card from './components/Card';
import Section from './components/Section';
import './App.css';

function App() {
  // Requirement: Array of card data (at least 2)
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

  return (
    <div className="App">
      <Header />
      <Introduction />

      {/* Requirement: Use the Section wrapper component */}
      <Section title="My Profiles">
        <div className="card-wrapper">
          {/* Requirement: Render cards using .map() */}
          {profiles.map((profile) => (
            <Card 
              key={profile.id} 
              title={profile.title}
              email={profile.email}
              university={profile.university}
              extraInfo={profile.extraInfo}
              isFeatured={profile.isFeatured}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

export default App;