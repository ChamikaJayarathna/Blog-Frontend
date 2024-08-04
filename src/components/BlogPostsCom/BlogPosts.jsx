import React from 'react';
import { Link } from 'react-router-dom';
import './blogPost.css';

const BlogPosts = ({ post }) => {
  return (
    <div className="blog-post-style">
      <Link to={`/post/${post.slug}`} className='blog-post-style-text-decoration-none'>
        <div className="blog-post-style-card">
          <img src={post.images[0]} className="blog-post-style-card-img" alt={post.title} />
        </div>
        <div className="blog-post-style-card-body">
            <p className="blog-post-style-card-title text-start">{post.title}</p>
          </div>
      </Link>
    </div>
  );
};

export default BlogPosts;
