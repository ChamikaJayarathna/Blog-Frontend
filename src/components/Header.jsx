import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { FaMoon } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

const Logo = styled.span`
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);  
    border-radius: 8px;
`;

const StyledNavbar = styled(Navbar)`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CenteredNav = styled(Nav)`
    margin: 0 auto;
`;

const Header = () => {
    const location = useLocation();

    return (
        <StyledNavbar className="p-2" bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="align-self-center text-nowrap fs-6 fw-semibold">
                        <Logo className="px-2 py-1 rounded-lg text-white">Sahand's</Logo>
                        Blog
                    </Link>
                </Navbar.Brand>

                <Form className="d-flex ms-auto me-3">
                    <Form.Group className="mb-0">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                            <Button className="outline-secondary"><AiOutlineSearch /></Button>
                        </InputGroup>
                    </Form.Group>
                </Form>

                <CenteredNav className="me-auto">
                    <Nav.Link as="div" active={location === "/"}>
                        <Link to='/' className="nav-link">Home</Link>
                    </Nav.Link>
                    <Nav.Link as="div" active={location === "/about"}>
                        <Link to='/about' className="nav-link">About</Link>
                    </Nav.Link>
                    <Nav.Link as="div" active={location === "/projects"}>
                        <Link to='/projects' className="nav-link">Projects</Link>
                    </Nav.Link>
                </CenteredNav>

                <Button variant="outline-info" className="ms-3"><FaMoon /></Button>

                <Link to='/sign-in' className="ms-3">
                    <Button className='btn btn-outline-primary'>Sign In</Button>
                </Link>

            </Container>
        </StyledNavbar>
    );
}

export default Header;
