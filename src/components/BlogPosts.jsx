import React from 'react';
import { Link } from 'react-router-dom';

const BlogPosts = ({ post }) => {
  return (
       
                <div className="row mx-5 my-4">

                    <div className="col-md-7 mx-auto">
                        <Link to={`/post/${post.slug}`} className='text-decoration-none'>
                            <div className="card">
                            <img src={post.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h1 className="card-title text-start fw-semibold display-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{post.title}</h1>
                                {/* <p className="card-text">Some quick example text to build on the card title and make </p>
                                <span className='fst-italic fs-6 mb-3'>{post.category}</span> */}
                            </div>
                            </div>
                        </Link>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>

                    {/* <div className="col-md-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                            <p className="card-text">Some quick example text to build on the </p>
                            </div>
                        </div>
                    </div> */}

                </div>
  );
}

export default BlogPosts;
