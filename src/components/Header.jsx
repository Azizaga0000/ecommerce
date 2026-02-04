import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext, useState, useEffect } from 'react';
import AuthContext from './AuthContext';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Header() {
    const { user, getUserAccount, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        getUserAccount();
        //eslint-disable-next-line
    }, [])

    const handleLogout = async () => {
        await logoutUser();
    };

    function renderProfileMenu() {
        if (user) {
            return (
                <div className="profileMenu mx-3 d-flex align-items-center gap-2">
                    <Link to="/cart">
                        <i className="bi bi-cart3 fs-3 mx-3"></i>
                    </Link>
                    <Link to="/profile">
                        <i className="bi bi-person-circle fs-2"></i>
                    </Link>
                    <span className="username">{user.name}</span>
                    <button className="logoutBtn btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            );
        }else {
            return (
                <div className="profileMenu mx-3 d-flex align-items-center gap-2">
                    <Link className='bg-danger text-light p-2 rounded' to='/login'>Login</Link>
                </div>
            );
        }
    }
    return (
        <>
            <header className="header">
                <div className="text-light bg-danger">
                    <p className="text-center p-3">
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                        <Link className='fw-bold mx-2 text-light' to="/shop">Shop now!</Link>
                    </p>
                </div>
                <Navbar expand="lg" className="container">
                    <Container fluid>
                        <Navbar.Brand>
                            <Link to={"/"}>Ecommerce</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0 d-flex align-items-center gap-2"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Link to={"/"}>Home</Link>
                                <Link to={"/contact"}>Contact</Link>
                                <Link to={"/about"}>About</Link>
                                {!user && <Link to={"/register"}>Register</Link>}
                                <Link to={"/cart"} className='btn btn-white'>Cart</Link>
                            
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button type='submit' variant="outline-light text-dark">Search</Button>
                            </Form>
                            {renderProfileMenu()}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}