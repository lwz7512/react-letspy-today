import { Link, } from 'react-router-dom';

const HeroCard = ({tileA, titleB, route, actionNow}) => (
  <div className="card hero border-noround md:border-round">
    <h1 className="intro-title">{tileA}</h1>
    <h2 className="intro-subtitle">{titleB}</h2>
    <Link to={route} className="action-button">
        {actionNow}
    </Link>
  </div>
)

export default HeroCard