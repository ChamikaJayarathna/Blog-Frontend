import React, { useEffect, useState } from 'react';
// import PostCard from '../components/PostCard';
import BlogPosts from '../components/BlogPosts';

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
      <div>
         <div className="container-fluid text-center my-5 w-100">

            {posts && posts.length > 0 && (

                posts.map((post) => (
                  <BlogPosts key={post._id} post={post} />

                ))

            )}

        </div>
    </div>

  );
};

export default Home;






{/* <div className="d-flex flex-wrap gap-4 mt-5">
        {posts && posts.length > 0 && (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}
</div> */}
