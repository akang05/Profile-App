import styles from './Card.module.css';

function NoteCard(props) {
  // title, text, and category
  const { title, text, category, isPinned, isDarkMode } = props;

  const modeClass = isDarkMode ? "" : styles.lightMode;
  // Use 'featured' style for pinned notes
  const statusClass = isPinned ? styles.cardFeatured : styles.cardStandard;

  return (
    <div className={`${styles.card} ${statusClass} ${modeClass}`}>
      {isPinned && <span className={styles.badge}>PINNED</span>}
      <p className={styles.categoryTag}>{category}</p>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default NoteCard;