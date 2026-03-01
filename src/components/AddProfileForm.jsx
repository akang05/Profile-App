import { useForm } from '../hooks'; // Lab 14 hook

function AddProfileForm({ onAdd }) {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    title: '',
    bio: '',
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(values);
    resetForm();
  };

  return (
    <div className="form-wrapper"> 
      <form onSubmit={handleSubmit} className="keep-form">
        <input name="name" placeholder="Name" value={values.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
        <input name="title" placeholder="Title" value={values.title} onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" value={values.bio} onChange={handleChange} rows="5" />
        <input name="imageUrl" placeholder="Image URL" value={values.imageUrl} onChange={handleChange} />
        <button type="submit" className="submit-btn">Create Profile</button>
      </form>
    </div>
  );
}

export default AddProfileForm;