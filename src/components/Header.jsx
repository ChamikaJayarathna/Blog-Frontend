import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap'
import styled from 'styled-components';
import { FaSearch, FaMoon } from 'react-icons/fa';


const StyledNavbar = styled(Navbar)`
  border-bottom: 2px solid #dee2e6;
  height: 75px;
`;

const Logo = styled(Link)`

    text-decoration: none;
    color: black;
    margin-left: 4rem;
    font-size: 1rem;
`;

const LogoName = styled.span`
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);  
    border-radius: 9px;
    padding: .5rem 1rem;
    color: white;
`;

const Header = () => {
  return (
    <StyledNavbar>
        <Logo to='/' className='align-self-center text-nowrap fw-bolder'>
            <LogoName>Sahand's</LogoName>Blog
        </Logo>

        <form className='d-none d-lg-inline'>
            <input type="text" placeholder="search course..." />
            <button><FaSearch/></button>
        </form>

        <button className='d-lg-none rounded'><FaSearch/></button>

        <div className='d-flex gap-3 flex-md-row-reverse'>

            <div className="">
                <button className='d-none d-sm-inline'><FaMoon/></button>

                <Link to='/sign-in'>
                    <button>Sign In</button>
                </Link>
            </div>
            
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/' className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to='/about' className="nav-link">About</Link>
                </li>   
                <li className="nav-item">
                    <Link to='/projects' className="nav-link">Projects</Link>
                </li>   
            </ul>

        </div>

    </StyledNavbar>
  )
}

export default Header;