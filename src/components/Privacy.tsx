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
        <SubTitle>5. 개인정보 처리 위탁</SubTitle>
        <Paragraph>
          본 웹사이트는 서비스 제공을 위해 다음과 같은 업체에 개인정보 처리를 위탁하고 있습니다:
        </Paragraph>
        <Paragraph>
          - Netlify (호스팅 서비스): 웹사이트 운영 및 접속 로그 관리<br/>
          - Google Analytics (분석 서비스): 웹사이트 이용 통계 분석<br/>
          - Google AdSense (광고 서비스): 맞춤형 광고 제공
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>6. 쿠키 및 웹 비콘 사용</SubTitle>
        <Paragraph>
          본 웹사이트는 사용자 경험 개선을 위해 쿠키를 사용합니다:
        </Paragraph>
        <Paragraph>
          - 필수 쿠키: 웹사이트 기본 기능 제공<br/>
          - 기능 쿠키: 사용자 설정 저장 (글자 크기, 다크 모드 등)<br/>
          - 분석 쿠키: 웹사이트 이용 패턴 분석<br/>
          - 광고 쿠키: 개인화된 광고 제공
        </Paragraph>
        <Paragraph>
          사용자는 브라우저 설정을 통해 쿠키 사용을 제어할 수 있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>7. 개인정보 보호를 위한 기술적 조치</SubTitle>
        <Paragraph>
          본 웹사이트는 개인정보 보호를 위해 다음과 같은 기술적 조치를 취하고 있습니다:
        </Paragraph>
        <Paragraph>
          - HTTPS 암호화 통신<br/>
          - 개인정보 최소 수집 원칙<br/>
          - 로컬 스토리지 활용으로 서버 저장 최소화<br/>
          - 정기적인 보안 점검 및 업데이트
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>8. 개인정보 보호책임자</SubTitle>
        <Paragraph>
          개인정보 처리에 관한 문의사항은 아래 연락처로 문의해 주시기 바랍니다:
        </Paragraph>
        <Paragraph>
          - 개인정보 보호책임자: Bible Muk 운영자<br/>
          - 이메일: fall900802@gmail.com<br/>
          - 처리기간: 접수 후 7일 이내 답변
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>9. 개인정보 처리방침 변경</SubTitle>
        <Paragraph>
          본 개인정보 처리방침은 법령이나 서비스 변경사항에 따라 수정될 수 있습니다.
          변경 시에는 웹사이트를 통해 공지하며, 중요한 변경사항의 경우 최소 30일 전에 사전 공지합니다.
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