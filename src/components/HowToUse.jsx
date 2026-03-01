import React from 'react';

const HowToUse = () => {
  return (
    <div className="how-to-content">
      <div className="how-to-step">
        <h3>1. Create a New Note</h3>
        <p>Click on the <strong>"New Note"</strong> link in the navigation bar. Enter a title, pick a category, and write down your thoughts. You can even add an image URL to make your note visual!</p>
      </div>

      <div className="how-to-step">
        <h3>2. Pin Important Notes</h3>
        <p>On your home screen, click the <strong>📍 icon</strong> on any note. This will move it to the "Pinned" section at the top so you never lose track of important info.</p>
      </div>

      <div className="how-to-step">
        <h3>3. Search Your Collection</h3>
        <p>Use the search bar in the top-right corner to instantly filter through your notes. It searches both the title and the body text in real-time.</p>
      </div>

      <div className="how-to-step">
        <h3>4. Dark & Light Mode</h3>
        <p>Toggle the <strong>☀️/🌙 icon</strong> in the header to switch themes. Your preference will be saved even if you refresh the page.</p>
      </div>
      
      <div className="how-to-step">
        <h3>5. Delete Notes</h3>
        <p>Finished with a task? Click the <strong>🗑️ icon</strong> to remove the note from your dashboard permanently.</p>
      </div>
    </div>
  );
};

export default HowToUse;