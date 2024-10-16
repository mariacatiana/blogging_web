"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import background from '../assets/Images/background.png';
import Search from '../components/Search/Search';
import PostPage from '../components/postPage/postPage';
import TransparentHeader from '../components/Subheader/subheader';
import Image from 'next/image';
import api from '../app/api';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const TopSection = styled.div`
  width: 100%;
  position: relative;
  height: 0;
  padding-top: 56.25%;

  @media (max-width: 768px) {
    height: 600px;
  }

  @media (max-width: 480px) {
    height: 500px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TransparentHeaderContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const SearchContainer = styled.div`
  width: 100%;
  margin-top: -8px;
`;

const Section = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
`;
interface Post {
  _id: string;
  title: string;
  category: string;
  date: string;
  cover?: string;
  link: string;
  author: {
    username: string;
    avatar?: string;
  };
  content: string;
  createdAt: string; 
}

function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noPosts, setNoPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      setNoPosts(false);

      try {
        const response = await api.get('/post', {
          params: { category: selectedCategory },
        });        

        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            setNoPosts(true); 
          } else {

            setSearchResults(response.data);
          }
        } else {
          setError('Unexpected data format received from server.');
        }
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setIsLoading(false); 
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearch = (results: Post[]) => {
    setSearchResults(results);
    setError(null);
    setNoPosts(results.length === 0); 
  };

  return (
    <PageContainer>
      <TopSection>
      <BackgroundImage>
  <Image
    src={background}
    alt="Background"
    fill
    priority
    sizes="100vw"
    style={{
      objectFit: 'cover',
    }}
  />
</BackgroundImage>
        <ContentWrapper>
          <Header />
          <TransparentHeaderContainer>
            <TransparentHeader />
          </TransparentHeaderContainer>
        </ContentWrapper>
      </TopSection>
      <SearchContainer>
        <Search onCategorySelect={handleCategorySelect} onSearch={handleSearch} />
      </SearchContainer>
      <Section>
        {isLoading ? (
          <LoadingMessage>Loading posts...</LoadingMessage>
        ) 
         : (
          <PostPage selectedCategory={selectedCategory} post ={searchResults} />
        )}
      </Section>
      <Footer />
    </PageContainer>
  );
}

export default Page;









