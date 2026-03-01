import React, { useState } from 'react';

const AddProfileForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    bio: '',
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: ensure required fields are present
    if (!formData.name || !formData.bio) {
      alert("Please fill in the Name and Bio fields.");
      return;
    }
    
    onAdd(formData);
    
    // Reset form after successful submission
    setFormData({ name: '', email: '', title: '', bio: '', imageUrl: '' });
  };

  return (
    <div className="form-section"> {/* Changed wrapper to match our new centering CSS */}
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="intro-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
          Create New Profile
        </h2>
        
        <input 
          type="text" 
          placeholder="Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        
        <input 
          type="text" 
          placeholder="Job Title" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        
        <textarea 
          placeholder="Write a short bio..." 
          rows="4"
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          required
        />
        
        <input 
          type="text" 
          placeholder="Image URL (Optional)" 
          value={formData.imageUrl}
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
        />
        
        <button type="submit" className="theme-btn" style={{ width: '100%', marginTop: '10px' }}>
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default AddProfileForm;