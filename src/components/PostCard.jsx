import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
    box-shadow: -3px 7px 38px 4px rgba(0,0,0,0.4);
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
  color: black;
  cursor: pointer;

  &:hover{
    color: #ee9b00;
  }

`;


const PostCard = ({ post }) => {
  return (
    <Main className='w-100'>
        <Link to={`/post/${post.slug}`}>
            <Image src={post.images} alt="post cover" />
        </Link>
        <div className="p-3 d-flex flex-column gap-2">
            <Link to={`/post/${post.slug}`} className='text-decoration-none'>
                <Title className='fs-4 fw-semibold'>{post.title}</Title>
            </Link>
            <span className='fst-italic fs-6 mb-3'>{post.category}</span>
        </div>
    </Main>
  );
}

export default PostCard;
