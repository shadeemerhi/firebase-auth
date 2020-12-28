import React, { useState } from 'react';
import { Fragment } from 'react';
import { Card, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../components/contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


export default function Dashboard() {

  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to logout')
    }
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Email:</strong> {currentUser.email}
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        <Link to="/secret-page" className="btn btn-success w-100 mt-3">Secret Page</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </Fragment>
  )
}

