import React, { useEffect, useState } from 'react';
import BlogPosts from '../../components/BlogPostsCom/BlogPosts';
import './homeStyle.css';

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

  return (
    <div className="home-style-wrapper">
      <div className="home-style-container">
        {posts.length > 0 && posts.map((post) => (
          <div key={post._id} className="home-style-box">
            <BlogPosts post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
