function Section({ title, children }) {
  return (
    <div className="section-container">
      <h2 className="section-title">{title}</h2>
      {/* Renders whatever you wrap inside <Section> in App.jsx */}
      <div className="section-content">
        {children}
      </div>
    </div>
  );
}

export default Section;