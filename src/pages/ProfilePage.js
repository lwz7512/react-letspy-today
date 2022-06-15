import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { isAuthenticated } from '../helper/withAuth'

const ProfilePage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useEffect(() => {
        const tokenExist = isAuthenticated()
        if (tokenExist) setIsLoggedIn(true)
    }, [])

    const loginSuccessHandler = credentialResponse => {
        localStorage.setItem('LETSPY_TOKEN', credentialResponse.credential)
        // TODO: SEND token_id to backend ...
        
    }

    return (
        <div className="profile button-social social-bg mt-8 sm:mt-4">
            <h1 className="header-title text-gray-900">My Profile</h1>
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
            {/* TODO: download or secret pages table ... */}
            {isLoggedIn && (
                <div className="rewards-table card col-12 p-5 my-8 border-solid border-500 opacity-90">
                    Rewards stuff ....
                </div>
            )}
        </div>
    );
}

export default ProfilePage