'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Header/Header';
import AuthForm from '@/components/AuthForm/AuthForm';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const ContainerForm = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 600;
`;

const SignupPage: React.FC = () => {
  return (
    <Container>
      <Header />
      <ContainerForm>
        <Title>Sign Up</Title>
        <AuthForm isLogin={false} />
      </ContainerForm>
    </Container>
  );
};

export default SignupPage;


