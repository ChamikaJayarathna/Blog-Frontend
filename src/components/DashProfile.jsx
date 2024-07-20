import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Imgdiv = styled.div`
  width: 8rem; 
  height: 8rem;
  align-self: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center; 
  flex-direction: column;
`;

const DashProfile = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h1>profile</h1>
      <Form className=''>
        <Imgdiv className=''>
          <img src={currentUser.profilePicture} alt="user" className='rounded-circle w-100 h-100 border border-5 object-fit-cover'/>
        </Imgdiv>
        
      </Form>
    </div>
  )
}

export default DashProfile;