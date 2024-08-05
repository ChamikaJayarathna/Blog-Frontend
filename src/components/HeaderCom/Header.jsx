import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { signoutSuccess } from '../../redux/user/userSlice';
import './header.css';

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
        <header className={`header-comp-header ${isMenuOpen ? 'open' : ''}`}>
            <div className="left-side">
                <Link to="/" className="logo">Logo</Link>
                <ul className={`navigation ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link>Contact Us</Link></li>
                </ul>
            </div>

            <div className="right-side">
                <div className="search-wrapper">
                    <div className={`search ${isSearchActive ? 'active' : ''}`} onClick={handleSearchInput}>
                        <span className="icon">
                            <IoSearch className="search-btn" />
                            <RxCross1 className="close-btn" />
                        </span>
                    </div>
                    <div className={`search-box ${isSearchActive ? 'active' : ''}`}>
                        <input type="text" placeholder="Search here..." />
                    </div>
                </div>

                <div className="icon">
                    <button className='sun-moon' onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaSun /> : <FaMoon />}
                    </button>

                    {currentUser ? (
                        <div className="dropdown">
                            <div className="dropdown-toggle" id="dropdown-custom-components">
                                <img src={currentUser.profilePicture} alt="user" className="avatar" />
                            </div>
                            <div className="dropdown-menu">
                                <div className="dropdown-header">
                                    <span className="username">@{currentUser.username}</span>
                                    <span className="email">{currentUser.email}</span>
                                </div>
                                <Link to='/dashboard?tab=profile' className="dropdown-item">Profile</Link>
                                <button className="dropdown-item" onClick={handleSignout}>Sign Out</button>
                            </div>
                        </div>
                    ) : (
                        <Link to='/sign-in' className='sign-in-link'>
                            <button className='sign-in'>Sign In</button>
                        </Link>
                    )}
                </div>
                <IoMdMenu className='menu-toggle' onClick={handleMenuToggle} />
            </div>
        </header>
    );
};

export default Header;
