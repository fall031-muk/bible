const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// 사이트의 기본 URL
const baseUrl = 'https://bible-search.netlify.app';

// 사이트맵에 포함할 URL들
const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/search', changefreq: 'daily', priority: 0.9 },
  { url: '/quiz', changefreq: 'daily', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.5 },
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