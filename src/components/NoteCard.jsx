import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

function NoteCard(props) {
  const { isDarkMode } = useTheme(); 
  const { id, title, text, category, isPinned, isApi, imageUrl } = props;

  const modeClass = isDarkMode ? "" : styles.lightMode;
  const statusClass = isPinned ? styles.cardFeatured : styles.cardStandard;

  return (
    <div className={`${styles.card} ${statusClass} ${modeClass}`}>
      {/* FIXED: Display image if it exists */}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: '150px', 
            objectFit: 'cover', 
            borderRadius: '8px', 
            marginBottom: '10px' 
          }} 
        />
      )}
      
      {isPinned && <span className={styles.badge}>PINNED</span>}
      <p className={styles.categoryTag}>{category}</p>
      <h3>{title}</h3>
      <p>{text}</p>
      
      {isApi && id && (
        <Link to={`/profiles/${id}`} style={{ color: '#ceb888', marginTop: '10px', display: 'inline-block', fontWeight: 'bold' }}>
          View Details →
        </Link>
      )}
    </div>
  );
}

export default NoteCard;