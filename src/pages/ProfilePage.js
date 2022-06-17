import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { ProgressBar } from 'primereact/progressbar'
import useLocalStorageState from 'use-local-storage-state'

import { isAuthenticated, decodeToken } from '../helper/withAuth'
import projectStore from '../state/ProjectState'

const ProfilePage = () => {

    const projects = projectStore(state => state.projects)
    const [completed, ] = useLocalStorageState('projects_status', {})

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [{ email, given_name, picture }, setUserInfo] = useState({})
    const [progress, setProgress] = useState({finished: 0, stars: 0})

    useEffect(() => {
        const tokenExist = isAuthenticated()
        if (!tokenExist) return

        setIsLoggedIn(true)
        setUserInfo(decodeToken())

        const projectsTotal = projects.length || 100 // long term goal is to have 100 projects!
        const percent = (Number(Object.keys(completed).length/projectsTotal)*100).toFixed(0)
        const counterFunction = (prev, project) => completed[project.id] ? prev+project.level : prev
        const starTotal = projects.reduce(counterFunction, 0)
        setProgress({finished: percent, stars: starTotal})

    }, [isLoggedIn, projects, completed])


    const loginSuccessHandler = credentialResponse => {
        // save first
        localStorage.setItem('LETSPY_TOKEN', credentialResponse.credential)
        setIsLoggedIn(true)
        // TODO: SEND token_id to backend get user info ...
        console.log(`>>> sending email: ${email}`)
    }

    const checkLinkState = star => {
        const styleAndUrl = {
            0 : {
                style: 'secret-link',
                url: '/#/profile'
            },
        }
        if (progress.stars >= 1) {
            styleAndUrl[1] = {
                style: 'secret-link active',
                url: '/#/cheatsheet/python_beginner_cheatsheet'
            }
        }
        if (progress.stars >= 3) {
            styleAndUrl[3] = {
                style: 'secret-link active',
                url: '/#/cheatsheet/phaserjs_beginner_cheatsheet'
            }
        }
        if (progress.stars >= 9) {
            styleAndUrl[9] = {
                style: 'secret-link active',
                url: '/#/disclosure'
            }
        }
        return styleAndUrl[star] || styleAndUrl[0]
    }

    return (
        <div className="profile button-social social-bg mt-8 sm:mt-4">
            <h1 className="header-title text-gray-900">
                {isLoggedIn ? `Welcome` : `Sign in`}
            </h1>
            {!isLoggedIn && (
                <div className="social-signin card p-5 my-8 border-solid border-500 ">
                    <h4 className="text-center">Sign in with</h4>
                    <div className="template py-5">
                        <GoogleLogin
                            onSuccess={loginSuccessHandler}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                    <p className="text-lg"> <b>Note:</b> this is not necessary, 
                        the benefit to do this is you could get a <b>`cheatsheet`</b> bonus 
                        after you sucessfully completed one season projects(at least 9), 
                        also I could know whom this project have brought achievement to!
                    </p>
                </div>
            )}
            {/* download or secret pages table ... */}
            {isLoggedIn && (
                <div className="rewards-table card p-5 my-8 border-solid border-500 ">
                    <div className="text-center surface-ground py-3">
                        <img src={picture} className="border-circle" alt="avatar" />
                        <h3 className="my-1">{given_name}</h3>
                    </div>
                    <div className="row pb-3">
                        <h4 className="mt-3 border-left-3 pl-3 border-primary">Your learning progress:</h4>
                        <ProgressBar value={progress.finished}></ProgressBar>
                    </div>
                    <div className="row pb-1 relative">
                        <h4 className="mt-3 border-left-3 pl-3 border-primary">
                            Your got: 
                            <span className="text-4xl ml-3 text-pink-500">
                                {progress.stars}
                            </span>
                            <i className="pi pi-star ml-2 text-pink-500" style={{'fontSize': '3em'}}></i>
                        </h4>
                    </div>
                    <div className="row">
                        <h4 className="mt-3 mb-1 border-left-3 pl-3 border-primary">Your rewards:</h4>
                        <ul className="text-xl downloads text-primary">
                            <li>
                                <a 
                                    className={checkLinkState(1).style} 
                                    href={checkLinkState(1).url}>
                                    Python cheatsheet page
                                </a>- 
                                <span className="required">1 star required</span>
                            </li>
                            <li>
                                <a 
                                    className={checkLinkState(3).style} 
                                    href={checkLinkState(3).url}>
                                    Phaserjs dev cheatsheet
                                </a>-
                                <span className="required">3 stars required</span>
                            </li>
                            <li>
                                <a 
                                    className={checkLinkState(9).style} 
                                    href={checkLinkState(9).url}>
                                    Game dev Discloser page
                                </a>-
                                <span className="required">9 stars required</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage