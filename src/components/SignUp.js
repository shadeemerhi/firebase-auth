import React, { useRef, useState } from 'react'
import { Fragment } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../components/contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      setLoading(false);
      return setError('Passwords do not match');
    }


    signup(emailRef.current.value, passwordRef.current.value)
    .then((response) => {
      console.log(response.user);
      return axios.post('/api/users', {
        user: response.user
      }).then(() => {
        setLoading(false);
        history.push('/');
      })
    .catch(() => {
      setLoading(false);
      setError('Failed to create and account');
    })});


    // try {
    //   setError('');
    //   setLoading(true);
    //   await signup(emailRef.current.value, passwordRef.current.value);
    //   setLoading(false);
    //   history.push('/');
    // } catch {
    //   setError('Failed to create an account');
    //   setLoading(false);
    // }
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef}></Form.Control>
            </Form.Group>
            <div className="text-center mt-3">
              {!loading && <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>}
              {loading && <Spinner animation="border" variant="primary"/>}
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </Fragment>
  )
}
