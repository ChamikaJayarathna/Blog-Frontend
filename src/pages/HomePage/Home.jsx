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

  return (
    <div className="wrapper">
      <div className="container">
        {posts.length > 0 && posts.map((post, index) => (
          <div key={post._id} className="box">
            <BlogPosts post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
