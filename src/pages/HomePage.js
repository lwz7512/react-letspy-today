import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { app_brand } from '../constants'
import { getProjects } from '../service/ProjectService'

const HomePage = () => {

    const [projects, setProjects] = useState([]);

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

    const ProjectCard = ({ project }) => (
        <div className="p-col-12 md:w-4" >
            <div className="feature-card">
                <img alt="components" src={project.image} />
                <div className="feature-card-detail">
                    <span className="feature-name">{project.title}</span>
                    <p>{project.description}</p>
                </div>
            </div>
        </div>
    )

    return (
        <div className="home">
            {/* hero */}
            <div className="col-12">
                <div className="card hero">
                    <div className="intro-title">{app_brand.hero_title_a}</div>
                    <div className="intro-subtitle">{app_brand.hero_title_b}</div>
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
                            <ProjectCard key={i} project={project} />
                        ))}
                    </div>
                )}
            </div>
            {/* more features... */}

        </div>
    );
}

export default HomePage