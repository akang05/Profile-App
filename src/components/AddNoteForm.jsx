import React, { useState } from 'react';

// Renamed component for clarity
const AddNoteForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',    // Changed from name
    category: '', // Changed from title/job title
    text: '',     // Changed from bio
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Match the new field names
    if (!formData.title || !formData.text) {
      alert("Please fill in the Note Title and Note Text.");
      return;
    }
    
    onAdd(formData);
    
    // Reset form
    setFormData({ title: '', category: '', text: '', imageUrl: '' });
  };

  return (
    <div className="form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="intro-title">Create New Note</h2>
        
        <div className="input-group">
          {/* Note Title */}
          <input 
            type="text" 
            placeholder="Note Title" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          
          {/* Category */}
          <input 
            type="text" 
            placeholder="Category (e.g. Work, Personal, School)" 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          
          {/* Note Text (The main content) */}
          <textarea 
            placeholder="Take a note..." 
            rows="5"
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            required
          />
          
          {/* Image URL */}
          <input 
            type="text" 
            placeholder="Image URL (Optional)" 
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default AddNoteForm;