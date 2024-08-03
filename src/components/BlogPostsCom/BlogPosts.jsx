import React from 'react';
import { Link } from 'react-router-dom';
import './blogPost.css';

const BlogPosts = ({ post }) => {
  return (
    <div className="blog-post">
      <Link to={`/post/${post.slug}`} className='text-decoration-none'>
        <div className="card">
          <img src={post.images[0]} className="card-img-top" alt={post.title} />
          <div className="card-body">
            <h2 className="card-title text-start">{post.title}</h2>
            <p className="card-text">{post.excerpt}</p>
            <span className='category'>{post.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPosts;
