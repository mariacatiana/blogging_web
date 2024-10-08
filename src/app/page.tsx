"use client";
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import background from '../assets/Images/background.png';
import Search from '../components/Search/Search';
import PostPage from '../components/postPage/postPage';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const TopSection = styled.div`
  background-image: url(${background.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 715px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: 600px; // Ligeiramente menor em tablets
  }

  @media (max-width: 480px) {
    height: 500px; // Menor em smartphones
  }
`;

const ContentSection = styled.div`
  flex-grow: 1;
  width: 100%;
`;

function Page() { 
  return (
    <PageContainer>
      <TopSection>
        <Header />
        <Search />
      </TopSection>
      <ContentSection>
        <PostPage/>
      </ContentSection>
      <Footer />      
    </PageContainer>
  );
}

export default Page;






