import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Image = styled.img`
    width: 45px;
    height: 45px;
`;

const Username = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Button = styled.button`
    background: none;

    &.text-color {
        color: #3B82F6 !important;
    }

    &:hover{
        color: #3B82F6!important;
    }
`;

const Comment = ({comment, onLike}) => {

    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();

                if(res.ok){
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getUser();

    }, [comment])

  return (
    <div className='d-flex border-bottom p-3 small'>
        <div className="d-flex me-3">
            <Image className='object-fit-cover rounded-circle' src={user.profilePicture} alt={user.username} />
        </div>
        <div className="">
            <div className="d-flex align-items-center gap-2 mb-2">
                <Username className='fw-bold mr-1 small'>{user ? `@${user.username}` : 'anonymous user'}</Username>
                <span className='text-secondary small'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-secondary pb-2' style={{ marginBottom: '5px' }}>{comment.content}</p>
            <div className="d-flex align-items-center pt-2 border-top gap-1">
                <Button  type='button' onClick={() => onLike(comment._id)} className={`border-0 text-secondary ${currentUser && comment.likes.includes(currentUser._id) && 'text-color'}`}>
                    <FaThumbsUp className='small'/>
                </Button>
                <p className='text-secondary mt-1 mb-0'>
                    {
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
                    }
                </p>
            </div>
        </div>
    </div>
  )
}

export default Comment;