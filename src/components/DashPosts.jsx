import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
    width: 80px;
    height: 40px;
`;



const DashPosts = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    console.log(userPosts);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
            const data = await res.json();
            if (res.ok) {
              setUserPosts(data.posts);
              if (data.posts.length < 9) {
                setShowMore(false);
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
                                        <Image src={post.image} alt={post.title} className='object-cover bg-secondary-subtle'/>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/post/${post.slug}`} className='text-decoration-none text-black'>{post.title}</Link>
                                </td>
                                <td>{post.category}</td>
                                <td>
                                    <span className='text-danger'>Delete</span>
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
            </>
        ):(
            <p>You have no posts yets!</p>
        )}
    </div>
  )
}

export default DashPosts;