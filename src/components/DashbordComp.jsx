import React, { useEffect, useState } from 'react';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
    width: 360px;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
`;


const DashbordComp = () => {

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch('/api/user/getusers?limit=5');
            const data = await res.json();
            if (res.ok) {
              setUsers(data.users);
              setTotalUsers(data.totalUsers);
              setLastMonthUsers(data.lastMonthUsers);
            }
          } catch (error) {
            console.log(error.message);
          }
        };

        const fetchPosts = async () => {
          try {
            const res = await fetch('/api/post/getposts?limit=5');
            const data = await res.json();
            if (res.ok) {
              setPosts(data.posts);
              setTotalPosts(data.totalPosts);
              setLastMonthPosts(data.lastMonthPosts);
            }
          } catch (error) {
            console.log(error.message);
          }
        };

        const fetchComments = async () => {
          try {
            const res = await fetch('/api/comment/getcomments?limit=5');
            const data = await res.json();
            if (res.ok) {
              setComments(data.comments);
              setTotalComments(data.totalComments);
              setLastMonthComments(data.lastMonthComments);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchUsers();
          fetchPosts();
          fetchComments();
        }
      }, [currentUser]);

  return (
    <div className='p-3 mx-auto' style={{marginTop: '110px'}}>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
            <Card className="d-flex flex-column p-3 gap-4 card shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div>
                        <h3 className='text-uppercase text-secondary'>Total Users</h3>
                        <p className='fs-4'>{totalUsers}</p>
                    </div>
                    <HiOutlineUserGroup className='bg-success text-white rounded-circle p-3 display-4 mb-5'/>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-secondary">Last month</div>
                    <span className='text-success d-flex align-items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthUsers}
                    </span>
                </div>
            </Card>

            <Card className="d-flex flex-column p-3 gap-4 card shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div>
                        <h3 className='text-uppercase text-secondary'>Total Comments</h3>
                        <p className='fs-4'>{totalComments}</p>
                    </div>
                    <HiAnnotation className='bg-warning text-white rounded-circle p-3 display-4 mb-5'/>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-secondary">Last month</div>
                    <span className='text-success d-flex align-items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthComments}
                    </span>
                </div>
            </Card>
            
            <Card className="d-flex flex-column p-3 gap-4 card shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div>
                        <h3 className='text-uppercase text-secondary'>Total Posts</h3>
                        <p className='fs-4'>{totalPosts}</p>
                    </div>
                    <HiDocumentText className='bg-danger text-white rounded-circle p-3 display-4 mb-5'/>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-secondary">Last month</div>
                    <span className='text-success d-flex align-items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthPosts}
                    </span>
                </div>
            </Card>
        </div>

        <div className="d-flex flex-wrap gap-4 justify-content-center mt-4 mx-auto">

            <div className="d-flex flex-column shadow p-2 rounded-3">
                <div className="d-flex justify-content-between p-3">
                    <h4 className='text-center p-2'>Recent users</h4>
                    <button type="button" className='btn btn-primary'>
                        <Link to={'/dashboard?tab=users'} className='text-decoration-none text-white'>See all</Link>
                    </button>
                </div>
                <div className="table table-hover">
                    <thead className='table-info'>
                        <tr>
                            <td>User Image</td>
                            <td>Username</td>
                        </tr>
                    </thead>
                    {users && users.map((user) =>(
                        <tbody className='' key={user._id}>
                            <tr>
                                <td>
                                    <Image src={user.profilePicture}  alt='user' className='rounded-circle object-cover bg-secondary-subtle'/>
                                </td>
                                <td>{user.username} </td>
                            </tr>
                        </tbody>
                    ))}
                </div>
            </div>

            <div className="d-flex flex-column  shadow p-2 rounded-3">
                <div className="d-flex justify-content-between p-3">
                    <h4 className='text-center p-2'>Recent comments</h4>
                    <button type="button" className='btn btn-primary'>
                        <Link to={'/dashboard?tab=comments'} className='text-decoration-none text-white'>See all</Link>
                    </button>
                </div>
                <div className="table table-hover">
                    <thead className='table-info'>
                        <tr>
                            <td>Comment content</td>
                            <td>Likes</td>
                        </tr>
                    </thead>
                    {comments && comments.map((comment) =>(
                        <tbody className='' key={comment._id}>
                            <tr>
                                <td>{comment.content}</td>
                                <td>{comment.numberOfLikes} </td>
                            </tr>
                        </tbody>
                    ))}
                </div>
            </div>

            <div className="d-flex flex-column shadow p-2 rounded-3">
                <div className="d-flex justify-content-between p-3">
                    <h4 className='text-center p-2'>Recent posts</h4>
                    <button type="button" className='btn btn-primary'>
                        <Link to={'/dashboard?tab=posts'} className='text-decoration-none text-white'>See all</Link>
                    </button>
                </div>
                <div className="table table-hover">
                    <thead className='table-info'>
                        <tr>
                            <td>Post image</td>
                            <td>Post Title</td>
                            <td>Category</td>
                        </tr>
                    </thead>
                    {posts && posts.map((post) =>(
                        <tbody className='' key={post._id}>
                            <tr>
                                <td>
                                    <Image src={post.image}  alt='user' className='rounded-circle object-cover bg-secondary-subtle'/>
                                </td>
                                <td>{post.title}</td>
                                <td>{post.category}</td>
                            </tr>
                        </tbody>
                    ))}
                </div>
            </div>

        </div>

    </div>
  )
}

export default DashbordComp;