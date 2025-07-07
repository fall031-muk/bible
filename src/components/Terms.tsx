import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  border-bottom: 3px solid #1976d2;
  padding-bottom: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #444;
  border-left: 4px solid #1976d2;
  padding-left: 1rem;
`;

const SubSubTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #555;
  font-weight: 600;
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 1.1rem;
`;

const List = styled.ul`
  margin-left: 2rem;
  margin-bottom: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: #666;
`;

const HighlightBox = styled.div`
  background-color: #e3f2fd;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
  margin: 1.5rem 0;
`;

const UpdateDate = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #666;
  font-style: italic;
`;

const Terms: React.FC = () => {
  return (
    <TermsContainer>
      <Title>📋 이용약관</Title>
      
      <Section>
        <SubTitle>제1조 (목적)</SubTitle>
        <Paragraph>
          이 약관은 Bible Muk(이하 "사이트")에서 제공하는 성경 검색 및 관련 서비스(이하 "서비스")의 이용과 관련하여 
          사이트와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </Paragraph>
        <Paragraph>
          본 서비스는 성경 말씀을 더 쉽고 편리하게 접할 수 있도록 돕는 것을 주요 목적으로 하며, 
          모든 이용자에게 무료로 제공됩니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>제2조 (정의)</SubTitle>
        <Paragraph>이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</Paragraph>
        <List>
          <ListItem><strong>"사이트"</strong>라 함은 Bible Muk 웹사이트(https://bible-search.netlify.app)를 말합니다.</ListItem>
          <ListItem><strong>"서비스"</strong>라 함은 사이트에서 제공하는 성경 검색, 성경 퀴즈, 북마크 등의 모든 서비스를 말합니다.</ListItem>
          <ListItem><strong>"이용자"</strong>라 함은 사이트에 접속하여 서비스를 이용하는 모든 개인을 말합니다.</ListItem>
          <ListItem><strong>"콘텐츠"</strong>라 함은 사이트에서 제공하는 성경 구절, 퀴즈, 기타 텍스트, 이미지 등을 말합니다.</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>제3조 (약관의 효력 및 변경)</SubTitle>
        <SubSubTitle>1. 약관의 효력</SubSubTitle>
        <Paragraph>
          이 약관은 사이트에 게시함으로써 효력이 발생하며, 이용자가 서비스를 이용함으로써 약관에 동의한 것으로 간주됩니다.
        </Paragraph>
        
        <SubSubTitle>2. 약관의 변경</SubSubTitle>
        <Paragraph>
          사이트는 필요에 따라 이 약관을 변경할 수 있으며, 변경된 약관은 사이트에 공지함으로써 효력이 발생합니다. 
          이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>제4조 (서비스의 제공 및 변경)</SubTitle>
        <SubSubTitle>1. 서비스의 내용</SubSubTitle>
        <Paragraph>사이트에서 제공하는 주요 서비스는 다음과 같습니다:</Paragraph>
        <List>
          <ListItem>성경 구절 검색 서비스</ListItem>
          <ListItem>성경 퀴즈 서비스</ListItem>
          <ListItem>북마크 및 하이라이트 기능</ListItem>
          <ListItem>음성 읽기 기능</ListItem>
          <ListItem>다크 모드 및 글자 크기 조절 기능</ListItem>
          <ListItem>기타 성경 학습을 위한 부가 서비스</ListItem>
        </List>
        
        <SubSubTitle>2. 서비스의 변경 및 중단</SubSubTitle>
        <Paragraph>
          사이트는 서비스의 개선, 기술적 문제, 기타 운영상의 필요에 의해 서비스의 전부 또는 일부를 변경하거나 
          일시적으로 중단할 수 있습니다. 이 경우 사전에 공지하도록 노력하겠습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>제5조 (이용자의 의무)</SubTitle>
        <Paragraph>이용자는 다음 행위를 하여서는 안 됩니다:</Paragraph>
        <List>
          <ListItem>서비스를 이용하여 불법적인 목적을 달성하거나 다른 이용자에게 피해를 주는 행위</ListItem>
          <ListItem>사이트의 서버나 네트워크를 방해하거나 손상시키는 행위</ListItem>
          <ListItem>사이트의 콘텐츠를 무단으로 복제, 배포, 상업적으로 이용하는 행위</ListItem>
          <ListItem>타인의 개인정보를 수집, 저장, 공개하는 행위</ListItem>
          <ListItem>사이트의 운영을 방해하거나 다른 이용자의 서비스 이용을 방해하는 행위</ListItem>
        </List>
        
        <HighlightBox>
          <Paragraph style={{ margin: 0, color: '#1976d2', fontWeight: 'bold' }}>
            💡 이용자는 서비스를 선량한 목적으로 이용하고, 성경 말씀의 본래 의미를 존중하여야 합니다.
          </Paragraph>
        </HighlightBox>
      </Section>

      <Section>
        <SubTitle>제6조 (저작권 및 지적재산권)</SubTitle>
        <SubSubTitle>1. 성경 텍스트</SubSubTitle>
        <Paragraph>
          사이트에서 제공하는 성경 텍스트는 개역개정 성경을 기반으로 하며, 
          해당 저작권은 대한성서공회에 있습니다. 이용자는 개인적인 학습 목적으로만 사용할 수 있습니다.
        </Paragraph>
        
        <SubSubTitle>2. 사이트 콘텐츠</SubSubTitle>
        <Paragraph>
          사이트에서 제공하는 퀴즈, 인터페이스, 기타 독창적인 콘텐츠의 저작권은 사이트 운영자에게 있습니다.
        </Paragraph>
        
        <SubSubTitle>3. 이용자 생성 콘텐츠</SubSubTitle>
        <Paragraph>
          이용자가 생성한 북마크, 노트 등의 개인 데이터는 이용자 본인에게 소유권이 있으며, 
          사이트는 이를 서비스 제공 목적으로만 사용합니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>제7조 (개인정보 보호)</SubTitle>
        <Paragraph>
          사이트는 이용자의 개인정보를 보호하기 위해 최선을 다하며, 
          개인정보의 수집, 이용, 관리에 관한 사항은 별도의 개인정보처리방침에 따릅니다.
        </Paragraph>
        <Paragraph>
          이용자의 북마크, 검색 기록 등의 개인 데이터는 브라우저의 로컬 스토리지에 저장되며, 
          서버로 전송되지 않습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>제8조 (면책조항)</SubTitle>
        <SubSubTitle>1. 서비스 이용에 따른 책임</SubSubTitle>
        <Paragraph>
          사이트는 천재지변, 기술적 장애, 기타 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
        </Paragraph>
        
        <SubSubTitle>2. 콘텐츠의 정확성</SubSubTitle>
        <Paragraph>
          사이트는 제공되는 성경 텍스트의 정확성을 위해 노력하지만, 
          번역상의 차이나 기술적 오류가 있을 수 있으므로 중요한 연구나 인용 시에는 
          공식 성경을 참조하시기 바랍니다.
        </Paragraph>
        
        <SubSubTitle>3. 외부 링크</SubSubTitle>
        <Paragraph>
          사이트에서 제공하는 외부 링크나 제3자 서비스에 대해서는 해당 서비스 제공자의 정책이 적용되며, 
          사이트는 이에 대한 책임을 지지 않습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>제9조 (분쟁 해결)</SubTitle>
        <Paragraph>
          이 약관과 관련하여 발생하는 분쟁은 상호 협의를 통해 해결하도록 노력하며, 
          협의가 이루어지지 않을 경우 관련 법령에 따라 해결합니다.
        </Paragraph>
        <Paragraph>
          본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 관할 법원은 서울중앙지방법원으로 합니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>제10조 (기타)</SubTitle>
        <Paragraph>
          이 약관에서 정하지 않은 사항에 대해서는 관련 법령이나 일반적인 관례에 따릅니다.
        </Paragraph>
        <Paragraph>
          이용자는 서비스 이용 중 문의사항이 있을 경우 사이트의 문의하기 페이지를 통해 연락할 수 있습니다.
        </Paragraph>
        
        <HighlightBox>
          <Paragraph style={{ margin: 0, color: '#1976d2', fontWeight: 'bold' }}>
            📞 문의하기: fall900802@gmail.com
          </Paragraph>
        </HighlightBox>
      </Section>

      <UpdateDate>
        <strong>최종 수정일: 2024년 12월 26일</strong><br/>
        <span>본 약관은 서비스 개선을 위해 필요시 업데이트될 수 있습니다.</span>
      </UpdateDate>
    </TermsContainer>
  );
};

export default Terms; 