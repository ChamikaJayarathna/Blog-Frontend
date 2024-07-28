import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
    overflow: hidden;
    box-shadow: -8px 10px 12px -9px rgba(0,0,0,0.66);
    border-radius: 0.375rem;
    transition: border 0.3s, height 0.3s;
    max-width: 350px;

    &:hover {
        border-width: 2px;
    }
`;


const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: height 0.3s;
    z-index: 20;

    &:hover {
        height: 160px;
    }
`;

const Title = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

// const RALink = styled(Link)`
//     /* bottom: -200px; */
//     bottom: -60px;
//     left: 0;
//     right: 0;
//     transition: all 0.3s;
//     position: absolute;
//     z-index: 100;

//     &:hover {
//         bottom: 0;
//         color: white;
//         background-color: #14B8A6;
//     }
// `;

const PostCard = ({ post }) => {
  return (
    <Main className='position-relative w-100'>
        <Link to={`/post/${post.slug}`}>
            <Image src={post.image} alt="post cover" />
        </Link>
        <div className="p-3 d-flex flex-column gap-2">
            <Title className='fs-4 fw-semibold'>{post.title}</Title>
            <span className='fst-italic fs-6'>{post.category}</span>
            {/* <RALink to={`/post/${post.slug}`} className='border border-2 border-info-subtle text-info text-center text-decoration-none py-2 rounded-3 m-2'>
                Read article
            </RALink> */}
        </div>
    </Main>
  );
}

export default PostCard;
