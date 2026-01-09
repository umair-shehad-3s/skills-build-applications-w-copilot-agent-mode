import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  console.log('App loaded. Codespace name:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofit-logo.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
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
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏆 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏅 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container py-5">
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                      <div className="logo-container justify-content-center mb-4">
                        <img src="/octofit-logo.png" alt="OctoFit Logo" className="logo-image" />
                      </div>
                      <div className="card border-0 shadow-lg">
                        <div className="card-body p-5">
                          <h1 className="display-4 mb-4">Welcome to OctoFit Tracker</h1>
                          <p className="lead mb-4">
                            A comprehensive fitness tracking application for teams and individuals. 
                            Work together, compete fairly, and achieve your fitness goals.
                          </p>
                          <hr className="my-4" />
                          <div className="row g-3">
                            <div className="col-md-6">
                              <h5 className="mb-3">📊 Key Features</h5>
                              <ul className="list-unstyled">
                                <li className="mb-2">✅ User Authentication & Profiles</li>
                                <li className="mb-2">✅ Activity Logging & Tracking</li>
                                <li className="mb-2">✅ Team Management</li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h5 className="mb-3">🎯 More Features</h5>
                              <ul className="list-unstyled">
                                <li className="mb-2">✅ Competitive Leaderboard</li>
                                <li className="mb-2">✅ Personalized Workouts</li>
                                <li className="mb-2">✅ Progress Analytics</li>
                              </ul>
                            </div>
                          </div>
                          <hr className="my-4" />
                          <p className="text-muted">
                            Use the navigation menu above to explore users, teams, activities, workouts, and the leaderboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white py-4 border-top border-secondary mt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <h6 className="mb-2">🐙 OctoFit Tracker</h6>
                <p className="text-muted mb-0">Your complete fitness management solution</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="text-muted mb-0">&copy; 2026 OctoFit Tracker. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
