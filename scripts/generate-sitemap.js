const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readFileSync } = require('fs');
const path = require('path');

// Try to load blog posts from TS source by simple regex parsing (no TS runtime in Node)
function loadBlogPosts() {
  const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
  try {
    const source = readFileSync(blogPostsPath, 'utf8');
    const regex = /slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
    const posts = [];
    let match;
    while ((match = regex.exec(source)) !== null) {
      posts.push({ slug: match[1], date: match[2] });
    }
    return posts;
  } catch (e) {
    console.warn('Warning: Unable to read blog posts from TS. Skipping detailed blog URLs.');
    return [];
  }
}
const blogPosts = loadBlogPosts();

// 사이트의 기본 URL
const baseUrl = 'https://bible-search.netlify.app';

// 사이트맵에 포함할 URL들
const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/quiz', changefreq: 'daily', priority: 0.9 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/privacy', changefreq: 'yearly', priority: 0.5 },
  { url: '/terms', changefreq: 'yearly', priority: 0.5 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  // 블로그 상세 URL을 데이터에서 자동 생성
  ...blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: post.date,
  })),
];

// 사이트맵 스트림 생성
const stream = new SitemapStream({ hostname: baseUrl });

// URL들을 스트림에 추가
urls.forEach(url => stream.write(url));

// 스트림 종료
stream.end();

// 사이트맵 생성 및 저장
streamToPromise(stream).then(sm => {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  createWriteStream(sitemapPath).write(sm.toString());
  console.log('Sitemap generated successfully!');
}).catch(console.error); 