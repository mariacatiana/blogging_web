'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import EditPostForm from '../../../../components/Edit/Edit';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px 20px;
`;

interface EditPostPageProps {
  params: {
    idPost: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();

  const handleEditSuccess = () => {
    router.push(`/post/${params.idPost}`);
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <h1>Edit Post</h1>
        <EditPostForm postId={params.idPost} onEditSuccess={handleEditSuccess} />
      </MainContent>
      <Footer />
    </PageContainer>
  );
}