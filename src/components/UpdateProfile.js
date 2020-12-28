import React, { useRef, useState, useEffect } from 'react'
import { Fragment } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../components/contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');
    if(emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    currentUser.getIdToken().then(idToken => {
      console.log(idToken);
    })
  }, [])

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordRef}/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordConfirmRef}/>
            </Form.Group>
            <div className="text-center mt-3">
              {!loading && <Button disabled={loading} className="w-100" type="submit">Update</Button>}
              {loading && <Spinner animation="border" variant="primary"/>}
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to='/'>Cancel</Link>
      </div>
    </Fragment>
  )
}
