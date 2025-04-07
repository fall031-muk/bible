# 성경 검색 애플리케이션

성경 텍스트를 검색할 수 있는 웹 애플리케이션입니다.

## 🌟 배포된 사이트

[성경 검색 애플리케이션 바로가기](https://bible-search-app.netlify.app)

## 📝 기능

- 성경 책, 장, 절별 검색
- 특정 단어나 구절로 검색
- 깔끔하고, 직관적인 사용자 인터페이스

## 🛠️ 기술 스택

- React
- TypeScript
- Material-UI
- Netlify 배포

## 🚀 시작하기

### 필수 요구사항

- Node.js (v14 이상)
- npm 또는 yarn

### 설치 방법

1. 저장소 클론하기:
   ```bash
   git clone <repository-url>
   cd bible
   ```

2. 의존성 패키지 설치:
   ```bash
   npm install
   ```

3. 개발 서버 실행:
   ```bash
   npm start
   ```
   이제 웹 브라우저에서 http://localhost:3000 을 열어 애플리케이션을 확인할 수 있습니다.

### 빌드

프로덕션용 빌드를 생성하려면:
```bash
npm run build
```

## 📁 프로젝트 구조

```
/bible
├── public/           # 정적 파일
├── src/              # 소스 코드
│   ├── components/   # 리액트 컴포넌트
│   ├── data/         # 성경 데이터 JSON 파일
│   └── types/        # TypeScript 타입 정의
├── netlify.toml      # Netlify 배포 설정
└── package.json      # 프로젝트 메타데이터 및 의존성
```

## 🌐 Netlify 배포

이 프로젝트는 Netlify에 자동으로 배포되도록 설정되어 있습니다.

### 배포 설정

`netlify.toml` 파일에 다음과 같은 설정이 포함되어 있습니다:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 수동 배포

1. Netlify CLI 설치:
   ```bash
   npm install -g netlify-cli
   ```

2. Netlify 로그인:
   ```bash
   netlify login
   ```

3. 배포:
   ```bash
   netlify deploy --prod
   ```

## 📚 데이터 소스

이 애플리케이션에서 사용된 성경 데이터는 `bible.json` 파일에 포함되어 있습니다.

## 🤝 기여 방법

1. 저장소 포크
2. 새 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기
