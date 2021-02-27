import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import Layout from '../../components/layout';
import Input from '../../components/UI/Input';
import { signup } from '../../actions/user.actions';
import Spinner from '../../components/UI/spinner/spinner';

const Signup = (props) => {
  // manage state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // selector hook for redux
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  // dispatch hook for redux
  const dispatch = useDispatch();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    dispatch(signup(user));
  };

  // Check if user is already authenticated then redirect to the dashboard page
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  if (user.loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            {user.message ? (
              <h5 className="text-success">
                Successfully added your account. Next go to <Link to = "/signin">sign in</Link> and happy
                journey.
              </h5>
            ) : null}
            <Form onSubmit={(event) => formSubmitHandler(event)}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Col>
              </Row>
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

export default Signup;
