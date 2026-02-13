import styles from './Card.module.css';
import { Link } from 'react-router-dom'; // NEW

function NoteCard(props) {
  const { id, title, text, category, isPinned, isDarkMode, isApi } = props;

  const modeClass = isDarkMode ? "" : styles.lightMode;
  const statusClass = isPinned ? styles.cardFeatured : styles.cardStandard;

  return (
    <div className={`${styles.card} ${statusClass} ${modeClass}`}>
      {isPinned && <span className={styles.badge}>PINNED</span>}
      <p className={styles.categoryTag}>{category}</p>
      <h3>{title}</h3>
      <p>{text}</p>
      
      {/* NEW: Link to dynamic detail page if it's an API profile */}
      {isApi && id && (
        <Link to={`/profiles/${id}`} style={{ color: '#ceb888', marginTop: '10px', display: 'inline-block', fontWeight: 'bold' }}>
          View Details →
        </Link>
      )}
    </div>
  );
}

export default NoteCard;