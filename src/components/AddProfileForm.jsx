import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks'; // Import your custom hook

function AddProfileForm({ onAdd }) {
  const navigate = useNavigate();
  
  // LAB 14: Use your custom useForm hook instead of useReducer
  const [formData, handleChange] = useForm({ 
    name: '', 
    email: '', 
    title: '', 
    bio: '', 
    imageUrl: '' 
  });

  const [errors, setErrors] = useState({});

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
      navigate('/'); 
    }
  };

  return (
    <div className="section-container">
      <form onSubmit={handleSubmit} className="controls-wrapper" style={{ flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
        {/* Note: The 'name' attribute on inputs MUST match the keys in your hook's initial state */}
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />
        {errors.name && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '10px' }}>{errors.name}</div>}
        
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />
        {errors.email && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '10px' }}>{errors.email}</div>}

        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />
        {errors.title && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '10px' }}>{errors.title}</div>}

        <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="search-input" style={{ width: '100%', minHeight: '80px', marginBottom: '10px' }} />
        {errors.bio && <div style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '10px' }}>{errors.bio}</div>}

        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="search-input" style={{ width: '100%', marginBottom: '10px' }} />

        <button type="submit" className="reset-button" style={{ width: '100%' }}>Create Profile</button>
      </form>
    </div>
  );
}

export default AddProfileForm;