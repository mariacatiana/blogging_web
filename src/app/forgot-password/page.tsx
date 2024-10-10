'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header/Header';
import api from '../../app/api';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #FD841F;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #FD841F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #E67E22;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ isError?: boolean }>`
  text-align: center;
  margin-top: 20px;
  color: ${props => props.isError ? 'red' : 'green'};
`;

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const response = await api.post('/auth/forgot-password', { email });
      console.log('Password reset requested:', response.data);
      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      console.error('Password reset request failed:', error);
      setMessage('Failed to send password reset link. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <ContainerForm>
        <Title>Forgot Password</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </Button>
        </Form>
        {message && <Message isError={isError}>{message}</Message>}
      </ContainerForm>
    </Container>
  );
};

export default ForgotPasswordPage;