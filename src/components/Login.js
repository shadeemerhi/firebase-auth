import React, { useRef, useState } from 'react'
import { Fragment } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../components/contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // NOT SURE WHY BELOW DOESN'T WORK BUT TRY CATCH BLOCK DOES

    // login(emailRef.current.value, passwordRef.current.value)
    // .then(() => {
    //   console.log('etffff');
    //   history.push('/');
    // })
    // .catch(() => {
    //   setError('Failed to log in');
    // })
    // .finally(() => {
    //   setLoading(false);
    // })

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push('/');
    } catch {
      setError('Failed to log in');
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}></Form.Control>
            </Form.Group>
            <div className="text-center mt-3">
              {!loading && <Button disabled={loading} className="w-100" type="submit">Log In</Button>}
              {loading && <Spinner animation="border" variant="primary"/>}
            </div>
          </Form>
        </Card.Body>
      <div className="w-100 text-center mb-3">
        <Link to='/forgot-password'>Forgot Password?</Link>
      </div>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </Fragment>
  )
}
