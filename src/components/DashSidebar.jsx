import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import styled from 'styled-components';

const SidebarItem = styled.li`
  :hover{
    background-color: red;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
    <div className='container-fluid m-0 p-0'>
      <div className="row">
        '<div className="bg-dark col-auto col-md-20 min-vh-100 d-flex justify-content-between flex-column">
          <div className="">
            <ul className='nav nav-pills flex-column mt-3 mt-sm-0'>

              <StyledLink to='/dashboard?tab=profile'>
                <SidebarItem className="nav-item text-white fs-4 my-1 py-2 py-sm-0 mt-3">
                    <a href="#" className='nav-link text-white fs-5' aria-current="page">
                      <HiUser/>
                      <span className='ms-3 d-none d-sm-inline'>Profile</span>
                    </a>
                  </SidebarItem>
              </StyledLink>
              

              <SidebarItem className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <a href="#" className='nav-link text-white fs-5' aria-current="page">
                  <HiArrowSmRight/>
                  <span className='ms-3 d-none d-sm-inline'>Sign Out</span>
                </a>
              </SidebarItem>

            </ul>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default DashSidebar;