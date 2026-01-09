import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutList = data.results || data || [];
        console.log('Processed workouts data:', workoutList);
        
        setWorkouts(Array.isArray(workoutList) ? workoutList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading workouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">💪 Workout Programs</h2>
      
      {workouts.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body">
            <h4>No Workouts Found</h4>
            <p>No workout programs are currently available.</p>
            <button className="btn btn-primary">Add Workout</button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Difficulty:</span>
                    <span className={`badge bg-${getDifficultyBadgeColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <div className="btn-group w-100" role="group">
                    <button className="btn btn-sm btn-outline-primary">Details</button>
                    <button className="btn btn-sm btn-outline-success">Start</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
