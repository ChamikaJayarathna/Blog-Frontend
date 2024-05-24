import React from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const GoogleButton = styled(Button)`

    background-color: white;
    padding: 0.7rem 1rem;
    border: none;
    color: black;
    border-radius: 90px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
        content: '';
        position: absolute;
        height: 110%;
        width: 102%;
        border-radius: 1000px;
        background-image: linear-gradient(90deg, #FF6F61 0%, #FFA500 100%);
        z-index: -1;
    }

    &:hover {
        z-index: 0;
        background-color: white;
    }
`;

const GoogleIcon = styled(AiFillGoogleCircle)`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;

const OAuth = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });

            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <GoogleButton className='mt-3' type='button' onClick={handleGoogleClick}>
        <GoogleIcon/>Continue with Google
    </GoogleButton>
  )
}

export default OAuth;