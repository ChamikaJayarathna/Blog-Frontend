import React, { useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

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

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields.'));
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-vh-100 mt-5 d-flex justify-content-center'>
      <CustomDiv>
        {/* left side */}
        <LeftSide>
          <CustomLink to="/">
            <Logo>Sahand's</Logo>
            <Blog>Blog</Blog>
          </CustomLink>
          <p className='fs-6 mt-3'>This is a demo project. You can sign in with your email and password or with Google.</p>
        </LeftSide>

        {/* right side */}
        <RightSide>
          <form className='d-flex flex-column' onSubmit={handleSubmit}>

            <Ldiv>
              <label htmlFor='email' className='form-label'>Your email</label>
              <input
                type='email'
                className='form-control'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </Ldiv>

            <Ldiv>
              <label htmlFor='password' className='form-label'>Your password</label>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </Ldiv>

            <SubmitButton type="submit" className='mt-4' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner animation="border" size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </SubmitButton>
            <OAuth/>
          </form>
          
          <div className="d-flex gap-1 fs-6 mt-2">
            <span>Don't Have an account? </span>
            <Link to='/sign-up' className='text-primary'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert variant='danger' className='mt-4'>
                {errorMessage}
              </Alert>
            )
          }
        </RightSide>
      </CustomDiv>
    </div>
  )
}

export default SignIn;
