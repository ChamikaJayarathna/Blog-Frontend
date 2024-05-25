import React from 'react'
import { Link } from 'react-router-dom';
import { Dropdown, Navbar, Image } from 'react-bootstrap'
import styled from 'styled-components';
import { FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


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

const Blog = styled.span`
  color: ${({ theme }) => theme === 'dark' ? '#FFFFFF' : 'black'};
`;

const Avatar = styled(Image)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const DropdownHeader = styled.div`
  padding: 10px;

  .username {
    display: block;
    font-size: 0.875rem;
  }

  .email {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const List = styled(Link)`
    color: ${({ theme }) => theme === 'dark' ? '#FFFFFF' : 'black'};
`;

const Header = () => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);

  return (
    <StyledNavbar>
        <Logo to='/' className='align-self-center text-nowrap fw-bolder'>
            <LogoName>Sahand's</LogoName>
            <Blog theme={theme}>Blog</Blog>
        </Logo>

        <form className='d-none d-lg-inline'>
            <input type="text" placeholder="search..." />
            <button><FaSearch/></button>
        </form>

        <button className='d-lg-none rounded'><FaSearch/></button>

        <div className='d-flex gap-3 flex-md-row-reverse'>

            <div className="">
                <button className='d-none d-sm-inline' onClick={() => dispatch(toggleTheme())}>
                    { theme === 'light' ? <FaSun/> : <FaMoon/> }
                </button>

                {currentUser ? (
                    <Dropdown>
                        <Dropdown.Toggle as="div" id="dropdown-custom-components">
                            <Avatar src={currentUser.profilePicture} alt="user" />
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu>

                            <DropdownHeader>
                                <span className="username">@{currentUser.username}</span>
                                <span className="email">{currentUser.email}</span>
                            </DropdownHeader>

                            <Dropdown.Item as={Link} to='/dashboard?tab=profile'>Profile</Dropdown.Item>
                            <Dropdown.Item>Sign Out</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                ):
                (
                    <Link to='/sign-in'>
                        <button>Sign In</button>
                    </Link>
                )}

            </div>
            
            <ul className="navbar-nav">
                <li className="nav-item">
                    <List to='/' className="nav-link" theme={theme}>Home</List>
                </li>
                <li className="nav-item">
                    <List to='/about' className="nav-link" theme={theme}>About</List>
                </li>   
                <li className="nav-item">
                    <List to='/projects' className="nav-link" theme={theme}>Projects</List>
                </li>   
            </ul>

        </div>

    </StyledNavbar>
  )
}

export default Header;