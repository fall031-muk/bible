import React from 'react';
import styled from 'styled-components';
import { dailyVerses } from '../data/dailyVerses';

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
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #444;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #666;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  
  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #1976d2;
  }
`;

const DailyVerse = styled.div`
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  border-left: 4px solid #1976d2;
`;

const VerseText = styled.p`
  font-style: italic;
  color: #333;
  margin-bottom: 0.5rem;
`;

const VerseReference = styled.p`
  color: #666;
  text-align: right;
  font-size: 0.9rem;
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
  const getDailyVerse = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const verseIndex = dayOfYear % dailyVerses.length;
    return dailyVerses[verseIndex];
  };

  const dailyVerse = getDailyVerse();

  return (
    <AboutContainer>
      <Title>📖 성경 검색 사이트 소개</Title>
      
      <Section>
        <SubTitle>📚 성경 버전</SubTitle>
        <Paragraph>
          본 사이트는 개역개정 성경을 기본으로 제공합니다. 
          성경 말씀을 정확하고 이해하기 쉽게 전달하는 것을 목표로 합니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>🔍 주요 기능</SubTitle>
        <FeatureList>
          <FeatureItem>성경 구절 빠른 검색</FeatureItem>
          <FeatureItem>북마크 기능으로 중요 구절 저장</FeatureItem>
          <FeatureItem>성경 퀴즈로 말씀 학습</FeatureItem>
          <FeatureItem>다크 모드 지원</FeatureItem>
          <FeatureItem>글자 크기 조절 기능</FeatureItem>
        </FeatureList>
      </Section>

      <DailyVerse>
        <SubTitle>📌 오늘의 말씀</SubTitle>
        <VerseText>
          "{dailyVerse.text}"
        </VerseText>
        <VerseReference>{dailyVerse.reference} ({dailyVerse.translation})</VerseReference>
      </DailyVerse>

      <Section>
        <SubTitle>💡 서비스 제작 의도</SubTitle>
        <Paragraph>
          이 웹사이트는 성경 말씀을 더 쉽고 편리하게 접할 수 있도록 만들었습니다.
          디지털 시대에 맞춰 성경 말씀을 더 많은 분들과 나누고자 하는 마음으로 시작되었습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>👨‍💻 개발자 소개</SubTitle>
        <Paragraph>
          안녕하세요, 이 웹사이트의 개발자입니다.
          성경 말씀을 사랑하고, 더 많은 분들이 말씀을 쉽게 접할 수 있도록 돕고 싶어 이 서비스를 만들게 되었습니다.
          여러분의 피드백과 제안을 기다리고 있습니다.
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