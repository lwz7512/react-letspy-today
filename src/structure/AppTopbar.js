import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useHistory,  } from 'react-router-dom';
import { addEffect, removeEffect } from '../utils/DomUtil';

const logoly = 'assets/layout/images/letspy_arcade_sm.png'

export const AppTopbar = (props) => {

    const history = useHistory()

    const handleRouteChange = (target, queryParams = '', data = null) => {
      history.push({
          pathname: target,
          search: `?${queryParams}`,
          state: data
      })
      window.scrollTo(0, 0)
    }

    useEffect(() => {
        return history.listen((location) => { 
            if (location.pathname.indexOf('project') > -1) {
                addEffect('.layout-topbar', '-translate-y-100')
                addEffect('.layout-main-container', 'pt-2')
            } else {
                removeEffect('.layout-topbar', '-translate-y-100')
                removeEffect('.layout-main-container', 'pt-2')
            }
        }) 
     },[history]) 


    return (
        <div className="layout-topbar transition-pt5 ">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? logoly : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                <span>LetsPY</span>
            </Link>
            {/* menu button on mobile */}
            <button 
                type="button" 
                className="p-link layout-topbar-menu-button layout-topbar-button" 
                onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>
                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button 
                            className="p-link layout-topbar-button" 
                            onClick={()=>handleRouteChange('/')}>
                            <i className="pi pi-home"/>
                            <span>Home</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            className="p-link layout-topbar-button" 
                            onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-heart"/>
                            <span>Donation</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            className="p-link layout-topbar-button" 
                            onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-user"/>
                            <span>Profile</span>
                        </button>
                    </li>
                </ul>
        </div>
    );
}
