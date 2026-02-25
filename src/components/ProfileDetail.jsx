import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Error fetching detail:", err));
  }, [id]);

  if (!profile) return <p className="no-results" style={{textAlign: 'center', padding: '20px'}}>Loading profile details...</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img 
        src={profile.image_url} 
        alt={profile.name} 
        style={{ 
          borderRadius: '50%', 
          width: '120px', 
          height: '120px', 
          objectFit: 'cover', 
          border: '3px solid #ceb888', 
          marginBottom: '15px' 
        }} 
      />
      <h2 style={{ color: '#ceb888', margin: '5px 0' }}>{profile.name}</h2>
      <p><strong>{profile.title}</strong></p>
      <p style={{ maxWidth: '500px', margin: '15px auto', lineHeight: '1.6' }}>{profile.bio}</p>
      <p>Contact: <span style={{ color: '#ceb888' }}>{profile.email}</span></p>
    </div>
  );
};

export default ProfileDetail;