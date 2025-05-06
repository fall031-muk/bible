import React, { useState, createContext, useCallback, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteMode, AppBar, Toolbar, Typography, Button, Box, Collapse } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BibleSearch } from './components/BibleSearch';
import { BibleQuiz } from './components/BibleQuiz';
import About from './components/About';
import Privacy from './components/Privacy';
import Contact from './components/Contact';
import SearchIcon from '@mui/icons-material/Search';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import MenuIcon from '@mui/icons-material/Menu';
import { BookmarkItem, BookmarksCollection } from './types/bible';

// 로컬 스토리지 키
const BOOKMARKS_KEY = 'bible-bookmarks';

// 글자 크기 컨텍스트 생성
export const FontSizeContext = createContext({
  fontSize: 16,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
});

// 다크 모드 컨텍스트 생성
export const ColorModeContext = createContext({
  mode: 'light' as PaletteMode,
  toggleColorMode: () => {},
});

// 북마크 컨텍스트 생성
interface BookmarkContextType {
  bookmarks: BookmarksCollection;
  addBookmark: (verse: BookmarkItem) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, updates: Partial<BookmarkItem>) => void;
  toggleHighlight: (verse: BookmarkItem, color?: string) => void;
  isBookmarked: (reference: string) => boolean;
  getBookmarkById: (id: string) => BookmarkItem | undefined;
  getBookmarkByReference: (reference: string) => BookmarkItem | undefined;
}

export const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: {},
  addBookmark: () => {},
  removeBookmark: () => {},
  updateBookmark: () => {},
  toggleHighlight: () => {},
  isBookmarked: () => false,
  getBookmarkById: () => undefined,
  getBookmarkByReference: () => undefined,
});

