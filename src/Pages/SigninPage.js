import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../Static/css/SignIn.css';
import { Link } from 'react-router-dom'; 
export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', { username:email, password:password });
      console.log(response.data)
      setResponseData(response.data);
      setShowError(false);
    } catch (error) {
        
      setShowError(true);
    }
  };

  return (
    <div className="container">
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={10}>
            <div className="login-form">
              <h2>Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Button className="mt-4" variant="primary" type="submit">
                  Submit
                </Button>
                <Link to="/signup" className="btn btn-primary mt-4 mx-2">
                  Sign Up
                </Link>
                
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showError} onHide={() => setShowError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>There was an error processing your request. Please try again later or check if backend server is running.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowError(false)}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>

      {responseData && (
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h3>Response Data</h3>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
