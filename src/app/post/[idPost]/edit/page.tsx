'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import EditPostForm from '../../../../components/Edit/Edit';
import api from '../../../../app/api';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
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

interface EditPostPageProps {
  params: {
    idPost: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const [postData, setPostData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/posts/${params.idPost}`);
        setPostData(response.data);
      } catch (err) {
        setError('Failed to fetch post data. Please try again.');
        console.error('Error fetching post:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [params.idPost]);

  const handleSubmit = async (updatedPost: Post) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.put(`/posts/${params.idPost}`, updatedPost);
      router.push(`/post/${params.idPost}`);
    } catch (err) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', err);
    } finally {
      setIsLoading(false);
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
        <h1>Edit Post</h1>
        <EditPostForm post={postData} onSubmit={handleSubmit} isSubmitting={isLoading} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </MainContent>
      <Footer />
    </PageContainer>
  );
}