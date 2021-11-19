import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';

import { app_brand } from '../config/constants'
import { getProjects } from '../service/ProjectService'
import ProjectCard from '../components/ProjectCard';

const HomePage = () => {

    const [projects, setProjects] = useState([]);
    
    // const history = useHistory()
    // const handleRouteChange = (target, queryParams = '', data = null) => {
    //     history.push({
    //         pathname: target,
    //         search: `?${queryParams}`,
    //         state: data
    //     })
    //     window.scrollTo(0, 0)
    // }

    useEffect(() => {
        setTimeout(() => {
            getProjects().then(data => {
                setProjects(data)
            })
        }, 500) // lazy loading...
    }, [])

    const Spinner = () => (
        <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>
    )

    return (
        <div className="home">
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
                <h1>Projects</h1>
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
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* more features... */}

        </div>
    );
}

export default HomePage