'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import SinglePost from '../../../components/SinglePost/SinglePost';
import api from '../../../app/api';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px 20px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
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

interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  content: string;
}

interface PostPageProps {
  params: {
    idPost: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const [postData, setPostData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/posts/${params.idPost}`);
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setError('Failed to load post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.idPost]);

  const handleEdit = () => {
    router.push(`/post/${params.idPost}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${params.idPost}`);
        console.log(`Post with id: ${params.idPost} deleted successfully`);
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
    return <div>Post not found.</div>;
  }

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <ImageContainer>
          <SinglePost {...postData} />
          <ButtonContainer>
            <EditButton onClick={handleEdit}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </ImageContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
}