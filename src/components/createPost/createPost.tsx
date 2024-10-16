import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../app/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #FD841F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #E67E22;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const tags = [
  'News', 'Community', 'Learning', 'Culture',
  'Sports', 'Student Spotlights', 'Career and Future',
  'Technology and Innovation', 'Health and Well-being'
];

const CreatePost: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const postFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      postFormData.append(key, value);
    });
    if (coverFile) {
      postFormData.append('cover', coverFile);
    }

    try {
      let token = '';
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('authToken') || '';
      }    

      const response = await api.post('/post', postFormData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });      
      
      const newPostId = response.data._id;      
      
      router.push(`/post/${newPostId}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred while creating the post. Please try again.');
      } else {
        setError('An unexpected error has occurred. Please try again.');
      }
      console.error('Error creating post', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

<Select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select a Category</option>
        {tags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </Select>
      
      <Input
        type="file"
        name="cover"
        onChange={handleFileChange}
        accept="image/*"
        required
      />
      <Textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Post'}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default CreatePost;

