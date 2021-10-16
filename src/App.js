import { Route } from 'react-router-dom';


import EmptyPage from './pages/EmptyPage';
import HomePage from './pages/HomePage';

// import PrimeReact from 'primereact/api';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './assets/style/App.scss';


function App() {
  return (
    <div className="app layout-wrapper layout-theme-light">
      <AppTopbar layoutColorMode="light" />
      <div className="layout-main-container">
        <div className="layout-main">
            <Route path="/" exact component={HomePage}/>
            <Route path="/empty" component={EmptyPage}/>
        </div>
        <AppFooter layoutColorMode="light"/>
      </div>
    </div>
  );
}

export default App;
