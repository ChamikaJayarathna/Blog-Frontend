import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CallToAction from '../../components/CallToAction';
import CommentSection from '../../components/CommentSection';
import PostCard from '../../components/PostCard';
import './postPage.css';

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
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchRecentPosts();
    }, []);

    if (loading) return (
        <div className="spinner-container">
            <div className="spinner" role="status"></div>
        </div>
    );

    return (
        <main className="post-page-main">
            <div className="post-page-card">
                <h1 className="post-page-title">{post && post.title}</h1>
                {/* <Link to={`/search?category=${post && post.category}`} className="category-button">
                    <button type="button" className="btn btn-light rounded-pill">{post && post.category}</button>
                </Link> */}

                <div className="post-page-card-header">
                    <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
                </div>

                <div className="post-page-card-body">
                    <div className="post-page-content" dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
                </div>

                <div className="post-page-images">
                    {post && post.images && post.images.slice(1).map((image, index) => (
                        <div key={index} className="post-page-image-card">
                            <img src={image} alt={`${post.title} - ${index + 1}`} className="post-page-image" />
                        </div>
                    ))}
                </div>


            </div>

            {/* Uncomment if needed */}
            {/* <div className="cta-container">
                <CallToAction />
            </div> */}

            <CommentSection postId={post._id} />

            <div className="recent-articles">
                <h1>Recent articles</h1>
                <div className="post-cards">
                    {
                        recentPosts &&
                        recentPosts.map((post) => <PostCard key={post._id} post={post} />)
                    }
                </div>
            </div>
        </main>
    );
}

export default PostPage;
