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
    
    // Simple validation
    if (!formData.name || !formData.bio) {
      alert("Please fill in the Name and Bio fields.");
      return;
    }
    
    onAdd(formData);
    
    // Reset form after successful submission
    setFormData({ name: '', email: '', title: '', bio: '', imageUrl: '' });
  };

  return (
    <div className="form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="intro-title">Create New Profile</h2>
        
        <div className="input-group">
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
        </div>
        
        <button type="submit" className="submit-btn">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default AddProfileForm;