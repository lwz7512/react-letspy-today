import { Link, } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div className="p-col-12 w-full sm:w-6 lg:w-4" >
      <div className="feature-card">
          <img alt="components" src={project.image} />
          <div className="feature-card-detail">
              <span className="feature-name">{project.title}</span>
              <p>{project.description}</p>
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