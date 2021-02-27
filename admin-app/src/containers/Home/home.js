import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import Layout from '../../components/layout';
import './style.css';

const Home = (props) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className = "sidebar">Side bar</Col>
          <Col md={10} style = {{marginLeft: 'auto', }}>container</Col>
        </Row>
      </Container>

      {/* <Jumbotron className = "text-center" style={{margin: '5rem', background: '#fff'}}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,</p>
      </Jumbotron> */}
    </Layout>
  );
};

export default Home;
