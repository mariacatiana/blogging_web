'use client';

import React from 'react';
import styled from 'styled-components';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import SinglePost from '../../../components/SinglePost/SinglePost';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px 20px;
`;

export default function PostPage() {
  const params = useParams();
  const idPost = Array.isArray(params?.idPost) ? params.idPost[0] : params?.idPost;

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <SinglePost idPost={idPost} />
      </MainContent>
      <Footer />
    </PageContainer>
  );
}
