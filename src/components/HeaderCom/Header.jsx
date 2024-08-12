import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { ImSun } from "react-icons/im";
import { RiMoonLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { signoutSuccess } from '../../redux/user/userSlice';
import './header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    let menuRef = useRef();


    useEffect(() => {
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpen(false)
                
            }
        };
    
        document.addEventListener("mousedown", handler);
    
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });




    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
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
        <header className={`header-comp-style`}>
            <div className="header-comp-left-side">
                <Link to="/" className="header-comp-logo">Logo</Link>
                <ul className={`header-comp-navigation ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>


            {/* <div className="header-comp-search-wrapper header-comp-icon">
                <input type="text" className='header-comp-search-bar-input' placeholder="Search here..." />
                <button className='header-comp-search-bar-submit'>
                    <FiSearch className="header-comp-search-btn"/>
                </button>
            </div> */}

            <div className="header-comp-right-side">
                <div className="header-comp-icon">
                    <button className='sun-moon' onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <ImSun /> : <RiMoonLine />}
                    </button>

                    {currentUser ? (
                        <div className="header-comp-menu-container" ref={menuRef}>
                            <div className="header-comp-menu-trigger" onClick={() => setOpen(!open)}>
                                <img src={currentUser.profilePicture} alt="user" className="avatar" />
                            </div>

                            <div className={`header-comp-dropdown-menu ${open ? 'active' : 'inactive'}`}>
                                <div className="header-comp-dropdown-header">
                                    <span className="username">@{currentUser.username}</span>
                                    <span className="email">{currentUser.email}</span>
                                </div>
                                <div className="header-comp-dropdownItem">
                                    <Link to='/dashboard?tab=profile' className='header-comp-profile'><FaRegUser className='profile-icon'/> Profile</Link>
                                    <button onClick={handleSignout} className='header-comp-sign-out'><TbLogout className='sign-out-icon'/>Sign Out</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to='/sign-in' className='sign-in-link'>
                            <FaRegUser className='sign-in'/>
                        </Link>
                    )}
                </div>
                {/* <IoMenu className='menu-toggle' style={{color: '#767676', fontSize: '2.5rem'}} onClick={handleMenuToggle} /> */}
            </div>
        </header>
    );
};

export default Header;
