import { useRef, useLayoutEffect, useState, memo } from 'react'; 
import styles from './Card.module.css';
import { useTheme } from '../context/ThemeContext'; 

function NoteCard({ title, text, category, isPinned, imageUrl, onPin, onDelete }) {
  const { isDarkMode } = useTheme(); 
  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) setWidth(cardRef.current.offsetWidth);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []); 

  const cardStyle = {
    boxShadow: width > 300 
      ? '0 10px 20px rgba(0,0,0,0.4)' 
      : '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'box-shadow 0.3s ease'
  };

  return (
    <div 
      ref={cardRef} 
      style={cardStyle} 
      className={`
        ${styles.card} 
        ${isPinned ? styles.cardFeatured : styles.cardStandard} 
        ${!isDarkMode ? styles.lightMode : ""}
      `}
    >
      <button className={styles.pinBtn} onClick={onPin} title="Pin Note">
        {isPinned ? "📌" : "📍"}
      </button>
      
      {imageUrl && <img src={imageUrl} alt={title} className={styles.cardImg} />}
      
      <div className={styles.cardContent}>
        <p className={styles.categoryTag}>{category}</p>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{text}</p>
        
        <p className={styles.widthDisplay}>
          Width: {width}px
        </p>
        
        <div className={styles.cardActions}>
          <button onClick={onDelete} className={styles.deleteBtn} title="Delete Note">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(NoteCard);