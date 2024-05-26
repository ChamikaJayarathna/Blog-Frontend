import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';

const Sidebar = styled.div`
  width: 250px;
  background-color: pink;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SidebarItemGroup = styled(ListGroup)`
  margin: 0;
  padding: 0;
  flex-grow: 1;
`;

const SidebarItem = styled(ListGroup.Item)`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 5px;

  &.active {
    background-color: #007bff;
    color: white;
  }

  svg {
    margin-right: 10px;
  }
`;

const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
        setTab(tabFromUrl);
        }
    },[location.search]);

  return (
    <Sidebar>
        <SidebarItemGroup>

            <Link to='/dashboard?tab=profile'>
                <SidebarItem active={tab === 'profile'}> 
                    <HiUser/>
                    Profile
                </SidebarItem>
            </Link>
            

            <SidebarItem>
                <HiArrowSmRight/>
                Sign Out
            </SidebarItem>
        </SidebarItemGroup>
    </Sidebar>
  )
}

export default DashSidebar;