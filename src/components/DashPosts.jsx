import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Image = styled.img`
    width: 80px;
    height: 40px;
`;


const DashPosts = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
            const data = await res.json();
            if (res.ok) {
              setUserPosts(data.posts);
              if (data.posts.length < 9) {
                setShowMore(false);
                if(data.posts.length < 9){
                    setShowMore(false);
                }
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchPosts();
        }
      }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();

            if(res.ok){
                setUserPosts((prev) => [...prev, ...data.posts]);
                if(data.posts.length < 9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                setUserPosts((prev) => 
                   prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }

    };

  return (
    <div className='table-responsive mx-md-auto p-4'>
        {currentUser.isAdmin && userPosts.length > 0 ? (
            <>
                <table className='table table-hover shadow'>
                    <thead className='table-info'>
                        <tr>
                            <th scope='col'>Date updated</th>
                            <th scope='col'>Post image</th>
                            <th scope='col'>Post title</th>
                            <th scope='col'>Category</th>
                            <th scope='col'>Delete</th>
                            <th scope='col'><span>Edit</span></th>
                        </tr>
                    </thead>
                    {userPosts.map((post) =>(
                        <tbody className='table-hover'>
                            <tr>
                                <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/post/${post.slug}`}>
                                        <Image src={post.images} alt={post.title} className='object-cover bg-secondary-subtle'/>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/post/${post.slug}`} className='text-decoration-none text-black'>{post.title}</Link>
                                </td>
                                <td>{post.category}</td>
                                <td>
                                    <span onClick={() => {
                                        setShowModal(true);
                                        setPostIdToDelete(post._id);
                                    }} className='text-danger'>Delete</span>
                                </td>
                                <td>
                                    <Link className='text-success text-decoration-none' to={`/update-post/${post._id}`}>
                                        <span>Edit</span>
                                    </Link>
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
            <p>You have no posts yets!</p>
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
            <Modal.Header closeButton className='border-0' />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-25 w-25 text-secondary mb-4 mx-auto'/>
                <h3 className='mb-5 text-secondary'>Are you sure you want to delete this post?</h3>
                <div className="d-flex justify-content-center gap-4">
                <button className='btn btn-danger' onClick={handleDeletePost}>
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

export default DashPosts;