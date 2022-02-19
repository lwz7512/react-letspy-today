import React from 'react';
import { Button } from 'primereact/button';
 

const ProfilePage = () => {

    return (
        <div className="profile button-social social-bg mt-8 sm:mt-4">
            <h1 className="header-title text-gray-900">My Profile</h1>
            <div className="card social-signin p-5 my-8 border-solid border-500 ">
                <h4 className="text-center">Sign in with</h4>
                <div className="template py-5">
                    <Button className="google p-0 mr-3">
                        <i className="pi pi-google px-2"></i>
                        <span className="pl-5 text-xl">Google</span>
                    </Button>
                    <Button className="discord p-0 ">
                        <i className="pi pi-github px-2"></i>
                        <span className="pl-5 text-xl">Github</span>
                    </Button>
                </div>
                <p className="text-lg"> <b>Note:</b> this is not necessary, 
                    the biggest benefit to signin is you could get a <b>`cheatsheet`</b> bonus 
                    after you sucessfully completed one season projects(at least 9), 
                    for me is I could know whom this project have brought achievement to!
                </p>
            </div>
            {/* <div className="col-12"></div> */}
        </div>
    );
}

export default ProfilePage