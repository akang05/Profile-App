import { useState } from 'react';

function AddProfileForm({ onAdd }) {
  // 1. Controlled Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    bio: '',
    imageUrl: ''
  });

  // 2. Feedback States
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing again
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // 3. Validation Logic
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
    setSuccessMessage('');

    if (validate()) {
      // Simulate successful submission
      console.log("Form Submitted:", formData);
      setSuccessMessage("Profile added successfully!");
      
      // Clear form
      setFormData({ name: '', email: '', title: '', bio: '', imageUrl: '' });
      
      // Update the main list in App.jsx
      if (onAdd) onAdd(formData); 
    }
  };

  return (
    <div className="section-container">
      {/* Redundant header removed to fix the "double title" issue */}
      
      {successMessage && (
        <p style={{ 
          color: '#ceb888', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '15px' 
        }}>
          {successMessage}
        </p>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="controls-wrapper" 
        style={{ 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto' 
        }}
      >
        
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <input 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="search-input" 
            style={{ width: '100%' }}
          />
          {errors.name && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</div>}
        </div>

        <div style={{ width: '100%', marginBottom: '10px' }}>
          <input 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="search-input" 
            style={{ width: '100%' }}
          />
          {errors.email && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</div>}
        </div>

        <div style={{ width: '100%', marginBottom: '10px' }}>
          <input 
            name="title" 
            placeholder="Title (e.g. Student)" 
            value={formData.title} 
            onChange={handleChange} 
            className="search-input" 
            style={{ width: '100%' }}
          />
          {errors.title && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginTop: '4px' }}>{errors.title}</div>}
        </div>

        <div style={{ width: '100%', marginBottom: '10px' }}>
          <textarea 
            name="bio" 
            placeholder="Short Bio" 
            value={formData.bio} 
            onChange={handleChange} 
            className="search-input" 
            style={{ width: '100%', minHeight: '80px', fontFamily: 'inherit' }}
          />
          {errors.bio && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginTop: '4px' }}>{errors.bio}</div>}
        </div>

        <div style={{ width: '100%', marginBottom: '10px' }}>
          <input 
            name="imageUrl" 
            placeholder="Image URL" 
            value={formData.imageUrl} 
            onChange={handleChange} 
            className="search-input" 
            style={{ width: '100%' }}
          />
        </div>

        <button type="submit" className="reset-button" style={{ marginTop: '10px', width: '100%' }}>
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default AddProfileForm;