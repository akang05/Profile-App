import { useRef, useLayoutEffect, useState } from 'react'; // Added hooks
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

function NoteCard(props) {
  const { isDarkMode } = useTheme(); 
  const { id, title, text, category, isPinned, isApi, imageUrl } = props;

  // LAB 12: useRef to access the DOM element directly
  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);

  // LAB 12: useLayoutEffect to measure the card before the browser "paints"
  useLayoutEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth);
    }
  }, []); // Run once on mount

  const modeClass = isDarkMode ? "" : styles.lightMode;
  const statusClass = isPinned ? styles.cardFeatured : styles.cardStandard;

  // Dynamic styling based on measured width
  const cardStyle = width > 300 ? { boxShadow: '0 8px 16px rgba(206,184,136,0.3)' } : {};

  return (
    <div 
      ref={cardRef} // Attaching the ref here
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
      
      {/* Visual confirmation for Lab 12 */}
      <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Measured width: {width}px</p>
      
      {isApi && id && (
        <Link to={`/profiles/${id}`} style={{ color: '#ceb888', marginTop: '10px', display: 'inline-block', fontWeight: 'bold' }}>
          View Details →
        </Link>
      )}
    </div>
  );
}

export default NoteCard;