import { useRef, useLayoutEffect, useState, memo } from 'react'; 
import styles from './Card.module.css';
import { useTheme } from '../context/ThemeContext'; 

function NoteCard({ title, text, category, isPinned, imageUrl, onPin, onDelete }) {
  const { isDarkMode } = useTheme(); 
  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth);
    }
  }, []); 

  // FIX: Using the 'width' variable to dynamically change the card's appearance
  const cardStyle = {
    boxShadow: width > 300 
      ? '0 10px 20px rgba(0,0,0,0.4)' 
      : '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'box-shadow 0.3s ease'
  };

  return (
    <div 
      ref={cardRef} 
      style={cardStyle} // Width is now being "read" here
      className={`${styles.card} ${isPinned ? styles.cardFeatured : styles.cardStandard} ${!isDarkMode ? styles.lightMode : ""}`}
    >
      <button className={styles.pinBtn} onClick={onPin}>
        {isPinned ? "📌" : "📍"}
      </button>
      
      {imageUrl && <img src={imageUrl} alt={title} className={styles.cardImg} />}
      
      <p className={styles.categoryTag}>{category}</p>
      <h3>{title}</h3>
      <p>{text}</p>
      
      {/* Optional: Visual proof of width measurement for your lab requirement */}
      <p style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '10px' }}>
        Note width: {width}px
      </p>
      
      <div className={styles.cardActions}>
        <button onClick={onDelete} className={styles.deleteBtn}>🗑️</button>
      </div>
    </div>
  );
}

export default memo(NoteCard);