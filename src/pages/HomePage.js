import React from 'react';
import { useHistory } from 'react-router-dom';

import useLocalStorageState from 'use-local-storage-state'

import { app_brand } from '../config/constants'
import ProjectCard from '../components/ProjectCard';
import projectStore from '../state/ProjectState'

import HeroCard from "../components/HeroCard";
import ContactCard from "../components/ContactCard";

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
                <HeroCard 
                    tileA={app_brand.hero_title_a}
                    titleB={app_brand.hero_title_b}
                    route={app_brand.action_now_route}
                    actionNow={app_brand.action_now_label}
                />
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
            {/* work with me */}
            <div className="col-12 my-0 md:my-5 cta-section">
                <ContactCard 
                    handleRoute={()=>handleRouteChange('/contact')} 
                />
            </div>
        </div>
    );
}

export default HomePage