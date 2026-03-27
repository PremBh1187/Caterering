function getPastelColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 85%)`;
}


export default function CatererCard({ caterer }) {
  const bgColor = getPastelColor(caterer.name + caterer.id);

  return (
    <div className="card" style={{ background: bgColor }}>
      <div className="card-header">
        <h3>{caterer.name}</h3>
        <div className="price-badge">
          ${caterer.pricePerPlate}
        </div>
      </div>

      <p className="card-location">📍 {caterer.location}</p>

      <div className="card-cuisines">
        {caterer.cuisines.map((cuisine, i) => (
          <span key={i} className="cuisine-tag">
            {cuisine}
          </span>
        ))}
      </div>

      <div className="card-rating">
        <span>⭐ {caterer.rating}</span>
      </div>
    </div>
  );
}