function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = React.useContext(FontSizeContext);
  
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flexGrow: 1,
          gap: 1
        }}>
          <Typography variant="h6" component="div">
            Bible Muk
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 0.5
          }}>
            <Button
              onClick={decreaseFontSize}
              size="small"
              sx={{ minWidth: 'auto', px: 0.5 }}
            >
              A-
            </Button>
            <Button
              onClick={resetFontSize}
              size="small"
              sx={{ minWidth: 'auto', px: 0.5 }}
            >
              A
            </Button>
            <Button
              onClick={increaseFontSize}
              size="small"
              sx={{ minWidth: 'auto', px: 0.5 }}
            >
              A+
            </Button>
          </Box>
        </Box>

        {/* 데스크톱 메뉴 */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          gap: 2 
        }}>
          <Button
            component={Link}
            to="/"
            color={location.pathname === '/' ? 'primary' : 'inherit'}
            startIcon={<SearchIcon />}
          >
            성경 검색
          </Button>
          <Button
            component={Link}
            to="/quiz"
            color={location.pathname === '/quiz' ? 'primary' : 'inherit'}
            startIcon={<QuizIcon />}
          >
            성경 퀴즈
          </Button>
          <Button
            component={Link}
            to="/about"
            color={location.pathname === '/about' ? 'primary' : 'inherit'}
            startIcon={<InfoIcon />}
          >
            사이트 소개
          </Button>
          <Button
            component={Link}
            to="/contact"
            color={location.pathname === '/contact' ? 'primary' : 'inherit'}
            startIcon={<ContactMailIcon />}
          >
            문의하기
          </Button>
          <Button
            component={Link}
            to="/privacy"
            color={location.pathname === '/privacy' ? 'primary' : 'inherit'}
            startIcon={<PrivacyTipIcon />}
          >
            개인정보처리방침
          </Button>
        </Box>

        {/* 모바일 메뉴 버튼 */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            startIcon={<MenuIcon />}
          >
            메뉴
          </Button>
        </Box>
      </Toolbar>

      {/* 모바일 메뉴 */}
      <Collapse in={mobileMenuOpen}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          padding: '0.5rem 1rem',
          backgroundColor: 'background.paper'
        }}>
          <Button
            component={Link}
            to="/"
            color={location.pathname === '/' ? 'primary' : 'inherit'}
            startIcon={<SearchIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', mb: 1 }}
          >
            성경 검색
          </Button>
          <Button
            component={Link}
            to="/quiz"
            color={location.pathname === '/quiz' ? 'primary' : 'inherit'}
            startIcon={<QuizIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', mb: 1 }}
          >
            성경 퀴즈
          </Button>
          <Button
            component={Link}
            to="/about"
            color={location.pathname === '/about' ? 'primary' : 'inherit'}
            startIcon={<InfoIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', mb: 1 }}
          >
            사이트 소개
          </Button>
          <Button
            component={Link}
            to="/contact"
            color={location.pathname === '/contact' ? 'primary' : 'inherit'}
            startIcon={<ContactMailIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', mb: 1 }}
          >
            문의하기
          </Button>
          <Button
            component={Link}
            to="/privacy"
            color={location.pathname === '/privacy' ? 'primary' : 'inherit'}
            startIcon={<PrivacyTipIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', mb: 1 }}
          >
            개인정보처리방침
          </Button>
        </Box>
      </Collapse>
    </AppBar>
  );
}

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [mode, setMode] = useState<PaletteMode>('light');
  const [bookmarks, setBookmarks] = useState<BookmarksCollection>({});

  // 북마크 불러오기
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('북마크를 불러오는 중 오류가 발생했습니다:', error);
    }
  }, []);

  // 북마크 저장
  const saveBookmarks = useCallback((updatedBookmarks: BookmarksCollection) => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('북마크를 저장하는 중 오류가 발생했습니다:', error);
    }
  }, []);

  // 북마크 추가
  const addBookmark = useCallback((verse: BookmarkItem) => {
    const updatedBookmarks = { ...bookmarks, [verse.id]: verse };
    saveBookmarks(updatedBookmarks);
  }, [bookmarks, saveBookmarks]);

  // 북마크 제거
  const removeBookmark = useCallback((id: string) => {
    const updatedBookmarks = { ...bookmarks };
    delete updatedBookmarks[id];
    saveBookmarks(updatedBookmarks);
  }, [bookmarks, saveBookmarks]);

  // 북마크 업데이트
  const updateBookmark = useCallback((id: string, updates: Partial<BookmarkItem>) => {
    if (!bookmarks[id]) return;
    
    const updatedBookmarks = {
      ...bookmarks,
      [id]: {
        ...bookmarks[id],
        ...updates
      }
    };
    
    saveBookmarks(updatedBookmarks);
  }, [bookmarks, saveBookmarks]);

  // 하이라이트 토글
  const toggleHighlight = useCallback((verse: BookmarkItem, color?: string) => {
    const reference = verse.reference;
    const existingBookmark = Object.values(bookmarks).find(b => b.reference === reference);
    
    if (existingBookmark) {
      // 동일한 색상으로 하이라이트 하면 제거, 다른 색상이면 업데이트
      if (existingBookmark.highlightColor === color) {
        removeBookmark(existingBookmark.id);
      } else {
        updateBookmark(existingBookmark.id, { highlightColor: color });
      }
    } else {
      // 새 북마크 추가
      addBookmark({
        ...verse,
        highlightColor: color,
        timestamp: Date.now()
      });
    }
  }, [bookmarks, addBookmark, removeBookmark, updateBookmark]);

  // 북마크 여부 확인
  const isBookmarked = useCallback((reference: string) => {
    return Object.values(bookmarks).some(bookmark => bookmark.reference === reference);
  }, [bookmarks]);

  // ID로 북마크 가져오기
  const getBookmarkById = useCallback((id: string) => {
    return bookmarks[id];
  }, [bookmarks]);

  // 참조로 북마크 가져오기
  const getBookmarkByReference = useCallback((reference: string) => {
    return Object.values(bookmarks).find(bookmark => bookmark.reference === reference);
  }, [bookmarks]);

  // 글자 크기 증가 함수
  const increaseFontSize = useCallback(() => {
    setFontSize(prevSize => Math.min(prevSize + 1, 24));
  }, []);

  // 글자 크기 감소 함수
  const decreaseFontSize = useCallback(() => {
    setFontSize(prevSize => Math.max(prevSize - 1, 12));
  }, []);

  // 글자 크기 초기화 함수
  const resetFontSize = useCallback(() => {
    setFontSize(16);
  }, []);

  // 색상 모드 토글 함수
  const toggleColorMode = useCallback(() => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  }, []);

  // 글자 크기와 색상 모드에 따라 동적으로 테마 생성
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
      },
      background: {
        default: mode === 'light' ? '#fff' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      },
    },
    typography: {
      fontSize: fontSize,
    },
  });

  return (
    <Router>
      <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize, resetFontSize }}>
          <BookmarkContext.Provider
            value={{
              bookmarks,
              addBookmark,
              removeBookmark,
              updateBookmark,
              toggleHighlight,
              isBookmarked,
              getBookmarkById,
              getBookmarkByReference,
            }}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navigation />
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <Routes>
                    <Route path="/" element={<BibleSearch />} />
                    <Route path="/quiz" element={<BibleQuiz />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                  </Routes>
                </Box>
              </Box>
            </ThemeProvider>
          </BookmarkContext.Provider>
        </FontSizeContext.Provider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App; 