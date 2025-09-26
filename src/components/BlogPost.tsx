import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Meta = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const Content = styled.article`
  line-height: 1.8;
  color: #555;
  font-size: 1.05rem;
  
  h3 {
    color: #1976d2;
    margin: 1.5rem 0 1rem 0;
  }
  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
`;

const Back = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  color: #1976d2;
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <Container>
        <Title>글을 찾을 수 없습니다</Title>
        <p>요청하신 블로그 글이 존재하지 않습니다.</p>
        <Back to="/blog">← 블로그 목록으로</Back>
      </Container>
    );
  }

  const description = post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150);
  const ogImage = post.ogImage ? `https://bible-search.netlify.app${post.ogImage}` : 'https://bible-search.netlify.app/logo512.png';
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '블로그',
        item: 'https://bible-search.netlify.app/blog',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.title,
        item: `https://bible-search.netlify.app/blog/${post.slug}`,
      },
    ],
  } as const;
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    image: [ogImage],
    mainEntityOfPage: `https://bible-search.netlify.app/blog/${post.slug}`,
  } as const;

  return (
    <Container>
      <Helmet>
        <title>{post.title} - Bible Muk</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${post.title} - Bible Muk`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={`https://bible-search.netlify.app/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>

      <Title>{post.title}</Title>
      <Meta>
        <span>{post.category}</span>
        <span>{post.date}</span>
        <span>by {post.author}</span>
      </Meta>

      <Content dangerouslySetInnerHTML={{ __html: post.content }} />

      <Back to="/blog">← 블로그 목록으로</Back>
    </Container>
  );
};

export default BlogPost;


