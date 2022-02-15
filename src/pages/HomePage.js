import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from 'primereact/button';
import useLocalStorageState from 'use-local-storage-state'

import { app_brand } from '../config/constants'
import ProjectCard from '../components/ProjectCard';
import projectStore from '../state/ProjectState'

const HomePage = () => {

    const history = useHistory()
    const projects = projectStore(state => state.projects)
    const [completed, ] = useLocalStorageState('projects_status', {})

    const handleRouteChange = (target, queryParams = '', data = null) => {
        history.push({
            pathname: target,
            search: `?${queryParams}`,
            state: data
        })
        window.scrollTo(0, 0)
    }

    const Spinner = () => (
        <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>
    )

    return (
        <div className="home md:pt-0">
            {/* hero */}
            <div className="col-12 px-0 sm:px-2">
                <div className="card hero border-noround md:border-round">
                    <h1 className="intro-title">{app_brand.hero_title_a}</h1>
                    <h2 className="intro-subtitle">{app_brand.hero_title_b}</h2>
                    <Link to={app_brand.action_now_route} className="action-button">
                        {app_brand.action_now_label}
                    </Link>
                </div>
            </div>
            {/* projects title */}
            <div className="col-12 features">
                <h1 className="mb-6">
                    <span className="header-title ">PROJECTS</span>
                </h1>
                <p className="text-2xl">
                    {app_brand.feature_title_a}
                    <span role="img" aria-label="celebrate" className="px-2">
                        {app_brand.feature_title_b}
                    </span> 
                    {app_brand.feature_title_c}
                </p>
            </div>
            {/* projects grid */}
            <div className="col-12 features">
                { !projects.length && (
                    <Spinner />
                )}
                { projects.length > 0 && (
                    <div className="grid">
                        { projects.map((project, i) => (
                            <ProjectCard 
                                key={i} 
                                project={project}
                                completed={completed}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* more features... */}
            <div className="col-12 my-0 md:my-5 cta-section">
                <div className="card m-2 md:m-3 p-5 xl:p-7 border-round surface-50">
                    <div className="grid">
                        <div className="section-content cell w-12 md:w-6">
                            <h2 className="text-2xl xl:text-5xl">Let’s Work Together!</h2>
                            <div className="text-block mt-5">
                                <p className="text-xl x:text-2xl text-600">
                                    Say hello at <a href="mailto:lwz7512@gmail.com">lwz7512@gmail.com </a>
                                    or tell me more about your ideas by getting this better.
                                </p>
                            </div>
                            <div className="button-group mt-5 flex justify-content-center md:justify-content-start">
                                <Button label="Let’s start" onClick={()=>handleRouteChange('/contact')} />
                            </div>
                        </div>
                        <div className="section-image cell mt-5 lg:mt-0 w-12 w-12 md:w-6">
                            <img src="assets/layout/images/130.png" alt="cta" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage