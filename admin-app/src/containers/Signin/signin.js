import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../../components/layout';
import Input from '../../components/UI/Input/index';
import { login } from '../../actions/index';
import Spinner from '../../components/UI/spinner/spinner';

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle the user input in the form
  const userLogin = (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  };

  // CHeck if user is already authenticated then redirect to the dashboard page
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  // when user is authentication, show spinner
  if (auth.authenticating) {
    return <Spinner style = {{width: '100vw', height: '100vh'}}/>;
  }

  let signinError;
  if (auth.signinError) {
    signinError = <h5 className="text-danger">Sign in failed. Try again.</h5>;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            {signinError ? signinError : null}
            <Form onSubmit={userLogin}>
              <Input
                label="Email Address"
                type="email"
                placeholder="email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
