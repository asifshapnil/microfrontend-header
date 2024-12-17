import React, { useState, useEffect } from 'react'; // Must be imported for webpack to work
import { FaUserCircle } from 'react-icons/fa';
import './App.css';
import { useStore } from 'HomeApp/store';

function App() {
  const Display = React.lazy(() => import('HomeApp/Display'));
  const { state } = useStore();

  if (!useStore) {
    return <div>Loading store...</div>; // Or some other loading indicator
  }

  console.log(state.isAuthenticated);
  

  return (
    <div className="HeaderApp">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Microfrontend Header
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Display condition={state.isAuthenticated}>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                </ul>

                {/* Profile section */}
                <div className="d-flex align-items-center ms-auto">
                  <FaUserCircle size={24} className="me-2" />
                  <span className="navbar-text">Hi, {state.user}</span>
                </div>
              </div>
            </Display>
          </React.Suspense>
        </div>
      </nav>
    </div>
  );
}

export default App;