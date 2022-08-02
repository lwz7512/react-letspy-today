import React, { useState, useEffect } from 'react'

import { Route, Redirect, Switch, useLocation } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import DonationPage from './pages/DonationPage'
import ProfilePage from './pages/ProfilePage'
import ContactPage from './pages/ContactPage'
import CheatSheetPage from './pages/CheatSheetPage'
import DisclosurePage from './pages/DisclosurePage'
import ChargePage from './pages/ChargePage'
import GeneralMDPage from './pages/GeneralMDPage'
import NotFound from './pages/NotFound'

import { AppTopbar } from './structure/AppTopbar'
import { AppFooter } from './structure/AppFooter'
import Modal from './components/Modal'
// prime style
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'prismjs/themes/prism-coy.css'
// base style
// import './layout/flags/flags.css'
import './layout/layout.scss'
// app style
import './assets/style/App.scss'

import { getProjects } from './service/ProjectService'
import projectStore from './state/ProjectState'

function App() {
  const location = useLocation()
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false)
  const setProjects = projectStore((state) => state.setProjects)

  const onMobileTopbarMenuClick = (event) => {
    setMobileTopbarMenuActive(!mobileTopbarMenuActive)
    event.preventDefault()
    event.stopPropagation()
  }

  const onWrapperClick = () => {
    setMobileTopbarMenuActive(false)
  }

  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, 100) // lazy scroll top
  }, [location])

  useEffect(() => {
    setTimeout(() => {
      getProjects().then((data) => {
        setProjects(data)
      })
    }, 500) // lazy loading...
  }, [setProjects])

  return (
    <div
      className="app layout-wrapper layout-theme-light"
      onClick={onWrapperClick}
    >
      <AppTopbar
        layoutColorMode="light"
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
      />
      <div className="layout-main-container">
        <div className="layout-main">
          <Switch>
            <Route path="/project/:pid" component={ProjectPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/donation" component={DonationPage} />
            <Route path="/profile" component={ProfilePage} />
            {/* docs url */}
            <Redirect from="/terms" to="/doc/terms" />
            <Redirect from="/why" to="/doc/why" />
            <Redirect from="/privacy" to="/doc/privacy" />
            <Redirect from="/credits" to="/doc/credits" />
            <Route path="/doc/:name" component={GeneralMDPage} />
            <Route path="/cheatsheet/:name" component={CheatSheetPage} />
            <Route path="/disclosure" component={DisclosurePage} />
            <Route path="/charge/:star" component={ChargePage} />
            <Route path="/" exact component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <AppFooter layoutColorMode="light" />
      </div>
      <Modal />
    </div>
  )
}

export default App
