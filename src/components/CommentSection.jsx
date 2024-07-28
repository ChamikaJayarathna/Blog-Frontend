import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../components/Comment';

const Main = styled.div`
    max-width: 600px;
`;

const Image = styled.img`
    height: 20px;
    width: 20px;
`;

const CommentSection = ({postId}) => {

    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    console.log(comments);  

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(comment.length > 200){
            return
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id}),
            });
            const data = await res.json();
            if(res.ok){
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () =>{
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if(res.ok){
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();
    }, [postId]);


    const handleLike = async (commentId) => {
        try {
          if (!currentUser) {
            navigate('/sign-in');
            return;
          }
          const res = await fetch(`/api/comment/likeComment/${commentId}`, {
            method: 'PUT',
          });
          if (res.ok) {
            const data = await res.json();
            setComments(
              comments.map((comment) =>
                comment._id === commentId
                  ? {
                      ...comment,
                      likes: data.likes,
                      numberOfLikes: data.likes.length,
                    }
                  : comment
              )
            );
          }
        } catch (error) {
          console.log(error.message);
        }
    };

    const handleEdit = async (comment, editedContent) => {
        setComments(
          comments.map((c) =>
            c._id === comment._id ? { ...c, content: editedContent } : c
          )
        );
    };

  return (
    <Main className='mx-auto w-100 p-3'>
        {
            currentUser ?
            (
                <div className="d-flex align-items-center gap-2 my-3 text-black-50">
                    <p className='mb-0'>Signed in as:</p>
                    <Image className='object-fit-cover rounded-circle' src={currentUser.profilePicture} alt="" />
                    <Link to={'/dashboard?tab=profile'} className='text-decoration-none text-secondary-emphasis cursor-pointer'>
                        @{currentUser.username}
                    </Link>
                </div>
            ):
            (
                <div className="text-secondary my-5 d-flex gap-1">
                    You must be signed in to comment.
                    <Link className='text-primary text-decoration-none cursor-pointer ' to={'/sign-in'}>Sign In</Link>
                </div>
            )
        }
        {
            currentUser && (
                <form onSubmit={handleSubmit} className='border p-3 border-info rounded-2'>
                    <textarea class="form-control" placeholder='Add a comment...' rows="3" maxLength='200' onChange={(e) => setComment(e.target.value)} value={comment}/>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className='text-secondary fs-6'>{200 - comment.length} characters remaining</p>
                        <button type="submit" className='btn btn-outline-success border-2'>Submit</button>
                    </div>
                    {commentError && (
                        <div className="alert alert-danger mt-4" role="alert">
                            {commentError}
                        </div>
                    )}
                </form>
            )
        }
        {comments.length === 0 ? (
            <p className='fs-6 my-5'>No comments yet!</p>
        ):(
            <>
                <div className="fs-6 my-3 d-flex align-items-center gap-1">
                    <p className='mb-0'>Comments</p>
                    <div className="border border-dark-subtle py-1 px-2 rounded-2">
                        <p className='mb-0'>{comments.length}</p>
                    </div>
                </div>
                {
                    comments.map(comment =>(
                        <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit}/>
                    ))
                }
            </>
        )}
    </Main>
  )
}

export default CommentSection;