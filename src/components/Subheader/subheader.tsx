import React from 'react';
import styled from 'styled-components';
import illustration_1 from '../../assets/Images/illustration_1.png';
import illustration_2 from '../../assets/Images/illustration_2.png';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(6, 9, 25, 0.9);
  padding: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 32px;
    height: auto;
  }

  @media (min-width: 1024px) {
    height: auto;
    align-items: stretch;
  }
`;

const Illustration = styled.img`
  display: none;
  width: auto;
  height: auto;

  @media (min-width: 1024px) {
    display: block;
    min-width: 24px;
    min-height: 24px;
    max-height: 100%;
    object-fit: contain;
    padding: 32px 0;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 32px 0;

  @media (min-width: 768px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Title = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 32px;
  line-height: 1.2;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 40px;
  }

  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 18px;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const SubHeader = () => {
  return (
    <HeaderContainer>
      <Illustration src={illustration_1.src} alt="illustration of lines and stars" />
      <TitleContainer>
        <Title>School blog</Title>
        <Subtitle>
          Knowledge and learning at every click: news, lessons, and content to transform your education!
        </Subtitle>
      </TitleContainer>
      <Illustration src={illustration_2.src} alt="illustration of geometric figures" />
    </HeaderContainer>
  );
};

export default SubHeader;