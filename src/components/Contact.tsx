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
          Bible Muk 서비스에 대한 모든 문의사항을 환영합니다. 
          서비스 이용 중 불편사항이나 개선사항, 기능 제안 등이 있으시다면 언제든지 연락해 주세요.
          모든 문의사항에 대해 신속하고 정확한 답변을 드리도록 노력하겠습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>주요 문의 유형</SubTitle>
        <Paragraph>
          다음과 같은 문의사항들을 받고 있습니다:
        </Paragraph>
        <Paragraph>
          <strong>기술적 문의:</strong><br/>
          - 웹사이트 이용 중 발생하는 오류<br/>
          - 브라우저 호환성 문제<br/>
          - 모바일 기기에서의 사용 문제<br/>
          - 북마크나 설정 저장 문제
        </Paragraph>
        <Paragraph>
          <strong>기능 관련 문의:</strong><br/>
          - 새로운 기능 제안<br/>
          - 기존 기능 개선 요청<br/>
          - 사용법 안내<br/>
          - 성경 번역본 추가 요청
        </Paragraph>
        <Paragraph>
          <strong>콘텐츠 관련 문의:</strong><br/>
          - 성경 텍스트 오류 신고<br/>
          - 퀴즈 문제 오류 신고<br/>
          - 새로운 퀴즈 제안<br/>
          - 콘텐츠 업데이트 요청
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>문의 시 유의사항</SubTitle>
        <Paragraph>
          더 빠르고 정확한 답변을 위해 다음 사항을 포함해 주시면 도움이 됩니다:
        </Paragraph>
        <Paragraph>
          - 사용 중인 브라우저 및 버전<br/>
          - 사용 중인 기기 (PC, 모바일, 태블릿)<br/>
          - 문제 발생 시 상황 설명<br/>
          - 오류 메시지 (있는 경우)<br/>
          - 스크린샷 (필요한 경우)
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>협력 및 파트너십</SubTitle>
        <Paragraph>
          Bible Muk은 성경 말씀 전파를 위한 다양한 협력을 환영합니다:
        </Paragraph>
        <Paragraph>
          - 교회 및 선교 단체와의 협력<br/>
          - 성경 교육 기관과의 파트너십<br/>
          - 기독교 콘텐츠 제공 업체와의 협업<br/>
          - 번역 및 현지화 협력
        </Paragraph>
      </Section>

      <ContactInfo>
        <SubTitle>연락처 정보</SubTitle>
        <ContactItem>
          <Label>이메일:</Label>
          <span>fall900802@gmail.com</span>
        </ContactItem>
        <ContactItem>
          <Label>응답 시간:</Label>
          <span>영업일 기준 24-48시간 이내</span>
        </ContactItem>
        <ContactItem>
          <Label>언어:</Label>
          <span>한국어, 영어</span>
        </ContactItem>
      </ContactInfo>

      <Section>
        <SubTitle>자주 묻는 질문 (FAQ)</SubTitle>
        <Paragraph>
          <strong>Q: 서비스 이용료가 있나요?</strong><br/>
          A: Bible Muk은 완전 무료 서비스입니다. 모든 기능을 제한 없이 이용할 수 있습니다.
        </Paragraph>
        <Paragraph>
          <strong>Q: 오프라인에서도 사용할 수 있나요?</strong><br/>
          A: 현재는 온라인에서만 이용 가능하지만, 향후 오프라인 모드를 추가할 예정입니다.
        </Paragraph>
        <Paragraph>
          <strong>Q: 다른 성경 번역본도 추가될 예정인가요?</strong><br/>
          A: 네, 개역한글, NIV, ESV 등 다양한 번역본 추가를 계획하고 있습니다.
        </Paragraph>
        <Paragraph>
          <strong>Q: 모바일 앱은 언제 출시되나요?</strong><br/>
          A: 현재 PWA(Progressive Web App) 형태로 제공되며, 네이티브 앱 출시도 검토 중입니다.
        </Paragraph>
      </Section>
    </ContactContainer>
  );
};

export default Contact; 