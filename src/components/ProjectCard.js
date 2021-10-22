import { Button } from 'primereact/button';

const ProjectCard = ({ project, handleRouteChange }) => (
  <div className="p-col-12 w-full sm:w-6 lg:w-4" >
      <div className="feature-card">
          <img alt="components" src={project.image} />
          <div className="feature-card-detail">
              <span className="feature-name">{project.title}</span>
              <p>{project.description}</p>
          </div>
          <div className="footer p-5">
              <Button 
                  className="p-button-rounded py-2 px-4 text-xl"
                  onClick={() => handleRouteChange(`/project/${project.id}`)}>
                  Explore
              </Button>
          </div>
      </div>
  </div>
)

export default ProjectCard