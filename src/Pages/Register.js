import React, { useState} from "react";
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Static/css/SignIn.css';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        username:email,
        email:email,
        name:name,
        password:password
      });
      setRegistrationMessage('User registered successfully.');
      setShowPopup(true);
    } catch (error) {
        if (error.response) {
            setRegistrationMessage(`Registration failed: ${error.response.data.detail}`);
          } else if (error.request) {
            setRegistrationMessage('Registration failed: Please run the backend service.');
          } else {
            setRegistrationMessage('Registration failed: Unknown error.');
          }
          setShowPopup(true);
    }
  };

  return (
    <div className="container">
      <Container className="register-container">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={10}>
            <div className="register-form">
              <h2>Register</h2>
              <Form>
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

                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="name" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
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

               

                <Button className="mt-4" variant="primary" type="button" onClick={handleRegister}>
                  Register
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Popup for registration message */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header>
          <Modal.Title>Registration Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{registrationMessage}</Modal.Body>
        <Modal.Footer>
        {registrationMessage.length>0 && (
              <Button variant="secondary" onClick={() => setShowPopup(false)}>
                Close
              </Button>
            )}
            
          
          {registrationMessage === 'User registered successfully.' && (
            <Link to="/">
              <Button variant="primary">
                Sign In
              </Button>
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
