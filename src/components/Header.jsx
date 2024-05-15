import {Button as FlowbiteButton, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';


const Logo = styled.span`
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);   
`;

const Btn1 = styled(FlowbiteButton)`
    width: 3rem;
    height: 2.5rem;
`;

const Btn2 = styled(FlowbiteButton)`
    width: 3rem;
    height: 2.5rem;
`;

const Btn3 = styled(FlowbiteButton)`
    background: linear-gradient(to right, purple, blue); 
    color: white; 
    border: none;
    /* width: 3rem;
    height: 2.5rem; */
`;


const Header = () => {

    const path = useLocation.pathname;

  return (
    <Navbar className='border p-3'>
        <Link to="/" className='align-self-center text-nowrap fs-6 fw-semibold'>
            <Logo className='px-2 py-1 rounded-lg text-white'>Sahand's</Logo>
            Blog
        </Link>

        <form>
            <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='d-none d-lg-inline'
            />
        </form>

        <Btn1 className='btn btn-secondary rounded-pill d-block d-lg-none'>
            <AiOutlineSearch/>
        </Btn1>
        
        {/* order-md-2 is not work */}
        <div className="d-flex flex-row gap-2 order-md-2">
            {/* dark mood button(not work) */}
            <Btn2 className='btn btn-secondary rounded-pill d-none d-sm-inline'>
                <FaMoon/>
            </Btn2>
            <Link to='/sign-in'>
                <Btn3 className='btn btn-outline-primary'>
                    Sign In
                </Btn3>
            </Link>
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as={'div'}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={'div'}>
                <Link to='/projects'>Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>


    </Navbar>
  )
}

export default Header