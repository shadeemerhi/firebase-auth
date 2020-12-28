import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';
import { Spinner } from 'react-bootstrap';

export default function SecretPage() {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    currentUser.getIdToken().then(token => {
      axios.get('/api/data', {
        params: {
          token
        }
      })
      .then(response => {
        setLoading(false);
        setMessage(response.data);
      })
    }).catch(error => {
      console.log('error');
    })
      
  },[])

  return (
    <div>
      This is a super secret page that must be protected
      {loading && <Spinner animation="border" variant="primary"/>}
      {!loading && <h5>{message}</h5>}
      <Link to="/" className="btn btn-primary w-100 mt-3">Dashboard</Link>
    </div>
  )
}
