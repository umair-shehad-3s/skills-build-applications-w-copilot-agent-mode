import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;
        console.log('Fetching leaderboard from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || data || [];
        console.log('Processed leaderboard data:', leaderboardList);
        
        // Sort by rank
        const sortedList = (Array.isArray(leaderboardList) ? leaderboardList : []).sort(
          (a, b) => (a.rank || 999) - (b.rank || 999)
        );
        
        setLeaderboard(sortedList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '▫️';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading leaderboard...</p>
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
      <h2 className="mb-4">🏅 Competitive Leaderboard</h2>
      
      {leaderboard.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body">
            <h4>No Leaderboard Data</h4>
            <p>No team rankings are currently available.</p>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '60px' }}>Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col" style={{ width: '150px' }}>Total Points</th>
                    <th scope="col" style={{ width: '100px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id || index} className={entry.rank <= 3 ? 'table-info' : ''}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="fs-5">{getMedalEmoji(entry.rank)}</span>
                          <span className="badge bg-dark" style={{ fontSize: '0.9rem' }}>
                            #{entry.rank}
                          </span>
                        </div>
                      </td>
                      <td>
                        <strong>{entry.team}</strong>
                      </td>
                      <td>
                        <span className="badge bg-success" style={{ fontSize: '1rem', padding: '0.5rem 0.75rem' }}>
                          {entry.total_points}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
