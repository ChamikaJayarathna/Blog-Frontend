import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Image = styled.img`
    width: 50px;
    height: 50px;
`;


const DashComments = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const res = await fetch(`/api/comment/getcomments`);
            const data = await res.json();
            if (res.ok) {
              setComments(data.comments);
              if (data.comments.length < 9) {
                setShowMore(false);
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchComments();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
          const res = await fetch(
            `/api/comment/getcomments?startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setComments((prev) => [...prev, ...data.comments]);
            if (data.comments.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
    };

    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
          const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
              method: 'DELETE',
            }
          );
          const data = await res.json();
          if (res.ok) {
            setComments((prev) =>
              prev.filter((comment) => comment._id !== commentIdToDelete)
            );
            setShowModal(false);
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      };



  return (
    <div className='table-responsive mx-md-auto p-4'>
        {currentUser.isAdmin && comments.length > 0 ? (
            <>
                <table className='table table-hover shadow'>
                    <thead className='table-info'>
                        <tr>
                            <th scope='col'>Date updated</th>
                            <th scope='col'>Comment content</th>
                            <th scope='col'>Number of likes</th>
                            <th scope='col'>PostId</th>
                            <th scope='col'>UserId</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    {comments.map((comment) =>(
                        <tbody className='table-hover' key={comment._id}>
                            <tr>
                                <td>{new Date(comment.updatedAt).toLocaleDateString()}</td>
                                <td>{comment.content}</td>
                                <td>{comment.numberOfLikes}</td>
                                <td>{comment.postId}</td>
                                <td>{comment.userId}</td>
                                <td>
                                    <span onClick={() => {
                                        setShowModal(true);
                                        setCommentIdToDelete(comment._id);
                                    }} className='text-danger'>Delete</span>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                {
                    showMore && (
                        <button onClick={handleShowMore} className='w-100 text-info py-3 border-0 text-center rounded bg-body-secondary'>Show more</button>
                    )
                }
            </>
        ):(
            <p>You have no comments yets!</p>
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
            <Modal.Header closeButton className='border-0' />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-25 w-25 text-secondary mb-4 mx-auto'/>
                <h3 className='mb-5 text-secondary'>Are you sure you want to delete this comment?</h3>
                <div className="d-flex justify-content-center gap-4">
                <button className='btn btn-danger' onClick={handleDeleteComment}>
                    Yes, I'm sure
                </button>
                <button className='btn btn-secondary' onClick={() => setShowModal(false)}>
                    No, cancle
                </button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashComments;