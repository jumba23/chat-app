import React from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const Home = () => {
  return (
    <Row>
    <Col
      md={6}
      className="d-flex flex-direction-column align-items-center justify-content-center"
    >
      <div>
        <h1>Get in touch with your friends</h1>
        <p>Chat App lets you connect with the world</p>
        <LinkContainer to="/chat">
          <Button variant="success">
            Lets Chat!
            <i className="fas fa-comments homes-message-icon" />
          </Button>
        </LinkContainer>
      </div>
    </Col>
    <Col md={6} className="home-bg"></Col>
  </Row>
  )
}

export default Home