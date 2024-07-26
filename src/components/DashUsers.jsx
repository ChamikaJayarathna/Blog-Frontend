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


const DashUsers = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch(`/api/user/getusers`);
            const data = await res.json();
            if (res.ok) {
              setUsers(data.users);
              if (data.users.length < 9) {
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
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();

            if(res.ok){
                setUsers((prev) => [...prev, ...data.users]);
                if(data.users.length < 9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteUser = async () => {

    };



  return (
    <div className='table-responsive mx-md-auto p-4'>
        {currentUser.isAdmin && users.length > 0 ? (
            <>
                <table className='table table-hover shadow'>
                    <thead className='table-info'>
                        <tr>
                            <th scope='col'>Date created</th>
                            <th scope='col'>User image</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Admin</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    {users.map((user) =>(
                        <tbody className='table-hover' key={user._id}>
                            <tr>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Image src={user.profilePicture} alt={user.username} className='rounded-circle object-cover bg-secondary-subtle'/>
                                </td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (<FaCheck className='text-success'/>) : (<FaTimes className='text-danger'/>)}
                                </td>
                                <td>
                                    <span onClick={() => {
                                        setShowModal(true);
                                        setUserIdToDelete(user._id);
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
            <p>You have no users yets!</p>
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
            <Modal.Header closeButton className='border-0' />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-25 w-25 text-secondary mb-4 mx-auto'/>
                <h3 className='mb-5 text-secondary'>Are you sure you want to delete this user?</h3>
                <div className="d-flex justify-content-center gap-4">
                <button className='btn btn-danger' onClick={handleDeleteUser}>
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

export default DashUsers;