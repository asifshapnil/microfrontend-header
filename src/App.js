import React, { useState, useEffect } from 'react'; // Must be imported for webpack to work
import { FaUserCircle } from 'react-icons/fa';
import './App.css';
// import Display from 'HomeApp/Display';
import { useStore } from 'HomeApp/store';

function App() {
  const {dispatch, state} = useStore();
  const Display = React.lazy(() => import('HomeApp/Display'));

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.username && credentials.password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: credentials.username,
          password: credentials.password,
        },
      });
    }
  };

  if (!useStore) {
    return <div>Loading store...</div>; // Or some other loading indicator
  }

  // if (!dispatch) {
  //   return <div>Loading store...</div>; // Or some other loading indicator
  // }

  return (
    <div className="auth">

      {/* Login Form */}
      <div className="container">
        <div className="card mx-auto mt-5" style={{ maxWidth: '400px' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Login</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
