import styled from 'styled-components';
import Image from "next/legacy/image";
import PostPage_1 from '../../assets/Images/PostPage_1.png';
import PostPage_2 from '../../assets/Images/PostPage_2.png';
import PostPage_3 from '../../assets/Images/PostPage_3.png';
import PostPage_4 from '../../assets/Images/PostPage_4.png';

const SectionContent = styled.div`
  padding: 120px 0px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const TileItem = styled.li<{ isSmall?: boolean }>`
  position: relative;
  list-style: none;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: ${props => props.isSmall ? '600px' : '400px'};
  padding-bottom: ${props => props.isSmall ? '0' : '56.25%'};

  @media (max-width: 768px) {
    height: ${props => props.isSmall ? '350px' : '250px'};
  }

  @media (max-width: 480px) {
    height: ${props => props.isSmall ? '300px' : '200px'};
  }
`;

const TileLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

const TileBackground = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover; // Atualizado para uso direto de estilo
`;

const TileContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
`;

const TileCategory = styled.div<{ category: string }>`
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
  color: white;
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ category }) => {
    switch (category) {
      case 'Community': return '#047619';
      case 'Sports': return '#68219E';
      case 'Technology and Innovation': return '#00F';
      default: return '#ff9900';
    }
  }};
`;

const TileHeadline = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const TileTimestamp = styled.div`
  font-size: 12px;
  color: #ccc;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const BigPost = styled.div`
  width: 100%;
  padding: 0 88px;

  @media (max-width: 768px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const SmallPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 88px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 60px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const ViewAllWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const ViewAllButton = styled.a<{ variant: 'outlined' | 'filled' }>`
  cursor: pointer;
  padding: 8px 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border-radius: 8px;
  background-color: ${({ variant }) => (variant === 'outlined' ? 'transparent' : '#FD841F')};
  color: ${({ variant }) => (variant === 'outlined' ? '#FD841F' : 'white')};
  border: 2px solid #FD841F;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ variant }) => (variant === 'outlined' ? '#FD841F' : 'white')};
    color: ${({ variant }) => (variant === 'outlined' ? 'white' : '#FD841F')};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const PostPage = () => {
  return (
    <SectionContent>
      <PostContainer>
        <BigPost>
          <TileItem>
            <TileLink href="#">
              <TileBackground src={PostPage_1} alt="Imagem do Post" fill />
              <TileContent>
                <TileCategory category="Culture">Culture</TileCategory>
                <TileHeadline>
                  Art, music, theater projects, cultural events, and book and movie recommendations.
                </TileHeadline>
                <TileTimestamp>August 21, 2024</TileTimestamp>
              </TileContent>
            </TileLink>
          </TileItem>
        </BigPost>

        <SmallPostsContainer>
          {[
            { image: PostPage_2, category: "Sports", headline: "Competition results, training schedules, and highlights from the school team." },
            { image: PostPage_3, category: "Technology and Innovation", headline: "Tech news, robotics projects, programming, and innovations used at school." },
            { image: PostPage_4, category: "Community", headline: "A forum for interaction between students, teachers, and parents, with tips and discussions about school life." }
          ].map((post, index) => (
            <TileItem key={index} isSmall>
              <TileLink href="#">
                <TileBackground src={post.image} alt="Imagem do Post" fill />
                <TileContent>
                  <TileCategory category={post.category}>{post.category}</TileCategory>
                  <TileHeadline>{post.headline}</TileHeadline>
                  <TileTimestamp>August 21, 2024</TileTimestamp>
                </TileContent>
              </TileLink>
            </TileItem>
          ))}
        </SmallPostsContainer>

        <ViewAllWrapper>
          <ViewAllButton variant="filled" href="/ver-tudo">Ver tudo</ViewAllButton>
        </ViewAllWrapper>
      </PostContainer>
    </SectionContent>
  );
};

export default PostPage;

