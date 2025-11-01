const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
            <i className={icon}></i>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
  )
}

export default FeatureCard;