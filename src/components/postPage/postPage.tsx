import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import api from '../../app/api';
import { FaUserCircle } from 'react-icons/fa';
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
interface PostPageProps {
  selectedCategory: string | null;
  post: Post[]; 
}

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
  color: #333;
  opacity: 85%;
  margin-top: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #666;
`;

const Paragraph = styled.p`
  opacity: 80%;
  font-size: 24px;
  margin-bottom: 20px;
`;

const CreatePostButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #FD841F;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #E67E22;
  }
`;

const SubSection = styled.section`
  width: 100%;
  opacity: 1;
  padding: 0 5%;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 0 88px;
    max-width: 1780px;
  }
`;

const SectionTiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeaturedTile = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    height: 600px;
  }
`;

const SmallTilesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  list-style: none;  

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TileItem = styled.li`
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: 300px;
    
  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 768px) {
    height: 350px;
  }

  @media (min-width: 1024px) {
    height: 400px;
  }
`;

const TileLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
  position: relative;
`;

const Tilegradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 144px;
  z-index: 1;
  background: linear-gradient(0deg, rgba(0,0,0,50.8) 20%, rgba(0,0,0,0) 100%);
  color: white;
`;

const TileContent = styled.div`
  position: absolute;
  bottom: 32px;
  left: 24px;
  right: 0;
  padding: 20px;
  z-index: 2;  
  color: white;
`;

const TileCategory = styled.div<{ $category?: string }>`
   font-size: 18px;
   color: white;
   background-color: ${props => props.$category ? categoryColors[props.$category] : 'transparent'};
   padding: 5px 10px;
   border-radius: 8px;
   display: inline-block;
   margin-bottom: 16px;
`;

const categoryColors: { [key: string]: string } = {
  'News': '#4A148C',
  'Community': '#8B0000',
  'Learning': '#34495E',
  'Culture': '#A52A2A',
  'Sports': '#216953',
  'Student Spotlights': '#AE650C',
  'Career and Future': '#C2185B',
  'Technology and Innovation': '#1C78D2',
  'Health and Well-being': '#58830A'
};

const TileHeadline = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const TileTimestamp = styled.div`
  font-size: 16px;
  color: white;
  margin-bottom: 16px;
`;

const TileImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`;
const PostContentPreview = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
  color: white;
  width: 80%;
`;

const TileAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
  bottom: 16px;
`;

const PostDate = styled.span`
  font-size: 14px;
  color: white;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #FFC700;
  margin-bottom: 16px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultAvatarIcon = styled(FaUserCircle)`
  width: 100%;
  height: 100%;
  color: white;
`;

const LoadMoreButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  color: #FD841F;
  background-color: transparent;
  border: 2px solid #FD841F;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #FD841F;
    color: #fff;
  }
`;

  const PostPage: React.FC<PostPageProps> = ({ selectedCategory, post }) => {
  const [postlist] = useState<Post[]>(post || []); 
  const [visiblePosts, setVisiblePosts] = useState<number>(4);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get<Post[]>('/post');
        const imagePathsData: Record<string, string> = {};
        response.data.forEach(post => {
          if (post.cover) {
            imagePathsData[post._id] = post.cover;
          }
        });
        
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {    
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const filteredPosts = postlist ? (selectedCategory
    ? postlist.filter(post => post.category === selectedCategory)
    : postlist) : [];    

  const handleLoadMore = () => {
    setVisiblePosts(prevVisible => Math.min(prevVisible + 3, filteredPosts.length));
  };

  const renderTile = (post: Post) => {    

  let imageUrl;
  if (post.cover) {
    
    const coverPath = post.cover.startsWith('/uploads/') 
      ? post.cover.slice(8) 
      : post.cover;    
   
    const hasExtension = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(coverPath);
    
    imageUrl = hasExtension 
      ? `http://localhost:4000/uploads/${coverPath}`
      : `http://localhost:4000/uploads/${coverPath}.jpg`; 
  } else {
    imageUrl = `http://localhost:4000/uploads/defaultImage.jpg`;
  } 
  
    return (
      <TileLink href={`/post/${post._id}`}>
        <TileImage>
      <svg width="100%" height="100%">
        <image 
          href={imageUrl} 
          width="100%" 
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          onError={(e: React.SyntheticEvent<SVGImageElement, Event>) => {
            const target = e.currentTarget as SVGImageElement;
            target.setAttribute('href', 'http://localhost:4000/uploads/defaultImage.jpg');
          }}
          aria-label={post.title}
        />
      </svg>
    </TileImage>

      <Tilegradient/>

        <TileContent>
          <TileCategory $category={post.category}>{post.category}</TileCategory>
          <TileHeadline>{post.title}</TileHeadline>
          <PostContentPreview>{post.content}</PostContentPreview>
          <TileTimestamp>{post.date}</TileTimestamp>
          <TileAuthorInfo>
          <Avatar>
          {post.author && post.author.avatar ? (
            <AvatarImage 
              src={post.author.avatar} 
              alt={`${post.author.username}'s avatar`} 
            />
          ) : (
            <DefaultAvatarIcon />
          )}
        </Avatar>            
        <TileTimestamp>
          {post.author ? post.author.username : 'Unknown Author'} | {' '}
              <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
            </TileTimestamp>
          </TileAuthorInfo>
        </TileContent>
      </TileLink>
    );
  };
  

  return (
    <Section>
      <Title>Discover Our Latest Articles</Title>
      <Subtitle>Stay updated with the latest school news and activities</Subtitle>
      <Paragraph>Students, teachers, and staff making our school a place of learning and growth.</Paragraph>

      {isLoggedIn && (
        <CreatePostButton href="/post/create">Create Post</CreatePostButton>
      )}

      {(!postlist || postlist.length === 0) ? (
        <Paragraph>No posts available.</Paragraph>
      ) : (
        <>
          <SubSection>
            <SectionTiles>
              {filteredPosts.length > 0 && (
                <FeaturedTile>
                  {renderTile(filteredPosts[0])}
                </FeaturedTile>
              )}
              <SmallTilesContainer>
                {filteredPosts.slice(1, visiblePosts).map((post) => (
                  <TileItem key={post._id}>
                    {renderTile(post)}
                  </TileItem>
                ))}
              </SmallTilesContainer>
            </SectionTiles>
          </SubSection>

          {visiblePosts < filteredPosts.length && (
            <LoadMoreButton onClick={handleLoadMore}>
              Load more articles
            </LoadMoreButton>
          )}
        </>
      )}
    </Section>
  );
};

export default PostPage;