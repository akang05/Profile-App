import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // NEW

function AddProfileForm({ onAdd }) {
  const navigate = useNavigate(); // NEW: Initialize navigation
  const [formData, setFormData] = useState({
    name: '', email: '', title: '', bio: '', imageUrl: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes('@')) newErrors.email = "Invalid email format";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.bio.length < 10) newErrors.bio = "Bio must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onAdd) onAdd(formData); 
      // NEW: Redirect to homepage
      navigate('/'); 
    }
  };

  return (
    <div className="section-container">
      <form onSubmit={handleSubmit} className="controls-wrapper" style={{ flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />
        {errors.name && <div style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{errors.name}</div>}
        
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />
        <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="search-input" style={{ width: '100%', minHeight: '80px' }} />
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />

        <button type="submit" className="reset-button" style={{ width: '100%' }}>Create Profile</button>
      </form>
    </div>
  );
}

export default AddProfileForm;