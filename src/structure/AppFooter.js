import React from 'react';

export const AppFooter = (props) => {
    const logoly = '/assets/layout/images/letspy_arcade_sm.png'
    return (
        <div className="layout-footer">
            <img 
                src={logoly} 
                alt="Logo" 
                height="20" 
                className="mr-2" 
                />
            by
            <span className="font-medium ml-2">
                🌈 Rainbow Coding Lab
            </span>
            <a href="/privacy" className="ml-5 underline">Privacy Policy</a>
        </div>
    );
}
