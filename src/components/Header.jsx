import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'react-bootstrap'
import styled from 'styled-components';
import { FaSearch, FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const HeaderContainer = styled.header`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const NavBar = styled.nav`
    background-color: ${({ theme }) => theme === 'dark' ? '#0F172A' : '#E4ECFA'};
    color: #4D61D1;
    height: 90px;
    box-shadow: 0px 2px 9px -5px rgba(0,0,0,0.75);
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 30px;

    .logo{
        font-size: x-large;
        font-weight: bold;
    }

    ul{
        list-style-type: none;
    }

    .nav{
        display: flex;
        align-items: center;

        @media (max-width: 640px) {
            display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
            position: absolute;
            top: 90px;
            left: 0;
            width: 100%;
            background-color: ${({ theme }) => theme === 'dark' ? '#0F172A' : '#E4ECFA'};
            box-shadow: 0px 2px 9px -5px rgba(0,0,0,0.75);
        }
    }

    .nav li{
        margin-left: 10px;

        @media (max-width: 640px) {
            padding: 10px 0;
            text-align: center;
            margin-left: 0;
        }
    }

    .search-box{
        display: flex;
        align-items: center;

        /* @media (max-width: 640px) {
            display: none;
        } */
    }

    .hamburger{
        display: none;
        font-size: 25px;
        cursor: pointer;
        color: ${({ theme }) => theme === 'dark' ? '#FFFFFF' : '#8A8694'};

        @media (max-width: 640px) {
            display: block;
        }
    }

    button{
        padding: 8px;
        border: none;
        background: none;
    }
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme === 'dark' ? '#FFFFFF' : '#8A8694'};
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;

    &:hover{
        color: #4D61D1;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;

    .search{
        width: 100%;
        padding: 9px 40px;
        border: none;
        border-radius: 5px;
    }

    button{
        position: absolute;
        color: #8A8694;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
    }
`;

const Icon = styled.div`
    .icon-container{
        display: flex;
        align-items: center;
    }

    .sun-moon{
        color: ${({ theme }) => theme === 'dark' ? '#FFFFFF' : '#8A8694'};
        font-size: 25px;
        margin-right: 10px;
    }

    .signIn{
        font-size: 14px;
        color: #ffffff;
        background: none;
        border: 2px solid transparent;
        padding: 5px 10px;
        border-radius: 10px;
        position: relative;
        z-index: 1;
        background: linear-gradient(to right, #ff6b6b, #f06595, #00b4d8, #0077b6);
    }

    .signIn::before{
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px; 
        border-radius: 10px;
        background: linear-gradient(to left, #ff6b6b, #f06595, #00b4d8, #0077b6);
        z-index: -1;
    }
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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <HeaderContainer>
            <NavBar theme={theme}>
                <Container className="container" isOpen={isOpen} theme={theme}>
                    <div className="logo">Chamika</div>

                    <form action="">
                        <div className="search-box">
                            <InputWrapper className="input-wrapper">
                                <input type="text" name="search" id="search" className='search' placeholder='Search...' />
                                <button><FaSearch/></button>
                            </InputWrapper>
                        </div>
                    </form>

                    <div className="nav">
                        <li><StyledLink to='/' theme={theme}>Home</StyledLink></li>
                        <li><StyledLink to='/about' theme={theme}>About</StyledLink></li>
                        <li><StyledLink to='/projects' theme={theme}>Projects</StyledLink></li>
                    </div>

                    <Icon className="icon" theme={theme}>
                        <div className="icon-container">
                            <button className='sun-moon' onClick={() => dispatch(toggleTheme()) }>
                                { theme === 'light' ? <FaMoon/> : <FaSun/> }
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
                                    <button className='signIn'>Sign In</button>
                                </Link>
                            )}
                        </div>
                    </Icon>

                    <button theme={theme} className="hamburger" onClick={toggleMenu}>
                        <FaBars />
                    </button>
                </Container>
            </NavBar>
        </HeaderContainer>
    )
}

export default Header;
