import moment from 'moment';
import React, { useEffect, useState } from 'react';
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

const Comment = ({comment}) => {

    const [user, setUser] = useState({});

    console.log(user);

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
        <div className="flex-1">
            <div className="d-flex align-items-center gap-2 mb-2">
                <Username className='fw-bold mr-1 small'>{user ? `@${user.username}` : 'anonymous user'}</Username>
                <span className='text-secondary small'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-secondary pb-2'>{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment;