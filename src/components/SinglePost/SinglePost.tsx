'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import api from '../../app/api';
interface PostCategoryProps {
  $category: string;
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
  margin-bottom: 16px;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
`;

const PostCategory = styled.span<PostCategoryProps>`
  background-color: ${props => props.$category ? categoryColors[props.$category] || 'transparent' : 'transparent'};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 16px;
`;

const categoryColors: { [key: string]: string } = {
  'News': '#4A148C',
  'Community': '#8B0000',
  'Learning': '#34495E',
  'Culture': '#A52A2A',
  'Sports': '#216953',
  'Student Spotlights': '#AE650C',
  'Career and Future': '#C2185B',
  'Technology and Innovation': '#1C78D2',
  'Health and Well-being': '#58830A'
};

const PostContent = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const EditButton = styled(Button)`
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #da190b;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const TileTimestamp = styled.div`
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Separator = styled.span`
  margin: 1px;
`;

const PostDate = styled.span`
  font-size: 14px;
  color: #666;
`;

interface Post {
  _id: string;
  title: string;
  category: string;
  content: string;
  cover: string | null;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface SinglePostProps {
  idPost: string | undefined;
}

const SinglePost: React.FC<SinglePostProps> = ({ idPost }) => {
  const [postData, setPostData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();   

  useEffect(() => {
    async function fetchData() {
      if (!idPost || idPost === 'undefined') {
        console.error('Invalid post ID:', idPost);
        setError('Invalid post ID');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/post/${idPost}`);
        setPostData(response.data);
      } catch (error: any) {
        console.error('Error fetching post data:', error);
        if (error.response) {
          switch (error.response.status) {
            case 404:
              setError('Post not found');
              break;
            case 400:
              setError('Invalid post ID');
              break;
            default:
              setError('Failed to load post. Please try again later.');
          }
        } else if (error.request) {
          setError('No response received from server. Please check your connection.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [idPost]);

  const getImageUrl = (cover: string | null): string => {
    if (!cover) return `http://localhost:4000/uploads/defaultImage.jpg`;

    const coverPath = cover.startsWith('/uploads/') ? cover.slice(8) : cover;
    const hasExtension = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(coverPath);

    return hasExtension 
      ? `http://localhost:4000/uploads/${coverPath}`
      : `http://localhost:4000/uploads/${coverPath}.jpg`;
  };

  const handleEdit = () => {
    if (idPost) {
      router.push(`/post/${idPost}/edit`);
    } else {
      setError('Invalid post ID');
    }
  };

  const handleDelete = async () => {
    if (!idPost) {
      setError('Invalid post ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/post/${idPost}`);
        router.push('/');
      } catch (error) {
        console.error('Error deleting post:', error);
        setError('Failed to delete post. Please try again later.');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!postData) {
    return <ErrorMessage>Post not found.</ErrorMessage>;
  }

  const formattedDate = new Date(postData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const imageUrl = getImageUrl(postData.cover);

  return (
    <PostContainer>
      <PostImage 
        src={imageUrl} 
        alt={postData.title} 
        onError={(e) => {
          e.currentTarget.src = 'http://localhost:4000/uploads/defaultImage.jpg';
        }}
      />
       <PostTitle>{postData.title}</PostTitle>      
      <PostMeta>
      <PostCategory $category={postData.category}>{postData.category}</PostCategory>
        <TileTimestamp>
          <PostDate>{formattedDate}</PostDate>
          <Separator>|</Separator>
          <span>By {postData.author.username}</span>
        </TileTimestamp>
      </PostMeta>
      <PostContent dangerouslySetInnerHTML={{ __html: postData.content }} />
      <ButtonContainer>
        <EditButton onClick={handleEdit}>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </ButtonContainer>
    </PostContainer>
  );
};

export default SinglePost;