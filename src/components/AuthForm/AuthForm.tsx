'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import api from '../../app/api';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  isLogin: boolean;
}

const FormContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

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
      let response;
      if (isLogin) {
        response = await api.post('/auth/login', { username, password });
      } else {
        response = await api.post('/auth/signup', { username, password });
      }
      
      const { token } = response.data;      
     
      localStorage.setItem('authToken', token);
      
      router.push('/');
    } catch (err) {
      setError(isLogin ? 'Failed to login. Please try again.' : 'Failed to sign up. Please try again.');
      console.error('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
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
            Don't have an account? <StyledLink href="/signup">Sign up</StyledLink>
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
    </FormContainer>
  );
};

export default AuthForm;