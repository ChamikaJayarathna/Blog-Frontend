import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

const Spinner = styled.div`
    height: 3rem;
    width: 3rem;
`;

const Main = styled.main`
    max-width: 72rem;
`;

const Image = styled.img`
    max-height: 600px;
    object-fit: cover;
`;

const Content = styled.div`
    p{
        margin-bottom: 0.5rem;
    }

    h1{
        font-size: 1.5rem;
        font-weight: 600;
        font-family: sans-serif;
        margin: 1.5rem 0;
    }

    h2{
        font-size: 1.4rem;
        font-family: sans-serif;
        margin: 1.5rem 0;
    }

    a{
        color: #0077b6 !important;
        text-decoration: none;
    }

    a:hover{
        text-decoration: underline;
    }
`;


const PostPage = () => {

    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
            const data = await res.json();
            if (!res.ok) {
              setError(true);
              setLoading(false);
              return;
            }
            if (res.ok) {
              setPost(data.posts[0]);
              setLoading(false);
              setError(false);
            }
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {

        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if(res.ok){
                    setRecentPosts(data.posts);
                }
            }
            fetchRecentPosts();
        } catch (error) {
            console.log(error.message);
        }

    },[]);

    if(loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Spinner className="spinner-border" role="status"/>
        </div>
    );

  return (
    <Main className='p-3 d-flex flex-column mx-auto min-vh-100'>

    <div className="card my-3">

        <h1 className='display-6 mt-4 px-4 text-start w-100'>{post && post.title }</h1>
        <Link to={`/search?category=${post && post.category}`} className='align-self-center mt-3'>
            <button type="button" className='btn btn-light rounded-pill'>{ post && post.category}</button>
        </Link>


        <div className="d-flex justify-content-between mt-3 pb-2 border-bottom border-secondary mx-auto px-4 w-100">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
        </div>
        <Image src={post && post.images[1]} alt={post && post.title} className='mt-4 p-5 card-img-top'/>

        <div className="card-body">
            <Content dangerouslySetInnerHTML={{ __html: post && post.content }} className='p-3 max-auto w-100'></Content>
        </div>

    </div>

        {/* ------------------ */}
        <div className="mx-auto w-100" style={{maxWidth: '1024px'}}>
            <CallToAction/>
        </div>

        {/* ------------------ */}
        <CommentSection postId={post._id}/>


        {/* ------------------ */}
        <div className="d-flex flex-column justify-content-center align-items-center  mb-3">
            <h1 className='mt-5 fs-2'>Recent articles</h1>
            <div className="d-flex flex-wrap gap-4 mt-5">
                {
                    recentPosts && 
                    recentPosts.map((post) => <PostCard key={post._id} post={post}/>)
                }
            </div>
        </div>

    </Main>
  )
}

export default PostPage;



// <div className="card">
//     <img src={post.images[0]} className="card-img-top" alt="..." />
//     <div className="card-body">
//         <h1 className="card-title text-start fw-semibold display-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{post.title}</h1>
//         {/* <p className="card-text">Some quick example text to build on the card title and make </p>
//         <span className='fst-italic fs-6 mb-3'>{post.category}</span> */}
//     </div>
// </div>