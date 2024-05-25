import React, { useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OAuth from '../components/OAuth';
import { useSelector } from 'react-redux';

const Logo = styled.span`
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);   
    padding: 8px 12px;
    border-radius: 8px;
`;

const Blog = styled.span`
  color: ${({ theme }) => theme === 'dark' ? '#FFFFFF' : 'black'};
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

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useSelector(state => state.theme);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-vh-100 mt-5 d-flex justify-content-center'>
      <CustomDiv>
        {/* left side */}
        <LeftSide>
          <CustomLink to="/">
            <Logo>Sahand's</Logo>
            <Blog theme={theme}>Blog</Blog>
          </CustomLink>
          <p className='fs-6 mt-3'>This is a demo project. You can sign up with your email and password or with Google.</p>
        </LeftSide>

        {/* right side */}
        <RightSide>
          <form className='d-flex flex-column' onSubmit={handleSubmit}>
            <Ldiv>
              <label htmlFor='username' className='form-label'>Your username</label>
              <input
                type='text'
                className='form-control'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </Ldiv>

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
                ) : 'Sign Up'
              }
            </SubmitButton>
            <OAuth/>
          </form>
          
          <div className="d-flex gap-1 fs-6 mt-2">
            <span>Have an account? </span>
            <Link to='/sign-in' className='text-primary'>Sign In</Link>
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

export default SignUp;
