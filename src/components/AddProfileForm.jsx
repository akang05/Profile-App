import { useReducer, useState } from 'react'; // Added useReducer
import { useNavigate } from 'react-router-dom';

// LAB 12: Reducer function to handle complex state logic
const initialState = { name: '', email: '', title: '', bio: '', imageUrl: '' };

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function AddProfileForm({ onAdd }) {
  const navigate = useNavigate();
  
  // LAB 12: Implementing useReducer instead of multiple useStates
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatching an action to update the state
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
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
      navigate('/'); 
    }
  };

  return (
    <div className="section-container">
      <form onSubmit={handleSubmit} className="controls-wrapper" style={{ flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
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