import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default function Register() {
    const [validated, setValidated] = useState(false);
    const [formdata, setFormdata] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormdata({ ...formdata, [name]: value });
        setError('');
    }

    const validateForm = () => {
        if (formdata.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (formdata.password !== formdata.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        console.log('handleSubmit called');
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        const { confirmPassword, ...dataToSend } = formdata;
        axios.post(`${baseURL}/auth/register`, dataToSend)
            .then(response => {
                console.log('Registration successful:', response.data);
                alert(`Registration successful! ${response.data.message}`);
                setFormdata({
                    name: '',
                    surname: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                });
                navigate('/login');
                console.log('Navigating to login page');
            })

            .catch(error => {
                console.error('Registration error:', error);
                if (error.message) {
                    setError(error.message);
                } else if (error.request) {
                    setError('Network error. Please try again later.');
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            });
        setValidated(true);
    }

    return (
        <div>
            <Form className='col-4 m-auto my-5' noValidate validated={validated} onSubmit={handleSubmit}>
                <h1 className="text-center">Create an account</h1>
                <Row className='mb-3 g-4'>
                    <Form.Group as={Col} md="12" controlId="validationName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationSurname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="surname"
                            value={formdata.surname}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-4'>
                    <Form.Group as={Col} md="12" controlId="validationEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-4'>
                    <Form.Group as={Col} md="12" controlId="validationUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formdata.username}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-4'>
                    <Form.Group as={Col} md="12" controlId="validationPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formdata.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-4'>
                    <Form.Group as={Col} md="12" controlId="validationConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formdata.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please confirm your password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button type="submit" className="btn btn-danger w-100">Register</Button>

                <p className="text-center my-2">
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-danger mx-3">Login here</Link>
                </p>
            </Form>
        </div>
    );
}
