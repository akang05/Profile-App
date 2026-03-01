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
    if (!formData.name || !formData.bio) return;
    onAdd(formData);
    setFormData({ name: '', email: '', title: '', bio: '', imageUrl: '' });
  };

  return (
    <div className="form-wrapper">
      <form className="profile-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Title" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        <textarea 
          placeholder="Bio" 
          rows="4"
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={formData.imageUrl}
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
        />
        <button type="submit" className="submit-btn">Create Profile</button>
      </form>
    </div>
  );
};

export default AddProfileForm;