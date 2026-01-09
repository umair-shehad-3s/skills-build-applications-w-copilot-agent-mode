import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamList = data.results || data || [];
        console.log('Processed teams data:', teamList);
        
        setTeams(Array.isArray(teamList) ? teamList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading teams...</p>
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
      <h2 className="mb-4">🏆 Teams</h2>
      
      {teams.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body">
            <h4>No Teams Found</h4>
            <p>There are currently no teams in the system.</p>
            <button className="btn btn-primary">Create Team</button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">Active Team</span>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <div className="btn-group w-100" role="group">
                    <button className="btn btn-sm btn-outline-primary">View</button>
                    <button className="btn btn-sm btn-outline-secondary">Members</button>
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

export default Teams;
