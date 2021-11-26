import { Link, } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div className="p-col-12 w-full sm:w-6 lg:w-4" >
      <div className="feature-card">
          <img alt="components" src={project.image} />
          <div className="feature-card-detail">
              <h2 className="feature-name text-2xl">{project.title}</h2>
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