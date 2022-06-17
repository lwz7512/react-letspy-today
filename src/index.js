import reportWebVitals from './reportWebVitals';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App';

ReactDOM.render(
    <HashRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <App/>
        </GoogleOAuthProvider>
    </HashRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
