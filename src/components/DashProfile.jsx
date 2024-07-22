import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const Card = styled.div`
  width: 700px;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

const Imgdiv = styled.div`
  width: 8rem; 
  height: 8rem;
`;



const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    
    <div className="mt-5 mx-auto">
      <Card className='card'>
        <h1 className='my-4 text-center fw-semibold fs-3'>Profile</h1>

        <form className='d-flex flex-column align-items-center w-100 gap-4'>
          <Imgdiv className='mb-3'>
            <img src={currentUser.profilePicture} alt="user" className='rounded-circle w-100 h-100 border border-5 object-fit-cover'/>
          </Imgdiv>

          <input type="text" id="username" placeholder="username" defaultValue={currentUser.username} className="form-control rounded" />
          
          <input type="email" id="email" placeholder="email" defaultValue={currentUser.email} className="form-control rounded" />
          
          <input type="password" id="password" placeholder="password" className="form-control rounded mb-4" />

          <button type="submit">Update</button>
        </form>

        <div className="d-flex justify-content-between text-danger mt-3">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>

      </Card>
    </div>

  )
}

export default DashProfile;