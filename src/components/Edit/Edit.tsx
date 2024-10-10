import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../app/api';

type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
  imageUrl: string;
};

export interface EditPostFormProps {
  post: Post;
  onSubmit: (updatedPost: Post) => Promise<void>;
  isSubmitting: boolean;
}

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
  margin-top: 10px;
`;

const EditPostForm: React.FC<EditPostFormProps> = ({ post, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(post);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.put(`/posts/${post.id}`, formData);
      await onSubmit(response.data);
    } catch (err) {
      setError('Failed to update the post. Please try again.');
      console.error('Error updating post:', err);
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
      <Input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <Input
        type="text"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
        required
      />
      <Input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <Input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
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
        {isSubmitting ? 'Updating...' : 'Update Post'}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default EditPostForm;