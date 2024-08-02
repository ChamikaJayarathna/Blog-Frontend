import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { Dropdown, Image } from 'react-bootstrap';

const HeaderStyle = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;

    &.open .navigation {
        top: 80px;
        opacity: 1;
        visibility: visible;
        left: 0;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        width: 100%;
        height: calc(100vh - 80px);
        padding: 40px;
        border-top: 1px solid rgba(0, 0, 0, 0.5);
    }
`;

const LeftSide = styled.div`
    display: flex;
    align-items: center;

    ul {
        display: flex;
        gap: 20px;
        margin: 0;
        padding: 0;
    }

    ul li {
        list-style: none;
    }

    ul li a {
        position: relative;
        text-decoration: none;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #333333;
    }

    @media (max-width: 576px){
        .navigation{
            position: absolute;
            opacity: 0;
            visibility: hidden;
            left: 100%;

            &.open {
                top: 80px;
                opacity: 1;
                visibility: visible;
                left: 0;
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
                width: 100%;
                height: calc(100vh - 80px);
                padding: 40px;
                border-top: 1px solid rgba(0, 0, 0, 0.5);
            }
        }
    }
`;

const Logo = styled(Link)`
    color: #333333;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-right: 40px;
`;

const RightSide = styled.div`
    display: flex;
    align-items: center;

    .menuToggle {
        display: none;
    }

    @media (max-width: 576px){
        .menuToggle {
            display: block;
            font-size: 3rem;
            cursor: pointer;
            color: #333333;
        }
    }
`;

const SearchWarpper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 576px){
        .searchBtn{
            left: 0;
        }
    }
`;

const Search = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: #333333;
    }

    .searchBtn {
        display: ${props => (props.active ? 'none' : 'block')};
    }

    .closeBtn {
        display: ${props => (props.active ? 'block' : 'none')};
        font-size: 2rem;
        color: #333333;
        transition: opacity 0.5s, transform 0.5s;
        opacity: ${props => (props.active ? '1' : '0')};
        transform: ${props => (props.active ? 'scale(1)' : 'scale(0)')};
        cursor: pointer;
    }
`;


const SearchBox = styled.div`
    position: absolute;
    right: ${props => (props.active ? '17%' : '-100%')};
    width: 58%; 
    height: 50px;
    display: flex;
    background-color: #F1F1F1;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    transition: right 0.6s ease-in-out;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: -100;

    input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        color: #333333;
        padding: 0 25px;
        background-color: #F1F1F1;
        border-radius: 30px; 
        transition: background-color 0.3s, border 0.3s;

        &:focus {
            background-color: #e0e0e0;
            border: 2px solid #92C1FF;
        }
    }
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-right: 40px;

    .sun-moon{
        border: none;
        background: none;
        font-size: 2rem;
        color: #767676;
        margin-left: 15px;
    }

    .signIn{
        background: none;
        padding: 10px 20px;
        border-radius: 20px;
        border: 1.5px solid #333333;

        &:hover{
            background-color: #333333;
            color: #ffffff;
        }
    }
`;

const Avatar = styled(Image)`
  border-radius: 50%;
  width: 40px;
  height: 40px;

  &:hover{
    
  }
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
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser); 

    const handleSearchInput = () => {
        setIsSearchActive(!isSearchActive);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsSearchActive(false);
    };

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <HeaderStyle>
            <LeftSide>
                <Logo to="/">Logo</Logo>
                <ul className={`navigation ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/police">Police</Link></li>
                </ul>
            </LeftSide>

            <RightSide>
                <SearchWarpper className="searchWarpper">
                    <Search onClick={handleSearchInput}>
                        <span className="icon">
                            <IoSearch className="searchBtn" />
                            <RxCross1 className="closeBtn"/>
                        </span>
                    </Search>

                    <SearchBox active={isSearchActive}>
                        <input type="text" placeholder="Search here..."/>
                    </SearchBox>
                </SearchWarpper>

                

                <Icon>
                    <button className='sun-moon' onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaSun /> : <FaMoon />}
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
                                <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link to='/sign-in' className='signInLink'>
                            <button className='signIn'>Sign In</button>
                        </Link>
                    )}
                </Icon>
                <IoMdMenu className='menuToggle' onClick={handleMenuToggle} />
            </RightSide>
        </HeaderStyle>
    );
};

export default Header;
