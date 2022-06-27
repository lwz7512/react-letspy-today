import React, { useState, useEffect } from 'react'

import { Route, Switch, useHistory } from 'react-router-dom';


import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import DonationPage from './pages/DonationPage'
import ProfilePage from './pages/ProfilePage'
import ContactPage from './pages/ContactPage'
import CheatSheetPage from './pages/CheatSheetPage'
import DisclosurePage from './pages/DisclosurePage'
import ChargePage from './pages/ChargePage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
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
  const history = useHistory()
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
    // window.scrollTo(0, 0);
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, 100) // lazy scroll top
  }, [history.location.pathname])

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
              <Route path="/privacy" component={PrivacyPage} />
              <Route path="/terms" component={TermsPage} />
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
