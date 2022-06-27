import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound-background">
    <h1 className="p-5 mt-8 sm:mt-3">404 - Oops! this is a dead end...</h1>
    <Link to="/" className="p-5">Go Home</Link>
  </div>
);

export default NotFound;