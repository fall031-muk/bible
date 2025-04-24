import React, { useState, createContext, useCallback, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteMode, Tabs, Tab, Box } from '@mui/material';
import { BibleSearch } from './components/BibleSearch';
import { BibleQuiz } from './components/BibleQuiz';
import About from './components/About';
import SearchIcon from '@mui/icons-material/Search';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
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

// 탭 인터페이스 컴포넌트
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bible-tabpanel-${index}`}
      aria-labelledby={`bible-tab-${index}`}
      style={{ width: '100%', height: '100%' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: '100%', height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// 접근성을 위한 속성 생성 함수
function a11yProps(index: number) {
  return {
    id: `bible-tab-${index}`,
    'aria-controls': `bible-tabpanel-${index}`,
  };
}

function App() {
  const [fontSize, setFontSize] = useState(16); // 기본 글자 크기 16px
  const [mode, setMode] = useState<PaletteMode>('light'); // 기본 라이트 모드
  const [bookmarks, setBookmarks] = useState<BookmarksCollection>({});
  const [tabValue, setTabValue] = useState(0); // 현재 선택된 탭

  // 탭 변경 핸들러
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
    <ColorModeContext.Provider
      value={{
        mode,
        toggleColorMode
      }}
    >
      <FontSizeContext.Provider 
        value={{ 
          fontSize, 
          increaseFontSize, 
          decreaseFontSize, 
          resetFontSize 
        }}
      >
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
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="bible tabs">
                  <Tab icon={<SearchIcon />} label="성경 검색" {...a11yProps(0)} />
                  <Tab icon={<QuizIcon />} label="성경 퀴즈" {...a11yProps(1)} />
                  <Tab icon={<InfoIcon />} label="사이트 소개" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <BibleSearch />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <BibleQuiz />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <About />
              </TabPanel>
            </Box>
          </ThemeProvider>
        </BookmarkContext.Provider>
      </FontSizeContext.Provider>
    </ColorModeContext.Provider>
  );
}

export default App; 