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

const ButtonLike = styled.button`
    background: none;

    &.text-color {
        color: #3B82F6 !important;
    }

    &:hover{
        color: #3B82F6!important;
    }
`;

const ButtonEdit = styled.button`
    background: none;

    &:hover{
        color: #0077b6 !important;
    }
`;

const Comment = ({comment, onLike, onEdit}) => {

    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
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

    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
          const res = await fetch(`/api/comment/editComment/${comment._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: editedContent,
            }),
          });
          if (res.ok) {
            setIsEditing(false);
            onEdit(comment, editedContent);
          }
        } catch (error) {
          console.log(error.message);
        }
      };


  return (
    <div className='d-flex border-bottom p-3 small'>
        <div className="d-flex me-3">
            <Image className='object-fit-cover rounded-circle' src={user.profilePicture} alt={user.username} />
        </div>
        <div className="w-100 mb-1">
            <div className="d-flex align-items-center gap-2 mb-2">
                <Username className='fw-bold mr-1 small'>{user ? `@${user.username}` : 'anonymous user'}</Username>
                <span className='text-secondary small'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            {
                isEditing ? (
                    <>
                        <textarea className='form-control p-2 mt-3' rows='2' value={editedContent} onChange={(e) => setEditedContent(e.target.value)}/>
                        
                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className='btn btn-primary border-2 mt-2' style={{width: '100px'}} onClick={handleSave}>Save</button>
                            <button type="button" className='btn btn-outline-danger border-2 mt-2' style={{width: '100px'}} onClick={() => setIsEditing(false)}>Cancle</button>
                        </div>     
                    </>
                ): (
                    <>
                        <p className='text-secondary pb-2' style={{ marginBottom: '5px' }}>{comment.content}</p>
                        <div className="d-flex align-items-center pt-2 border-top gap-1">
                            <ButtonLike  type='button' onClick={() => onLike(comment._id)} className={`border-0 text-secondary ${currentUser && comment.likes.includes(currentUser._id) && 'text-color'}`}>
                                <FaThumbsUp className='small'/>
                            </ButtonLike>
                            <p className='text-secondary mt-1 mb-0'>
                                {
                                    comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
                                }
                            </p>
                            {
                                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <ButtonEdit type="button" className='text-secondary border-0 mt-1 mb-0' onClick={handleEdit}>Edit</ButtonEdit>
                                )
                            }
                        </div>
                    </>
                )
            } 
        </div>
    </div>
  )
}

export default Comment;