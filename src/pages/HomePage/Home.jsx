import React, { useEffect, useState } from 'react';
import BlogPosts from '../../components/BlogPostsCom/BlogPosts';
import './home.css';

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const getGridItemClass = (index) => {
    const classes = ['tall', 'wide', 'big'];
    return classes[index % classes.length];
  };

  return (
    <div className='wrapper'>
      <div className="grid-wrapper">
        {posts && posts.length > 0 && posts.map((post, index) => (
          <div key={post._id} className={`grid-item ${getGridItemClass(index)}`}>
            <BlogPosts post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
