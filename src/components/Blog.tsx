import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';

const BlogContainer = styled.div`
  max-width: 1000px;
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled.article`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.15);
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1976d2;
  border-left: 4px solid #1976d2;
  padding-left: 1rem;
`;

const BlogMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
`;

const BlogContent = styled.div`
  line-height: 1.8;
  color: #555;
  
  p {
    margin-bottom: 1rem;
  }
  
  strong {
    color: #333;
  }
`;

const CategoryTag = styled.span`
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ReadMore = styled.button`
  color: #1976d2;
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  padding: 2rem;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: #1976d2;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
`;

const ModalBody = styled.div`
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  strong {
    color: #333;
    font-weight: 600;
  }
  
  h3 {
    color: #1976d2;
    margin: 2rem 0 1rem 0;
    font-size: 1.4rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.8rem;
  }
`;

const IntroSection = styled.section`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  text-align: center;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
`;

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleReadMore = (post: any) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  const blogPosts = [
    {
      id: 1,
      title: "성경 읽기의 7가지 효과적인 방법",
      category: "성경 학습",
      date: "2025-07-08",
      author: "Bible Muk",
      content: `
        성경을 효과적으로 읽는 것은 단순히 글자를 읽는 것 이상의 의미가 있습니다. 
        하나님의 말씀을 깊이 이해하고 삶에 적용하기 위한 실용적인 방법들을 소개합니다.
        
        <h3>1. 정기적인 시간 정하기</h3>
        <p>매일 같은 시간에 성경을 읽는 습관을 만들면 영적 성장에 큰 도움이 됩니다. 
        아침 시간을 활용하면 하루를 말씀으로 시작할 수 있고, 저녁 시간에는 하루를 
        돌아보며 말씀을 묵상할 수 있습니다.</p>
        
        <h3>2. 기도로 시작하기</h3>
        <p>성령님의 도우심을 구하며 말씀을 읽으면 더 깊은 깨달음을 얻을 수 있습니다. 
        "주님, 오늘 말씀을 통해 제게 말씀해 주세요"라는 간단한 기도로 시작해보세요.</p>
        
        <h3>3. 묵상의 시간 갖기</h3>
        <p>읽은 말씀을 마음에 새기고 삶에 어떻게 적용할지 생각해보는 시간이 필요합니다. 
        특별히 마음에 와닿는 구절이 있다면 그 구절을 반복해서 읽어보세요.</p>
        
        <h3>4. 노트 작성하기</h3>
        <p>은혜받은 구절이나 깨달은 점을 기록하면 나중에 다시 보며 은혜를 받을 수 있습니다. 
        Bible Muk의 북마크 기능을 활용하여 중요한 구절들을 저장해보세요.</p>
        
        <h3>5. 다양한 번역본 비교하기</h3>
        <p>같은 구절을 다른 번역본으로 읽어보면 새로운 의미를 발견할 수 있습니다. 
        개역개정, 개역한글, 새번역 등을 비교해보세요.</p>
        
        <h3>6. 성경 연구 도구 활용하기</h3>
        <p>주석서, 성경 사전, 지도 등을 활용하면 더 깊이 있는 성경 공부가 가능합니다. 
        온라인 자료들도 많이 있으니 적극 활용해보세요.</p>
        
        <h3>7. 실생활 적용하기</h3>
        <p>읽은 말씀을 실제 생활에 어떻게 적용할지 구체적으로 생각해보고 실천해보세요. 
        작은 것부터 시작하여 점차 확대해나가는 것이 좋습니다.</p>
      `
    },
    {
      id: 2,
      title: "구약성경 66권 완독 가이드",
      category: "성경 읽기",
      date: "2025-07-08",
      author: "Bible Muk",
             content: `
         구약성경 39권을 체계적으로 읽기 위한 가이드를 제공합니다. 
         각 책의 특징과 핵심 메시지를 이해하면 더 의미 있는 성경 읽기가 가능합니다.
         
         <h3>모세오경 (창세기-신명기)</h3>
         <p><strong>창세기:</strong> 하나님의 창조와 인류의 시작, 아브라함부터 요셉까지의 족장 이야기</p>
         <p><strong>출애굽기:</strong> 이스라엘 백성의 이집트 탈출과 십계명, 성막 건설</p>
         <p><strong>레위기:</strong> 제사법과 정결법, 거룩한 삶의 규례</p>
         <p><strong>민수기:</strong> 광야 40년의 여정과 인구 조사</p>
         <p><strong>신명기:</strong> 모세의 고별 설교와 율법 재확인</p>
         
         <h3>역사서 (여호수아-에스더)</h3>
         <p><strong>여호수아:</strong> 가나안 정착과 땅 분배</p>
         <p><strong>사사기:</strong> 사사들의 활약과 이스라엘의 타락</p>
         <p><strong>룻기:</strong> 이방 여인 룻의 아름다운 신앙</p>
         <p><strong>사무엘서:</strong> 사무엘, 사울, 다윗의 이야기</p>
         <p><strong>열왕기서:</strong> 솔로몬부터 바벨론 포로까지</p>
         <p><strong>역대기:</strong> 다윗 왕조 중심의 역사 재조명</p>
         <p><strong>에스라-느헤미야:</strong> 포로 귀환과 성전 재건</p>
         <p><strong>에스더:</strong> 페르시아에서 유대인을 구한 에스더 왕후</p>
         
         <h3>시가서 (욥기-아가)</h3>
         <p><strong>욥기:</strong> 고난의 의미와 하나님의 주권</p>
         <p><strong>시편:</strong> 다양한 상황에서의 찬양과 기도</p>
         <p><strong>잠언:</strong> 실생활의 지혜와 교훈</p>
         <p><strong>전도서:</strong> 인생의 허무와 참된 의미</p>
         <p><strong>아가:</strong> 사랑의 아름다움을 노래한 시</p>
         
         <h3>예언서 (이사야-말라기)</h3>
         <p><strong>대예언서:</strong> 이사야, 예레미야, 에스겔, 다니엘</p>
         <p><strong>소예언서:</strong> 호세아부터 말라기까지 12권</p>
         <p>예언서는 하나님의 심판과 구원, 메시아 예언을 담고 있습니다.</p>
       `
    },
    {
      id: 3,
      title: "신약성경 27권 핵심 정리",
      category: "성경 학습",
      date: "2025-07-08",
      author: "Bible Muk",
      content: `
        신약성경 27권의 핵심 내용을 정리하여 전체적인 흐름을 파악할 수 있도록 돕습니다. 
        예수 그리스도의 생애와 초대 교회의 역사를 중심으로 이해해보세요.
        
        복음서(마태, 마가, 누가, 요한)는 예수님의 생애와 가르침을 기록합니다. 
        각 복음서는 서로 다른 관점에서 예수님을 소개하며, 마태복음은 유대인을 위한 
        메시아로, 마가복음은 고난받는 종으로 묘사합니다.
        
        사도행전은 초대 교회의 시작과 복음 전파의 역사를 다룹니다. 
        바울서신(로마서-빌레몬서)은 교회와 개인에게 보낸 편지들로 
        기독교 교리의 기초를 제공합니다. 일반서신과 요한계시록은 
        말세와 천국에 대한 소망을 전합니다.
      `
    },
    {
      id: 4,
      title: "성경 암송의 놀라운 효과",
      category: "영성 생활",
      date: "2025-07-08",
      author: "Bible Muk",
             content: `
         성경 암송은 단순히 구절을 외우는 것을 넘어 영적 성장과 삶의 변화를 가져옵니다. 
         과학적 연구에 따르면 암송은 뇌 기능 향상과 스트레스 감소에도 도움이 됩니다.
         
         <h3>1. 유혹을 이기는 힘</h3>
         <p>예수님도 광야에서 사탄의 유혹을 받으실 때 성경 말씀으로 대답하셨습니다. 
         "사람이 떡으로만 살 것이 아니요 하나님의 입으로부터 나오는 모든 말씀으로 살 것이라" 
         (마태복음 4:4) 이처럼 암송한 말씀은 유혹의 순간에 강력한 무기가 됩니다.</p>
         
         <h3>2. 평안과 위로</h3>
         <p>어려운 상황에서 암송한 말씀이 위로와 힘이 됩니다. "여호와는 나의 목자시니 
         내게 부족함이 없으리로다" (시편 23:1) 같은 구절들은 고난 중에 큰 위로가 됩니다.</p>
         
         <h3>3. 기도 생활의 풍성함</h3>
         <p>암송한 말씀을 바탕으로 기도하면 더 깊이 있는 기도를 할 수 있습니다. 
         말씀이 기도의 내용이 되고, 하나님의 뜻을 구하는 기도가 가능해집니다.</p>
         
         <h3>4. 전도와 상담의 도구</h3>
         <p>적절한 말씀을 인용하여 다른 사람들에게 도움을 줄 수 있습니다. 
         복음을 전할 때나 상담할 때 필요한 말씀을 즉시 떠올릴 수 있습니다.</p>
         
         <h3>5. 효과적인 암송 방법</h3>
         <ul>
           <li>짧은 구절부터 시작하기</li>
           <li>매일 조금씩 반복하기</li>
           <li>의미를 이해하며 외우기</li>
           <li>생활 속에서 적용해보기</li>
           <li>다른 사람과 함께 암송하기</li>
         </ul>
         
         <h3>추천 암송 구절</h3>
         <p><strong>초보자용:</strong> 요한복음 3:16, 로마서 8:28, 빌립보서 4:13</p>
         <p><strong>중급자용:</strong> 시편 23편, 이사야 40:31, 고린도전서 13장</p>
         <p><strong>고급자용:</strong> 로마서 8장, 히브리서 11장, 시편 119편</p>
       `
    },
    {
      id: 5,
      title: "성경 퀴즈로 배우는 성경 지식",
      category: "성경 학습",
      date: "2025-07-08",
      author: "Bible Muk",
      content: `
        성경 퀴즈는 재미있게 성경 지식을 늘릴 수 있는 효과적인 방법입니다. 
        Bible Muk의 퀴즈 기능을 활용하여 체계적으로 성경을 학습해보세요.
        
        퀴즈 학습의 장점은 여러 가지입니다. 첫째, 능동적 학습이 가능합니다. 
        단순히 읽기만 하는 것보다 문제를 풀면서 더 깊이 생각하게 됩니다. 
        둘째, 기억력 향상에 도움이 됩니다. 반복 학습을 통해 장기 기억에 저장됩니다.
        
        셋째, 부족한 부분을 파악할 수 있습니다. 틀린 문제를 통해 더 공부해야 할 
        영역을 알 수 있습니다. 넷째, 성취감을 느낄 수 있습니다. 
        점수 향상을 통해 학습 동기를 유지할 수 있습니다.
      `
    },
    {
      id: 6,
      title: "기도와 말씀 묵상의 조화",
      category: "영성 생활",
      date: "2025-07-08",
      author: "Bible Muk",
      content: `
        기도와 말씀 묵상은 영적 성장의 두 날개와 같습니다. 
        이 둘을 조화롭게 실천하면 더 깊은 하나님과의 관계를 경험할 수 있습니다.
        
        말씀 묵상 후 기도하기: 읽은 말씀을 바탕으로 기도하면 하나님의 마음을 
        더 잘 이해할 수 있습니다. 말씀 속에서 발견한 하나님의 성품과 뜻을 
        기도로 고백하고 감사하세요.
        
        기도 후 말씀 읽기: 기도로 마음을 준비한 후 말씀을 읽으면 
        더 선명하게 하나님의 음성을 들을 수 있습니다. 성령님의 도우심을 
        구한 후 말씀을 읽어보세요. 렉시오 디비나(Lectio Divina) 방법을 
        활용하여 말씀을 반복해서 읽고 묵상하는 것도 좋습니다.
      `
    },
    {
      id: 7,
      title: "성경 인물들에게서 배우는 신앙",
      category: "성경 인물",
      date: "2025-07-08",
      author: "Bible Muk",
      content: `
        성경에 등장하는 인물들의 삶을 통해 우리가 배울 수 있는 신앙의 교훈들을 
        살펴보겠습니다. 그들의 성공과 실패를 통해 지혜를 얻을 수 있습니다.
        
        아브라함의 믿음: 하나님의 부르심에 순종하여 고향을 떠난 아브라함은 
        믿음의 조상이 되었습니다. 그의 순종과 믿음은 오늘날 우리에게도 
        큰 교훈을 줍니다. 다윗의 회개: 밧세바 사건 후 다윗이 보여준 
        진정한 회개는 시편 51편에 잘 나타나 있습니다.
        
        요셉의 용서: 형들에게 팔려간 요셉이 나중에 그들을 용서하는 모습은 
        용서의 아름다움을 보여줍니다. 에스더의 용기: 민족을 구하기 위해 
        목숨을 걸고 왕 앞에 나아간 에스더의 용기는 우리에게 영감을 줍니다.
      `
    },
    {
      id: 8,
      title: "성경의 예언과 성취",
      category: "성경 연구",
      date: "2025-07-08",
      author: "Bible Muk",
      content: `
        성경에는 수많은 예언들이 기록되어 있으며, 그 중 많은 것들이 
        정확히 성취되었습니다. 이는 성경의 신빙성과 하나님의 주권을 보여줍니다.
        
        메시아에 대한 예언: 구약성경에는 메시아에 대한 300여 개의 예언이 있으며, 
        예수님께서 이 모든 예언을 성취하셨습니다. 이사야 53장의 고난받는 종에 대한 
        예언, 미가 5:2의 베들레헴 출생 예언 등이 대표적입니다.
        
        이스라엘 회복에 대한 예언: 에스겔 37장의 마른 뼈 환상은 
        이스라엘의 회복을 예언했으며, 1948년 이스라엘 독립으로 성취되었습니다. 
        예루살렘 회복에 대한 예언들도 1967년 6일 전쟁을 통해 성취되었습니다.
      `
    }
  ];

  return (
    <BlogContainer>
      <Helmet>
        <title>성경 학습 블로그 - Bible Muk | 8개의 전문 성경 학습 가이드</title>
        <meta name="description" content="성경을 더 깊이 이해하고 삶에 적용할 수 있는 8개의 전문 블로그 포스트를 제공합니다. 성경 읽기 방법, 구약신약 가이드, 성경 암송 효과, 성경 인물 연구, 예언과 성취 등 풍부한 성경 학습 콘텐츠로 영적 성장을 돕습니다." />
        <meta name="keywords" content="성경 학습 블로그, 성경 읽기 방법, 구약성경 가이드, 신약성경 정리, 성경 암송, 성경 퀴즈, 성경 인물, 성경 예언, 기도와 묵상, 영성 생활" />
        <meta property="og:title" content="성경 학습 블로그 - Bible Muk | 8개의 전문 성경 학습 가이드" />
        <meta property="og:description" content="성경을 더 깊이 이해하고 삶에 적용할 수 있는 8개의 전문 블로그 포스트를 제공합니다. 성경 읽기 방법, 구약신약 가이드, 성경 암송 효과 등 풍부한 학습 콘텐츠로 영적 성장을 돕습니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bible-search.netlify.app/blog" />
        <link rel="canonical" href="https://bible-search.netlify.app/blog" />
      </Helmet>
      
      <Title>📚 성경 학습 블로그</Title>
      
      <IntroSection>
        <IntroText>
          성경을 더 깊이 이해하고 삶에 적용할 수 있도록 돕는 다양한 글들을 제공합니다.
        </IntroText>
        <IntroText>
          매주 새로운 주제의 글이 업데이트되며, 성경 학습과 영성 생활에 도움이 되는 
          실용적인 정보들을 나누고 있습니다.
        </IntroText>
      </IntroSection>

      <BlogGrid>
        {blogPosts.map((post, index) => (
          <React.Fragment key={post.id}>
            <BlogCard>
              <BlogMeta>
                <CategoryTag>{post.category}</CategoryTag>
                <span>{post.date}</span>
                <span>by {post.author}</span>
              </BlogMeta>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogContent>
                <p>{post.content.substring(0, 200)}...</p>
                <ReadMore onClick={() => handleReadMore(post)}>
                  더 읽기 →
                </ReadMore>
              </BlogContent>
            </BlogCard>
          </React.Fragment>
        ))}
      </BlogGrid>

      {/* 모달 */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="blog-modal-title"
        aria-describedby="blog-modal-content"
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle id="blog-modal-title">
              {selectedPost?.title}
            </ModalTitle>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          
          <BlogMeta style={{ marginBottom: '1.5rem' }}>
            <CategoryTag>{selectedPost?.category}</CategoryTag>
            <span>{selectedPost?.date}</span>
            <span>by {selectedPost?.author}</span>
          </BlogMeta>
          
          <ModalBody 
            id="blog-modal-content"
            dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }}
          />
        </ModalContent>
      </Modal>
    </BlogContainer>
  );
};

export default Blog; 