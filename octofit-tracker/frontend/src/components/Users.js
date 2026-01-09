import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching users from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Users API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const userList = data.results || data || [];
        console.log('Processed users data:', userList);
        
        setUsers(Array.isArray(userList) ? userList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading users...</p>
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
      <h2 className="mb-4">👥 Users Directory</h2>
      
      {users.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body">
            <h4>No Users Found</h4>
            <p>There are currently no users in the system.</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {users.map((user) => (
            <div key={user.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{user.name}</h5>
                </div>
                <div className="card-body">
                  <dl className="row mb-0">
                    <dt className="col-sm-4 text-muted">Email:</dt>
                    <dd className="col-sm-8">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </dd>
                    
                    <dt className="col-sm-4 text-muted">Team ID:</dt>
                    <dd className="col-sm-8">{user.team}</dd>
                    
                    <dt className="col-sm-4 text-muted">Leader:</dt>
                    <dd className="col-sm-8">
                      {user.is_leader ? (
                        <span className="badge bg-success">Team Lead</span>
                      ) : (
                        <span className="badge bg-secondary">Member</span>
                      )}
                    </dd>
                  </dl>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-primary">View Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
