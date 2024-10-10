import React from 'react';
import styled from 'styled-components';
import api from '../../app/api';


interface SinglePostProps {
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
  imageUrl: string;
}

const PostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const PostTitle = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
`;

const PostCategory = styled.span`
  background-color: #FD841F;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
`;

const PostContent = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
`;

const SinglePost: React.FC<SinglePostProps> = ({ title, category, date, author, content, imageUrl }) => {
  return (
    <PostContainer>
      <PostImage src={imageUrl} alt={title} />
      <PostTitle>{title}</PostTitle>
      <PostMeta>
        <PostCategory>{category}</PostCategory>
        <span>{date} | By {author}</span>
      </PostMeta>
      <PostContent dangerouslySetInnerHTML={{ __html: content }} />
    </PostContainer>
  );
};

export default SinglePost;