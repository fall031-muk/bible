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
        <SubTitle>🎯 서비스 특징</SubTitle>
        <Paragraph>
          Bible Muk은 현대적인 웹 기술을 활용하여 성경 말씀을 효과적으로 학습할 수 있는 플랫폼입니다. 
          다음과 같은 특징들이 있습니다:
        </Paragraph>
        <FeatureList>
          <FeatureItem><strong>빠른 검색 엔진:</strong> 66권의 성경 전체에서 키워드를 즉시 검색</FeatureItem>
          <FeatureItem><strong>스마트 북마크:</strong> 중요한 구절을 색상별로 분류하여 저장</FeatureItem>
          <FeatureItem><strong>인터랙티브 퀴즈:</strong> 난이도별 성경 퀴즈로 지식 향상</FeatureItem>
          <FeatureItem><strong>접근성 지원:</strong> 시각 장애인을 위한 음성 읽기 기능</FeatureItem>
          <FeatureItem><strong>반응형 디자인:</strong> 모바일, 태블릿, 데스크톱 모든 기기에서 최적화</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SubTitle>📖 성경 학습 가이드</SubTitle>
        <Paragraph>
          효과적인 성경 학습을 위한 추천 방법들을 소개합니다:
        </Paragraph>
        <FeatureList>
          <FeatureItem><strong>매일 말씀 읽기:</strong> 하루에 한 장씩 꾸준히 읽어보세요</FeatureItem>
          <FeatureItem><strong>주제별 검색:</strong> '사랑', '믿음', '소망' 등 주제어로 관련 구절 찾기</FeatureItem>
          <FeatureItem><strong>암송 구절 선택:</strong> 북마크 기능으로 암송할 구절 저장</FeatureItem>
          <FeatureItem><strong>퀴즈로 복습:</strong> 읽은 내용을 퀴즈로 확인하며 기억 강화</FeatureItem>
          <FeatureItem><strong>묵상과 기도:</strong> 읽은 말씀을 바탕으로 묵상하고 기도하기</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SubTitle>🌟 사용자 후기</SubTitle>
        <Paragraph>
          많은 분들이 Bible Muk을 통해 성경 말씀과 더 가까워지고 있습니다. 
          다음은 사용자들의 실제 후기입니다:
        </Paragraph>
        <FeatureList>
          <FeatureItem>"검색 기능이 정말 빨라서 설교 준비할 때 큰 도움이 됩니다." - 목사님</FeatureItem>
          <FeatureItem>"퀴즈 기능으로 아이들과 함께 재미있게 성경 공부해요." - 학부모</FeatureItem>
          <FeatureItem>"북마크 기능으로 은혜받은 구절들을 쉽게 관리할 수 있어 좋아요." - 청년</FeatureItem>
          <FeatureItem>"모바일에서도 편리하게 사용할 수 있어서 언제 어디서든 말씀을 읽어요." - 직장인</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SubTitle>🔧 기술 스택</SubTitle>
        <Paragraph>
          Bible Muk은 최신 웹 기술을 활용하여 안정적이고 빠른 서비스를 제공합니다:
        </Paragraph>
        <FeatureList>
          <FeatureItem><strong>프론트엔드:</strong> React 18, TypeScript, Material-UI</FeatureItem>
          <FeatureItem><strong>상태관리:</strong> Context API, Local Storage</FeatureItem>
          <FeatureItem><strong>스타일링:</strong> Styled Components, Responsive Design</FeatureItem>
          <FeatureItem><strong>배포:</strong> Netlify, PWA 지원</FeatureItem>
          <FeatureItem><strong>SEO:</strong> 구조화된 데이터, 사이트맵, 메타 태그 최적화</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SubTitle>🚀 향후 계획</SubTitle>
        <Paragraph>
          Bible Muk은 지속적으로 발전하고 있습니다. 앞으로 추가될 기능들을 소개합니다:
        </Paragraph>
        <FeatureList>
          <FeatureItem><strong>다국어 지원:</strong> 영어, 중국어 등 다양한 언어 성경 제공</FeatureItem>
          <FeatureItem><strong>성경 번역본 추가:</strong> 개역한글, NIV, ESV 등 다양한 번역본</FeatureItem>
          <FeatureItem><strong>커뮤니티 기능:</strong> 사용자 간 말씀 나눔과 기도 요청</FeatureItem>
          <FeatureItem><strong>개인 맞춤형 추천:</strong> AI 기반 개인별 말씀 추천</FeatureItem>
          <FeatureItem><strong>오프라인 모드:</strong> 인터넷 연결 없이도 사용 가능</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SubTitle>👨‍💻 개발자 소개</SubTitle>
        <Paragraph>
          안녕하세요, Bible Muk의 개발자입니다. 
          성경 말씀을 사랑하고, 더 많은 분들이 말씀을 쉽게 접할 수 있도록 돕고 싶어 이 서비스를 만들게 되었습니다.
        </Paragraph>
        <Paragraph>
          10년 이상의 웹 개발 경험을 바탕으로, 사용자 중심의 직관적인 인터페이스와 
          안정적인 성능을 제공하기 위해 노력하고 있습니다. 
          여러분의 소중한 피드백과 제안을 언제든지 환영합니다.
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