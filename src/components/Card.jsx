// src/components/Card.jsx
function Card(props) {
  // Extract the data sent from App.jsx
  const { title, email, university, extraInfo, isFeatured } = props;

  // className based on the isFeatured prop
  const statusClass = isFeatured ? "card-featured" : "card-standard";

  return (
    <div className={statusClass}>
      <h3>{title}</h3>
      <p>Contact: {email}</p>
      <p>University: {university}</p>
      <p>{extraInfo}</p>
    </div>
  );
}

export default Card;