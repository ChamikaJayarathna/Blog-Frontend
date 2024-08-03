import React from 'react';
import { Link } from 'react-router-dom';
import './blogPost.css';

const BlogPosts = ({ post }) => {
  return (
    <div className="blog-post">
      <Link to={`/post/${post.slug}`} className='text-decoration-none'>
        <div className="card">
          <img src={post.images[0]} className="card-img-top" alt={post.title} />
        </div>
        <div className="card-body">
            <p className="card-title text-start">{post.title}</p>
          </div>
      </Link>
    </div>
  );
};

export default BlogPosts;
