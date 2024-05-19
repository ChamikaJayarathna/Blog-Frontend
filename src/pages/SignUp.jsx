import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.span`
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);   
    padding: 8px 12px;
    border-radius: 8px;
`;

const Blog = styled.span`
  color: black;
`;

const CustomLink = styled(Link)`
  font-weight: bold;
  font-size: 32px;
  text-decoration: none;
  color: #FFFFFF;
`;

const CustomDiv = styled.div`
  max-width: 768px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;

  @media (min-width: 768px){
    flex-direction: row;
    align-items: flex-start;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  margin-top: 150px;
  max-height: 100px;
`;

const RightSide = styled.div`
  flex: 1;
`;

const Ldiv = styled.div`
  margin-top: 1.5rem;
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
  border: none;
  color: white;
`;

const SignUp = () => {
  return (
    <div className='min-vh-100 mt-5 d-flex justify-content-center'>
      <CustomDiv>
        {/* left side */}
        <LeftSide>
          <CustomLink to="/">
            <Logo>Sahand's</Logo>
            <Blog>Blog</Blog>
          </CustomLink>
          <p className='fs-6 mt-3'>This is a demo project. You can sign up with your email and password or with Google.</p>
        </LeftSide>

        {/* right side */}
        <RightSide>
          <form className='d-flex flex-column'>
            <Ldiv>
              <label htmlFor='username' className='form-label'>Your username</label>
              <input
                type='text'
                className='form-control'
                placeholder='Username'
                id='username'
              />
            </Ldiv>

            <Ldiv>
              <label htmlFor='email' className='form-label'>Your email</label>
              <input
                type='email'
                className='form-control'
                placeholder='name@company.com'
                id='email'
              />
            </Ldiv>

            <Ldiv>
              <label htmlFor='password' className='form-label'>Your password</label>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                id='password'
              />
            </Ldiv>

            <SubmitButton type="submit" className='mt-4'>
              Sign Up
            </SubmitButton>
          </form>
          
          <div className="d-flex gap-1 fs-6 mt-2">
            <span>Have an account? </span>
            <Link to='/sign-in' className='text-primary'>Sign In</Link>
          </div>
        </RightSide>
      </CustomDiv>
    </div>
  )
}

export default SignUp;
