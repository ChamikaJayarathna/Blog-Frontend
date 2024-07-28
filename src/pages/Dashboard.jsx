import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';

const Dashboard = () => {

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
    <div className=''>
      <div className="d-flex">
        {/* side bar */}
        <DashSidebar/>

        {/* profile  */}
        {tab === 'profile' && <DashProfile/>}

        {/* post  */}
        {tab === 'post' && <DashPosts/>}

        {/* users */}
        {tab === 'users' && <DashUsers/>}

        {/* comments */}
        {tab === 'comments' && <DashComments/>}

      </div>
    </div>
  )
}

export default Dashboard;