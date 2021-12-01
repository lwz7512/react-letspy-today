import React from 'react';

export const AppFooter = (props) => {
    const logoly = 'assets/layout/images/letspy_arcade_sm.png'
    return (
        <div className="layout-footer">
            <img 
                src={props.layoutColorMode === 'light' ? logoly : 'assets/layout/images/logo-white.svg'} 
                alt="Logo" 
                height="20" 
                className="mr-2" 
                />
            by
            <span className="font-medium ml-2">
                🌈CodingLab
            </span>
        </div>
    );
}
