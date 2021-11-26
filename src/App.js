import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import EmptyPage from './pages/EmptyPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import GamePage from './pages/GamePage';

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

  const setProjects = projectStore(state => state.setProjects)

  useEffect(() => {
    setTimeout(() => {
      getProjects().then(data => {
        setProjects(data)
      })
    }, 500) // lazy loading...
  }, [setProjects])

  return (
    <div className="app layout-wrapper layout-theme-light">
      <AppTopbar 
        layoutColorMode="light" 
        onMobileTopbarMenuClick={()=>console.log(">>> popup menu")} 
        />
      <div className="layout-main-container">
        <div className="layout-main">
            <Route path="/project/:pid" component={ProjectPage}/>
            <Route path="/game" component={GamePage}/>
            <Route path="/empty" component={EmptyPage}/>
            <Route path="/" exact component={HomePage}/>
        </div>
        <AppFooter layoutColorMode="light"/>
      </div>
    </div>
  );
}

export default App;
