import React from 'react';
import { Link } from 'react-router-dom';

const BlogPosts = ({ post }) => {
  return (
       
                <div className="row justify-content-center my-4">

                    <div className="col-md-5 py-4">
                        <Link to={`/post/${post.slug}`} className='text-decoration-none'>
                            <div className="card">
                            <img src={post.images[0]} className="card-img-top" alt="..." style={{ height: '400px' }} />
                            <div className="card-body">
                                <h1 className="card-title text-start fw-semibold display-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{post.title}</h1>
                                {/* <p className="card-text">Some quick example text to build on the card title and make </p>
                                <span className='fst-italic fs-6 mb-3'>{post.category}</span> */}
                            </div>
                            </div>
                        </Link>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>

                    <div className="col-md-3 py-4" style={{ backgroundColor: '#f0f0f0', width: '350px'}}>
                        <Link to={`/post/${post.slug}`} className='text-decoration-none'>
                            <div className="card ml-3" style={{ width: '320px' }}>
                            <img src={post.images[1]} className="card-img-top" alt="..." style={{ height: '200px' }} />
                            <div className="card-body">
                                <h5 className="card-title text-start" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{post.title}</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make </p>
                                <span className='fst-italic fs-6 mb-3'>{post.category}</span> */}
                            </div>
                            </div>
                        </Link>
                    </div>

                </div>
  );
}

export default BlogPosts;
