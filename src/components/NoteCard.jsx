import { useRef, useLayoutEffect, useState, memo } from 'react'; 
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

function NoteCard(props) {
  const { isDarkMode } = useTheme(); 
  const { id, title, text, category, isPinned, isApi, imageUrl } = props;

  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth);
    }
  }, []); 

  const modeClass = isDarkMode ? "" : styles.lightMode;
  const statusClass = isPinned ? styles.cardFeatured : styles.cardStandard;

  const cardStyle = width > 300 ? { boxShadow: '0 8px 16px rgba(206,184,136,0.3)' } : {};

  return (
    <div 
      ref={cardRef} 
      className={`${styles.card} ${statusClass} ${modeClass}`}
      style={cardStyle}
    >
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
      
      <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Measured width: {width}px</p>
      
      {isApi && id && (
        <Link to={`/profiles/${id}`} style={{ color: '#ceb888', marginTop: '10px', display: 'inline-block', fontWeight: 'bold' }}>
          View Details →
        </Link>
      )}
    </div>
  );
}

// Optimization: memo prevents re-renders if props haven't changed
export default memo(NoteCard);