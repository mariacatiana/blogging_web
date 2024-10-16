'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import CreatePost from '../../../components/createPost/createPost';

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

export default function CreatePostPage() {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Title>Create New Post</Title>
        <CreatePost />
      </MainContent>
      <Footer />
    </PageContainer>
  );
}