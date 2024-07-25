import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

const Container = styled.div`
  height: 100vh;
  background-color: ${(props) => (props.darkMode ? '#18191a' : '#E4E9F7')};
  transition: all 0.5s ease;
`;

const SidebarContainer = styled.nav`
  position: relative;
  left: 0;
  height: 100%;
  width: ${(props) => (props.close ? '88px' : '250px')};
  padding: 10px 14px;
  background-color: ${(props) => (props.darkMode ? '#242526' : '#FFFFFF')};
  transition: all 0.5s ease;
  z-index: 100;
`;

const ToggleButton = styled(IoIosArrowForward)`
  position: absolute;
  top: 3%;
  right: -13px;
  transform: translateY(-50%) rotate(${(props) => (props.close ? '0' : '180deg')});
  height: 25px;
  width: 25px;
  background-color: ${(props) => (props.darkMode ? '#3A3B3C' : '#695CFE')};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${(props) => (props.darkMode ? '#CCCCCC' : '#FFFFFF')};
  font-size: 22px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const MenuBar = styled.div`
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 35px;
`;

const MenuLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled.li`
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: all 0.4s ease;

  &:hover{
    background-color: ${(props) => (props.darkMode ? '#3A3B3C' : '#695CFE')};
  }

  &:hover .icon,
  &:hover .text{
    color: ${(props) => (props.darkMode ? '#CCCCCC' : '#FFFFFF')};
  }
`;

const Link = styled(RouterLink)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => (props.darkMode ? '#CCCCCC' : '#707070')};
  transition: all 0.2s ease;

  .icon{
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .text{
    white-space: nowrap;
    opacity: ${(props) => (props.close ? '0' : '1')};
    transition: all 0.4s ease;
  }
`;

const DashSidebar = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(true); 
  const isDarkMode = useSelector((state) => state.theme.theme === 'dark');
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarClosed(prevState => !prevState); 
  };

  const handleSignout = async () =>{
    try {
        const res = await fetch ('/api/user/signout', {
        method: 'POST',
        });
        const data = await res.json();

        if(!res.ok){
        console.log(data.message);
        }else{
        dispatch(signoutSuccess());
        }

    } catch (error) {
        console.log(error.message);
    }
};

  return (
    <div>
      <Container darkMode={isDarkMode}>
        <SidebarContainer close={isSidebarClosed} darkMode={isDarkMode}>
          <ToggleButton close={isSidebarClosed} darkMode={isDarkMode} onClick={toggleSidebar} />
          <MenuBar>
            <MenuLinks>

              <NavLink darkMode={isDarkMode}>
                <Link to='/dashboard?tab=profile' darkMode={isDarkMode} close={isSidebarClosed}>
                  <HiUser className='icon'/>
                  <span className="text nav-text">Profile</span>
                </Link>
              </NavLink>

              <NavLink darkMode={isDarkMode}>
                <Link darkMode={isDarkMode} close={isSidebarClosed}>
                  <HiArrowSmRight className='icon'/>
                  <span onClick={handleSignout} className="text nav-text">Sign Out</span>
                </Link>
              </NavLink>

            </MenuLinks>
          </MenuBar>
        </SidebarContainer>
      </Container>
    </div>
  );
}

export default DashSidebar;
