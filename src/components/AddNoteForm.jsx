import React, { useState } from 'react';

const AddNoteForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    text: '',
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.text) {
      alert("Please fill in the Note Title and Note Text.");
      return;
    }
    onAdd(formData);
    setFormData({ title: '', category: '', text: '', imageUrl: '' });
  };

  return (
    <div className="form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="intro-title">Create New Note</h2>
        
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Note Title" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input 
            type="text" 
            placeholder="Category (e.g. Work, Personal, School)" 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          <textarea 
            placeholder="Take a note..." 
            rows="5"
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            required
          />
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