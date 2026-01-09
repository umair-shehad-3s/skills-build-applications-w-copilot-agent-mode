import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Activities API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activityList = data.results || data || [];
        console.log('Processed activities data:', activityList);
        
        setActivities(Array.isArray(activityList) ? activityList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading activities...</p>
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
      <h2 className="mb-4">🏃 Activities Log</h2>
      
      {activities.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body">
            <h4>No Activities Found</h4>
            <p>No activities have been logged yet.</p>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Calories Burned</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id || index}>
                  <td>
                    <span className="badge bg-info">{activity.user}</span>
                  </td>
                  <td>
                    <strong>{activity.type}</strong>
                  </td>
                  <td>{activity.duration}</td>
                  <td>
                    <span className="badge bg-success">{activity.calories_burned}</span>
                  </td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
