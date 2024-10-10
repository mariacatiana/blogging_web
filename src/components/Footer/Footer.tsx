import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/Images/logo.png';
import footerBackground from '../../assets/Images/background_Footer.png'; 
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const FooterContainer = styled.footer`
  position: relative; 
  background: rgba(6, 9, 25, 0.90); 
  color: #FD841F;
  font-family: 'Roboto', sans-serif;
  padding: 32px 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${footerBackground.src});
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    opacity: 0.5; 
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px; 
  box-sizing: border-box;
  width: 100%;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

const FooterLogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 160px; 

  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const LogoWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  margin-bottom: 16px;
`;

const FooterSocialMedia = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 16px;
`;

const FooterInfoSection = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: flex-start;
  padding: 0 120px; 
  gap: 68px; 

  @media (max-width: 1024px) {
    padding: 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 32px;
  }
`;

const FooterAddress = styled.div`
  p {
    margin: 4px 0;
  }
`;

const FooterHours = styled.div`
  p {
    margin: 4px 0;
  }
`;

const FooterDivider = styled.div`
  width: 100%;
  height: 1px;
  background: radial-gradient(441.87% 148.66% at 31.82% -13.39%, #FF9B00 12.5%, #ED1C24 100%);
  opacity: 0.5;
  margin: 16px 0;
`;

const FooterCopyright = styled.div`
  text-align: center;
  font-size: 12px;
  width: 100%;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;

  svg {
    width: 32px;
    height: 32px;
    fill: #FD841F;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 480px) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogoSection>
          <LogoWrapper>
            <Image
              src={logo}
              alt="Logo"
              fill
              sizes="150px"
              style={{
                objectFit: "contain"
              }}
              priority
            />
          </LogoWrapper>
          <FooterSocialMedia>
            <SocialIcons>
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
              <FaYoutube />
            </SocialIcons>
          </FooterSocialMedia>
        </FooterLogoSection>

        <FooterInfoSection>
          <FooterAddress>
            <p>Elementary and High School</p>
            <p>123 Maple Street</p>
            <p>Phone: +44 20 1234 5678</p>
            <p>Email: contact@school.edu</p>
          </FooterAddress>
          <FooterHours>
            <p><strong>Office Hours:</strong></p>
            <p>Monday to Friday: 8:00 AM – 7:00 PM</p>
            <p>Saturday: 9:00 AM – 12:00 PM</p>
            <p>Sunday: Closed</p>
          </FooterHours>
        </FooterInfoSection>
      </FooterContent>

      <FooterDivider />

      <FooterCopyright>
        © 2024 Created By Catiana Duarte
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;





