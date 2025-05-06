import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
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

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <Title>문의하기</Title>
      
      <Section>
        <SubTitle>피드백 및 문의</SubTitle>
        <Paragraph>
          서비스 이용 중 불편사항이나 개선사항이 있으시다면 아래 연락처로 문의해 주세요.
          빠른 시일 내에 답변 드리도록 하겠습니다.
        </Paragraph>
      </Section>

      <ContactInfo>
        <SubTitle>연락처 정보</SubTitle>
        <ContactItem>
          <Label>이메일:</Label>
          <span>fall900802@gmail.com</span>
        </ContactItem>
      </ContactInfo>
    </ContactContainer>
  );
};

export default Contact; 