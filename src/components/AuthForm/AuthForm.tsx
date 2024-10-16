'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '../../app/api';
import axios, { AxiosError } from 'axios';

interface AuthFormProps {
  isLogin: boolean;
}

interface ErrorResponse {
  error: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #FD841F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #E67E22;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SwitchText = styled.p`
  margin-top: 15px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #FD841F;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await api.post(endpoint, { username, password });      
      
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        id: response.data.id
      }));      
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          setError(axiosError.response.data.error || 'Authentication failed. Please try again.');
        } else if (axiosError.request) {
          setError('No response from server. Please check your internet connection.');
        } else {
          setError(`Error: ${axiosError.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SwitchText>
        {isLogin ? (
          <>
            Do not have an account? <StyledLink href="/signup">Sign up</StyledLink>
          </>
        ) : (
          <>
            Already have an account? <StyledLink href="/login">Login</StyledLink>
          </>
        )}
      </SwitchText>
      <SwitchText>
        <StyledLink href="/forgot-password">Forgot username or password?</StyledLink>
      </SwitchText>
    </>
  );
};

export default AuthForm;