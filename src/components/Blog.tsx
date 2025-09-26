import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

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

const ReadMore = styled(Link)`
  color: #1976d2;
  font-weight: 500;
  font-size: 1rem;
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
              <BlogTitle>
                <Link to={`/blog/${post.slug}`} style={{ color: '#1976d2' }}>{post.title}</Link>
              </BlogTitle>
              <BlogContent>
                <p>{post.content.substring(0, 200)}...</p>
                <ReadMore to={`/blog/${post.slug}`}>
                  더 읽기 →
                </ReadMore>
              </BlogContent>
            </BlogCard>
          </React.Fragment>
        ))}
      </BlogGrid>

      {/* 상세 페이지로 이동 구조로 변경되어 모달은 제거 */}
    </BlogContainer>
  );
};

export default Blog; 