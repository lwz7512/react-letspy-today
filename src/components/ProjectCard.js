import { Link, } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div className="p-col-12 w-full sm:w-6 lg:w-4" >
      <div className="feature-card zoom">
          <img className="" alt="components" src={project.image} />
          <div className="top-row">
            { Array(project.level).fill(0).map(
              (_, i) => (
                <span className="px-1" key={i}>
                  <img src="assets/icon/favourite.png" className="star-icon" alt="star" />
                </span>
              )
            )}
            <img src="assets/icon/medal.png" className="complete-badge-icon" alt="badge" />
          </div>
          <div className="footer-row">
            <h3>{project.title}</h3>
          </div>
          <div className="feature-card-detail">
              <p className="text-xl h-8rem">{project.description}</p>
          </div>
          <div className="footer p-5">
            <Link to={`/project/${project.id}`} 
                className="action-button in-card">
                Explore
            </Link>
          </div>
      </div>
  </div>
)

export default ProjectCard