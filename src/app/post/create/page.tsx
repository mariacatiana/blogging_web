'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import PostForm from '../../../components/PostForm/PostForm';
import api from '../../../app/api';
import { PostFormProps } from '../../../components/PostForm/PostForm';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

interface PostData {
  id?: string;
  title: string;
  category: string;
  author: string;
  imageUrl: string;
  content: string;
}

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (postData: PostFormProps['initialData']) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const response = await api.post('/posts', postData);
      console.log('Post created:', response.data);
      setSuccess(true);
      
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Title>Create New Post</Title>
        <PostForm onSubmit={handleSubmit} isSubmitting={isLoading} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Post created successfully! Redirecting...</SuccessMessage>}
      </MainContent>
      <Footer />
    </PageContainer>
  );
}