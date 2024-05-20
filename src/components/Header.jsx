import React from 'react';
import { Container, Nav, Navbar, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
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

const SignInButton = styled(Button)`
    background-image: linear-gradient(to right, purple, blue);
    color: white;
    border: 2px solid white;

    &:hover{
        background-image: linear-gradient(to right, blue, purple);
        color: white;
        border: 2px solid white;
    }
`;


const Header = () => {
    const location = useLocation();

    return (
        <StyledNavbar className="navbar navbar-expand-lg navbar-light bg-body-tertiary p-2" bg="light" expand="lg">
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
                            <Button variant="outline-secondary"><AiOutlineSearch /></Button>
                        </InputGroup>
                    </Form.Group>
                </Form>


                <Button variant="outline-info" className="ms-3"><FaMoon/></Button>

                <Link to='/sign-in' className="btn btn-custom">
                    <SignInButton className='btn btn-outline-primary'>Sign In</SignInButton>
                </Link>

                <Navbar.Toggle aria-controls="navbarButtonsExample"/>
                <Navbar.Collapse id="navbarButtonsExample">
                    <CenteredNav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link as="div" active={location.pathname === "/"}>
                            <Link to='/' className="nav-link">Home</Link>
                        </Nav.Link>
                        <Nav.Link as="div" active={location.pathname === "/about"}>
                            <Link to='/about' className="nav-link">About</Link>
                        </Nav.Link>
                        <Nav.Link as="div" active={location.pathname === "/projects"}>
                            <Link to='/projects' className="nav-link">Projects</Link>
                        </Nav.Link>
                    </CenteredNav>
                </Navbar.Collapse>
            </Container>

        </StyledNavbar>
    );
}

export default Header;
