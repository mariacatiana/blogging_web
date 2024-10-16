import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../app/api';
interface Post {
  _id: string;
  title: string;
  category: string;
  content: string;
  cover: string | null;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface EditPostFormProps {
  postId: string;
  onEditSuccess: () => void;
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

const FileInput = styled.input`
  margin-bottom: 20px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const tags = [
  'News', 'Community', 'Learning', 'Culture',
  'Sports', 'Student Spotlights', 'Career and Future',
  'Technology and Innovation', 'Health and Well-being'
];

const EditPostForm: React.FC<EditPostFormProps> = ({ postId, onEditSuccess }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<Partial<Post>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCover, setNewCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/post/${postId}`);
        setPost(response.data);
        setFormData(response.data);
      } catch (error: any) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewCover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title || '');
      formDataToSend.append('content', formData.content || '');
      formDataToSend.append('category', formData.category || '');
      if (newCover) {
        formDataToSend.append('cover', newCover);
      }

      const response = await api.put(`/post/${postId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPost(response.data);
      setFormData(response.data);
      onEditSuccess();
    } catch (err) {
      setError('Failed to update the post. Please try again.');
      console.error('Error updating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getImageUrl = (cover: string | null): string => {
    if (!cover) return `http://localhost:4000/uploads/defaultImage.jpg`;

    const coverPath = cover.startsWith('/uploads/') ? cover.slice(8) : cover;
    const hasExtension = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(coverPath);

    return hasExtension 
      ? `http://localhost:4000/uploads/${coverPath}`
      : `http://localhost:4000/uploads/${coverPath}.jpg`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const imageUrl = getImageUrl(post.cover);

  return (
    <Form onSubmit={handleSubmit}>
      <PostImage 
        src={imageUrl} 
        alt={post.title} 
        onError={(e) => {
          e.currentTarget.src = 'http://localhost:4000/uploads/defaultImage.jpg';
        }}
      />
      <Input
        type="text"
        name="title"
        value={formData.title || ''}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <Select
        name="category"
        value={formData.category || ''}
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
      <FileInput
        type="file"
        name="cover"
        onChange={handleFileChange}
        accept="image/*"
      />
      <Textarea
        name="content"
        value={formData.content || ''}
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