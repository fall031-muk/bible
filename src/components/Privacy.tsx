import React from 'react';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
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

const Privacy: React.FC = () => {
  return (
    <PrivacyContainer>
      <Title>개인정보 처리방침</Title>
      
      <Section>
        <SubTitle>1. 수집하는 개인정보</SubTitle>
        <Paragraph>
          본 웹사이트는 서비스 제공을 위해 다음과 같은 최소한의 개인정보를 수집합니다:
          - 방문 기록 (쿠키)
          - 북마크 정보 (로컬 스토리지)
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>2. 개인정보의 수집 및 이용목적</SubTitle>
        <Paragraph>
          - 서비스 이용 기록 분석
          - 북마크 기능 제공
          - 서비스 개선 및 사용자 경험 향상
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>3. 개인정보의 보유 및 이용기간</SubTitle>
        <Paragraph>
          수집된 개인정보는 서비스 제공 목적이 달성되면 즉시 파기됩니다.
          단, 법령에 의해 보존할 필요가 있는 경우 해당 기간 동안 보관됩니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>4. 개인정보의 제3자 제공</SubTitle>
        <Paragraph>
          본 웹사이트는 사용자의 개인정보를 제3자에게 제공하지 않습니다.
          다만, 법령에 의해 요구되는 경우는 예외로 합니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>5. 개인정보 보호책임자</SubTitle>
        <Paragraph>
          이메일: fall900802@gmail.com
        </Paragraph>
      </Section>
    </PrivacyContainer>
  );
};

export default Privacy; 