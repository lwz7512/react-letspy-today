import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import DonationPage from './pages/DonationPage';
import ProfilePage from './pages/ProfilePage';

import { AppTopbar } from './structure/AppTopbar';
import { AppFooter } from './structure/AppFooter';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './assets/style/App.scss';

import { getProjects } from './service/ProjectService'
import projectStore from './state/ProjectState'


function App() {

  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const setProjects = projectStore(state => state.setProjects)

  const onMobileTopbarMenuClick = (event) => {
    setMobileTopbarMenuActive(!mobileTopbarMenuActive);
    event.preventDefault();
    event.stopPropagation();
  }

  const onWrapperClick = () => {
    setMobileTopbarMenuActive(false)
  }

  useEffect(() => {
    setTimeout(() => {
      getProjects().then(data => {
        setProjects(data)
      })
    }, 500) // lazy loading...
  }, [setProjects])

  return (
    <div className="app layout-wrapper layout-theme-light" onClick={onWrapperClick}>
      <AppTopbar 
        layoutColorMode="light" 
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick} 
        />
      <div className="layout-main-container">
        <div className="layout-main">
            <Route path="/project/:pid" component={ProjectPage}/>
            <Route path="/donation" component={DonationPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/" exact component={HomePage}/>
        </div>
        <AppFooter layoutColorMode="light"/>
      </div>
    </div>
  );
}

export default App;
