import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #444;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #666;
`;

const ContactInfo = styled.div`
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>사이트 소개</Title>
      
      <Section>
        <SubTitle>성경 구절 검색 서비스</SubTitle>
        <Paragraph>
          이 웹사이트는 성경 구절을 쉽고 빠르게 검색하고 공유할 수 있는 서비스를 제공합니다.
          다양한 성경 번역본과 함께, 성경 말씀을 더 깊이 이해하고 나누는 데 도움이 되기를 바랍니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>운영 정보</SubTitle>
        <Paragraph>
          이 사이트는 개인적으로 운영하며, 성경 말씀을 더 많은 사람들과 나누고자 하는 목적으로 시작되었습니다.
        </Paragraph>
      </Section>

      <ContactInfo>
        <SubTitle>문의하기</SubTitle>
        <ContactItem>
          <Label>이메일:</Label>
          <span>fall900802@gmail.com</span>
        </ContactItem>
        
      </ContactInfo>
    </AboutContainer>
  );
};

export default About; 