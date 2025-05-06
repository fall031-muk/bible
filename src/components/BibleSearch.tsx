import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Stack,
  useMediaQuery,
  useTheme,
  Drawer,
  Fab,
  Divider,
  Chip,
  Popover,
  ListItemButton,
  ListItemIcon,
  ClickAwayListener,
  Menu,
  Badge,
  Snackbar,
  Alert,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HistoryIcon from '@mui/icons-material/History';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import bibleData from '../data/bible.json';
import { BibleData, BibleVerse, SearchParams, BookmarkItem } from '../types/bible';
import { FontSizeContext, ColorModeContext, BookmarkContext } from '../App';
import TextToSpeechButton from './TextToSpeechButton';

// 로컬 스토리지 키
const SEARCH_HISTORY_KEY = 'bible-search-history';

// 하이라이트 색상 옵션
const HIGHLIGHT_COLORS = {
  yellow: '#ffeb3b',
  green: '#4caf50',
  blue: '#2196f3',
  red: '#f44336',
  purple: '#9c27b0',
};

// 검색 기록 타입 정의
interface SearchHistory extends SearchParams {
  id: string;
  timestamp: number;
  displayText: string;
}

const bible = bibleData as BibleData;

export const BibleSearch: React.FC = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [chapters, setChapters] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [showFontControls, setShowFontControls] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [historyAnchorEl, setHistoryAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [highlightMenuAnchorEl, setHighlightMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);
  const [bookmarkMenuAnchorEl, setBookmarkMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useContext(FontSizeContext);
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { bookmarks, addBookmark, removeBookmark, toggleHighlight, isBookmarked, getBookmarkByReference } = useContext(BookmarkContext);
  
  // 반응형 디자인을 위한 미디어 쿼리
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // 검색 기록 로드
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('검색 기록을 불러오는 중 오류가 발생했습니다:', error);
    }
  }, []);

  // 검색 기록 저장
  const saveSearchHistory = (history: SearchHistory[]) => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
      setSearchHistory(history);
    } catch (error) {
      console.error('검색 기록을 저장하는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    // 성경 책 이름 목록을 추출합니다
    const allBooks = new Set<string>();
    Object.keys(bible).forEach(reference => {
      const book = reference.split(/\d/)[0]; // 숫자가 나오기 전까지가 책 이름
      allBooks.add(book);
    });
    setBooks(Array.from(allBooks));
  }, []);

  useEffect(() => {
    if (searchParams.book) {
      // 선택한 책의 장 목록을 추출합니다
      const allChapters = new Set<string>();
      Object.keys(bible).forEach(reference => {
        if (reference.startsWith(searchParams.book || '')) {
          const match = reference.match(/\d+/);
          if (match) {
            allChapters.add(match[0]);
          }
        }
      });
      setChapters(Array.from(allChapters));
    } else {
      setChapters([]);
    }
  }, [searchParams.book]);

  // 검색 기록에 추가
  const addToSearchHistory = (params: SearchParams) => {
    // 빈 검색은 기록하지 않음
    if (!params.keyword && !params.book && !params.chapter) return;
    
    // 검색 기록 아이템 생성
    const displayText = getDisplayText(params);
    
    // 동일한 검색 내용이 있는지 확인
    const existingIndex = searchHistory.findIndex(
      item => (
        item.keyword === params.keyword &&
        item.book === params.book &&
        item.chapter === params.chapter
      )
    );
    
    const newHistoryItem: SearchHistory = {
      ...params,
      id: Date.now().toString(),
      timestamp: Date.now(),
      displayText,
    };
    
    let updatedHistory: SearchHistory[];
    
    if (existingIndex !== -1) {
      // 동일한 검색 내용이 있으면 제거하고 최신으로 추가
      updatedHistory = [...searchHistory];
      updatedHistory.splice(existingIndex, 1);
      updatedHistory.unshift(newHistoryItem);
    } else {
      // 새로운 검색 내용 추가
      updatedHistory = [newHistoryItem, ...searchHistory];
    }
    
    // 최대 20개까지만 저장
    if (updatedHistory.length > 20) {
      updatedHistory = updatedHistory.slice(0, 20);
    }
    
    saveSearchHistory(updatedHistory);
  };
  
  // 검색 기록에서 항목 제거
  const removeFromSearchHistory = (id: string) => {
    const updatedHistory = searchHistory.filter(item => item.id !== id);
    saveSearchHistory(updatedHistory);
  };
  
  // 검색 기록 전체 삭제
  const clearSearchHistory = () => {
    saveSearchHistory([]);
  };
  
  // 검색 표시 텍스트 생성
  const getDisplayText = (params: SearchParams): string => {
    const parts = [];
    
    if (params.keyword) {
      parts.push(`"${params.keyword}"`);
    }
    
    if (params.book) {
      if (params.chapter) {
        parts.push(`${params.book} ${params.chapter}장`);
      } else {
        parts.push(params.book);
      }
    }
    
    return parts.length > 0 ? parts.join(' - ') : '전체 검색';
  };

  const handleSearch = () => {
    const { keyword, book, chapter } = searchParams;
    const searchResults: BibleVerse[] = [];
    
    // 검색 조건이 없으면 빈 결과 반환
    if (!keyword && !book && !chapter) {
      setResults([]);
      return;
    }

    // 최대 결과 수 제한 (성능 향상)
    const MAX_RESULTS = 200;
    let resultCount = 0;

    // 검색 조건을 미리 최적화
    const hasKeyword = Boolean(keyword);
    const hasBook = Boolean(book);
    const hasChapter = Boolean(chapter);
    const chapterRegex = (hasChapter && hasBook && book && chapter) 
      ? new RegExp(`${book}${chapter}:`) 
      : null;
    
    for (const [reference, text] of Object.entries(bible)) {
      // 결과 제한에 도달하면 중단
      if (resultCount >= MAX_RESULTS) break;
      
      // 북 필터링 (가장 빠른 필터링 먼저)
      if (hasBook && book && !reference.startsWith(book)) continue;
      
      // 장 필터링
      if (hasChapter && chapterRegex && !chapterRegex.test(reference)) continue;
      
      // 키워드 필터링 (가장 비용이 큰 필터링을 마지막에)
      if (hasKeyword && keyword && !text.includes(keyword)) continue;

      // 참조 분석 - 정규식 캐싱을 통한 최적화
      const bookMatch = reference.split(/\d/)[0];
      const chapterMatch = reference.match(/\d+/);
      const verseMatch = reference.match(/:(\d+)/);
      
      if (bookMatch && chapterMatch && verseMatch) {
        searchResults.push({
          book: bookMatch,
          chapter: chapterMatch[0],
          verse: verseMatch[1],
          text: text,
        });
        resultCount++;
      }
    }

    setResults(searchResults);
    
    // 검색 기록에 추가
    if (hasKeyword || hasBook || hasChapter) {
      addToSearchHistory({ ...searchParams });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFontControls = () => {
    setShowFontControls(!showFontControls);
  };
  
  // 검색 기록 팝오버 열기
  const handleHistoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHistoryAnchorEl(event.currentTarget);
  };
  
  // 검색 기록 팝오버 닫기
  const handleHistoryClose = () => {
    setHistoryAnchorEl(null);
  };
  
  // 검색 기록 항목 선택
  const handleHistoryItemClick = (historyItem: SearchHistory) => {
    setSearchParams({
      keyword: historyItem.keyword,
      book: historyItem.book,
      chapter: historyItem.chapter,
    });
    handleHistoryClose();
  };
  
  // 검색 파라미터가 변경될 때 자동으로 검색 실행
  useEffect(() => {
    // 초기 로딩 시에는 검색하지 않도록 처리
    const hasSearchParams = searchParams.keyword || searchParams.book || searchParams.chapter;
    if (hasSearchParams) {
      // 검색 파라미터가 있을 때만 검색 실행
      const timer = setTimeout(() => {
        handleSearch();
      }, 300); // 연속적인 변경 시 디바운싱
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const historyOpen = Boolean(historyAnchorEl);

  // 하이라이트 메뉴 열기
  const handleHighlightMenuOpen = (event: React.MouseEvent<HTMLElement>, verse: BibleVerse) => {
    setHighlightMenuAnchorEl(event.currentTarget);
    setCurrentVerse(verse);
  };

  // 하이라이트 메뉴 닫기
  const handleHighlightMenuClose = () => {
    setHighlightMenuAnchorEl(null);
  };

  // 하이라이트 적용
  const applyHighlight = (color?: string) => {
    if (currentVerse) {
      const verseReference = `${currentVerse.book}${currentVerse.chapter}:${currentVerse.verse}`;
      
      const bookmarkItem: BookmarkItem = {
        id: `bookmark-${Date.now()}`,
        reference: verseReference,
        book: currentVerse.book,
        chapter: currentVerse.chapter,
        verse: currentVerse.verse,
        text: currentVerse.text,
        timestamp: Date.now(),
        highlightColor: color,
      };
      
      toggleHighlight(bookmarkItem, color);
      handleHighlightMenuClose();
    }
  };

  // 북마크 토글
  const toggleBookmark = (verse: BibleVerse) => {
    const verseReference = `${verse.book}${verse.chapter}:${verse.verse}`;
    const existingBookmark = getBookmarkByReference(verseReference);
    
    if (existingBookmark) {
      removeBookmark(existingBookmark.id);
    } else {
      const bookmarkItem: BookmarkItem = {
        id: `bookmark-${Date.now()}`,
        reference: verseReference,
        book: verse.book,
        chapter: verse.chapter,
        verse: verse.verse,
        text: verse.text,
        timestamp: Date.now(),
      };
      addBookmark(bookmarkItem);
    }
  };

  // 구절의 북마크 상태 확인
  const checkBookmarkStatus = (verse: BibleVerse) => {
    const verseReference = `${verse.book}${verse.chapter}:${verse.verse}`;
    return isBookmarked(verseReference);
  };

  // 구절의 하이라이트 색상 가져오기
  const getVerseHighlightColor = (verse: BibleVerse) => {
    const verseReference = `${verse.book}${verse.chapter}:${verse.verse}`;
    const bookmark = getBookmarkByReference(verseReference);
    return bookmark?.highlightColor;
  };

  // 북마크 메뉴 열기
  const handleBookmarkMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBookmarkMenuAnchorEl(event.currentTarget);
  };

  // 북마크 메뉴 닫기
  const handleBookmarkMenuClose = () => {
    setBookmarkMenuAnchorEl(null);
  };

  // 북마크한 구절로 이동
  const navigateToBookmark = (bookmark: BookmarkItem) => {
    // 검색 파라미터 설정
    setSearchParams({
      book: bookmark.book,
      chapter: bookmark.chapter,
    });
    
    handleBookmarkMenuClose();
    
    // 검색을 실행하지 않고 직접 해당 구절만 표시
    const exactVerseResult: BibleVerse[] = [{
      book: bookmark.book,
      chapter: bookmark.chapter,
      verse: bookmark.verse,
      text: bookmark.text
    }];
    
    setResults(exactVerseResult);
    
    // 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 북마크 보유 여부 확인
  const hasBookmarks = useMemo(() => {
    return Object.keys(bookmarks).length > 0;
  }, [bookmarks]);

  // 구절 복사 함수
  const copyVerseToClipboard = (verse: BibleVerse) => {
    const textToCopy = `${verse.book} ${verse.chapter}:${verse.verse} "${verse.text}"`;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setSnackbarMessage('구절이 클립보드에 복사되었습니다.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('클립보드 복사 중 오류 발생:', error);
        setSnackbarMessage('클립보드 복사에 실패했습니다.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  // 스낵바 닫기 함수
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ 
      maxWidth: isMobile ? '100%' : '800px', 
      width: '100%',
      mx: 'auto', 
      p: isMobile ? 2 : 3,
      boxSizing: 'border-box',
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        mb: 2,
        position: 'relative',
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          gutterBottom
          sx={{ mb: isMobile ? 2 : 'inherit' }}
        >
          성경 검색
        </Typography>
        
        <Box sx={{ 
          position: isMobile ? 'absolute' : 'static', 
          top: isMobile ? 0 : 'auto', 
          right: isMobile ? 0 : 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          {/* 북마크 버튼 */}
          <Tooltip title="북마크">
            <IconButton 
              onClick={handleBookmarkMenuOpen}
              color="inherit" 
              size={isMobile ? "small" : "medium"}
            >
              <Badge badgeContent={Object.keys(bookmarks).length} color="primary">
                <BookmarkIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* 검색 기록 버튼 */}
          <Tooltip title="검색 기록">
            <IconButton 
              onClick={handleHistoryClick}
              color="inherit" 
              size={isMobile ? "small" : "medium"}
            >
              <HistoryIcon />
            </IconButton>
          </Tooltip>
          
          {/* 다크 모드 토글 버튼 */}
          <Tooltip title={mode === 'light' ? "다크 모드로 전환" : "라이트 모드로 전환"}>
            <IconButton 
              onClick={toggleColorMode} 
              color="inherit" 
              size={isMobile ? "small" : "medium"}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
          
          {showFontControls && (
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                display: 'inline-flex', 
                p: isMobile ? 1 : 0,
                bgcolor: isMobile ? 'background.paper' : 'transparent',
                boxShadow: isMobile ? 1 : 0,
                borderRadius: 1,
              }}
            >
              <Tooltip title="글자 크기 축소">
                <IconButton 
                  onClick={decreaseFontSize} 
                  size="small"
                  disabled={fontSize <= 12}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                {fontSize}px
              </Typography>
              
              <Tooltip title="글자 크기 확대">
                <IconButton 
                  onClick={increaseFontSize} 
                  size="small"
                  disabled={fontSize >= 24}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="글자 크기 초기화">
                <IconButton 
                  onClick={resetFontSize} 
                  size="small"
                  disabled={fontSize === 16}
                >
                  <RestartAltIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Box>
      </Box>
      
      <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2, 
          flexWrap: 'wrap'
        }}>
          <TextField
            label="검색어"
            value={searchParams.keyword || ''}
            onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
            onKeyDown={handleKeyDown}
            sx={{ 
              width: isMobile ? '100%' : isTablet ? '45%' : 'auto',
              minWidth: !isMobile ? 200 : 'auto',
            }}
            fullWidth={isMobile}
          />
          
          <FormControl sx={{ 
            width: isMobile ? '100%' : isTablet ? '45%' : 'auto',
            minWidth: !isMobile ? 200 : 'auto',
          }}>
            <InputLabel>책</InputLabel>
            <Select
              value={searchParams.book || ''}
              label="책"
              onChange={(e) => setSearchParams({ ...searchParams, book: e.target.value })}
              fullWidth
            >
              {books.map((book) => (
                <MenuItem key={book} value={book}>
                  {book}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ 
            width: isMobile ? '100%' : isTablet ? '45%' : 'auto',
            minWidth: !isMobile ? 200 : 'auto',
          }}>
            <InputLabel>장</InputLabel>
            <Select
              value={searchParams.chapter || ''}
              label="장"
              onChange={(e) => setSearchParams({ ...searchParams, chapter: e.target.value })}
              disabled={!searchParams.book}
              fullWidth
            >
              {chapters.map((chapter) => (
                <MenuItem key={chapter} value={chapter}>
                  {chapter}장
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            onClick={handleSearch}
            fullWidth={isMobile}
            startIcon={isMobile ? <SearchIcon /> : null}
          >
            검색
          </Button>
        </Box>
        
        {/* 최근 검색 기록 표시 */}
        {searchHistory.length > 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            mt: 2,
            alignItems: 'center'
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              최근 검색:
            </Typography>
            {searchHistory.slice(0, 5).map((item) => (
              <Chip
                key={item.id}
                label={item.displayText}
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleHistoryItemClick(item)}
                sx={{ 
                  maxWidth: isMobile ? '100%' : 200,
                  fontSize: '0.75rem',
                  '& .MuiChip-label': { 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  } 
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      <Paper>
        <List sx={{ 
          p: isMobile ? 1 : 2 
        }}>
          {results.length > 0 ? (
            results.map((verse, index) => {
              const isBookmarked = checkBookmarkStatus(verse);
              const highlightColor = getVerseHighlightColor(verse);
              const verseReference = `${verse.book}${verse.chapter}:${verse.verse}`;
              
              return (
                <ListItem 
                  key={index} 
                  divider
                  data-verse-reference={`${verse.book} ${verse.chapter}장 ${verse.verse}절`}
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: isMobile ? '12px 0' : '20px 0',
                    backgroundColor: highlightColor ? `${highlightColor}20` : 'inherit', // 하이라이트 색상을 배경색으로 (투명도 추가)
                    borderLeft: highlightColor ? `4px solid ${highlightColor}` : 'none', // 왼쪽 경계선
                    pl: highlightColor ? 2 : 0, // 하이라이트된 경우 왼쪽 패딩 추가
                  }}
                >
                  <Box sx={{ 
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                  }}>
                    <Typography 
                      component="div" 
                      variant={isMobile ? "subtitle1" : "h6"}
                      sx={{ 
                        fontWeight: 'bold',
                      }}
                    >
                      {`${verse.book} ${verse.chapter}장 ${verse.verse}절`}
                    </Typography>
                    
                    <Box>
                      <Tooltip title="하이라이트">
                        <IconButton 
                          size="small" 
                          onClick={(e) => handleHighlightMenuOpen(e, verse)}
                          sx={{ 
                            color: highlightColor || 'inherit' 
                          }}
                        >
                          <ColorLensIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title={isBookmarked ? "북마크 제거" : "북마크 추가"}>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleBookmark(verse)}
                          color={isBookmarked ? "primary" : "default"}
                        >
                          {isBookmarked ? 
                            <BookmarkIcon fontSize="small" /> : 
                            <BookmarkBorderIcon fontSize="small" />
                          }
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="구절 복사">
                        <IconButton 
                          size="small" 
                          onClick={() => copyVerseToClipboard(verse)}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <TextToSpeechButton text={verse.text} />
                    </Box>
                  </Box>
                  
                  <Typography 
                    component="div" 
                    variant="body1"
                    sx={{ 
                      width: '100%',
                      lineHeight: 1.8,
                      wordBreak: 'keep-all',
                      pl: 1,
                      mt: 1
                    }}
                  >
                    {verse.text}
                  </Typography>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText 
                primary={
                  <Typography 
                    sx={{ 
                      textAlign: 'center',
                      py: 2 
                    }}
                  >
                    검색 결과가 없습니다. 다른 검색어를 입력해보세요.
                  </Typography>
                } 
              />
            </ListItem>
          )}
        </List>
      </Paper>
      
      {/* 모바일에서만 보이는 하단 고정 검색 버튼 */}
      {isMobile && results.length > 5 && (
        <Fab 
          color="primary" 
          aria-label="검색" 
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16,
            zIndex: 1000,
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <SearchIcon />
        </Fab>
      )}
      
      {/* 검색 기록 팝오버 */}
      <Popover
        open={historyOpen}
        anchorEl={historyAnchorEl}
        onClose={handleHistoryClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{ 
            width: isMobile ? 300 : 400, 
            maxHeight: 400,
            overflow: 'auto',
            p: 1 
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 1,
            mb: 1,
            borderBottom: 1, 
            borderColor: 'divider' 
          }}>
            <Typography variant="subtitle1" fontWeight="bold">
              검색 기록
            </Typography>
            {searchHistory.length > 0 && (
              <Tooltip title="전체 삭제">
                <IconButton size="small" onClick={clearSearchHistory}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          
          {searchHistory.length > 0 ? (
            <List dense>
              {searchHistory.map((item) => (
                <ListItem 
                  key={item.id} 
                  disablePadding
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="삭제" 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromSearchHistory(item.id);
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemButton 
                    onClick={() => handleHistoryItemClick(item)}
                    dense
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <HistoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.displayText}
                      primaryTypographyProps={{ 
                        noWrap: true,
                        sx: { maxWidth: isMobile ? 180 : 280 } 
                      }}
                      secondary={new Date(item.timestamp).toLocaleString()}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        fontSize: '0.7rem'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ py: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                검색 기록이 없습니다.
              </Typography>
            </Box>
          )}
        </Box>
      </Popover>
      
      {/* 하이라이트 색상 선택 메뉴 */}
      <Menu
        anchorEl={highlightMenuAnchorEl}
        open={Boolean(highlightMenuAnchorEl)}
        onClose={handleHighlightMenuClose}
      >
        <Box sx={{ 
          p: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1 
        }}>
          <Typography variant="subtitle2" sx={{ px: 1 }}>
            하이라이트 색상
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            p: 1
          }}>
            {Object.entries(HIGHLIGHT_COLORS).map(([name, color]) => (
              <Tooltip key={name} title={name}>
                <IconButton 
                  size="small" 
                  onClick={() => applyHighlight(color)}
                  sx={{ 
                    bgcolor: color,
                    width: 24,
                    height: 24,
                    '&:hover': {
                      bgcolor: color,
                      opacity: 0.8
                    }
                  }}
                >
                  <span></span>
                </IconButton>
              </Tooltip>
            ))}
            <Tooltip title="하이라이트 제거">
              <IconButton 
                size="small" 
                onClick={() => applyHighlight(undefined)}
                sx={{ 
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  width: 24,
                  height: 24
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Menu>
      
      {/* 북마크 목록 팝오버 */}
      <Popover
        open={Boolean(bookmarkMenuAnchorEl)}
        anchorEl={bookmarkMenuAnchorEl}
        onClose={handleBookmarkMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{ 
            width: isMobile ? 300 : 400, 
            maxHeight: 400,
            overflow: 'auto',
            p: 1 
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 1,
            mb: 1,
            borderBottom: 1, 
            borderColor: 'divider' 
          }}>
            <Typography variant="subtitle1" fontWeight="bold">
              북마크
            </Typography>
          </Box>
          
          {hasBookmarks ? (
            <List dense>
              {Object.values(bookmarks)
                .sort((a, b) => b.timestamp - a.timestamp) // 최신순 정렬
                .map((bookmark) => (
                  <ListItem 
                    key={bookmark.id} 
                    disablePadding
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="삭제" 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBookmark(bookmark.id);
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{
                      borderLeft: bookmark.highlightColor ? `4px solid ${bookmark.highlightColor}` : 'none',
                      pl: bookmark.highlightColor ? 1 : 0,
                    }}
                  >
                    <ListItemButton 
                      onClick={() => navigateToBookmark(bookmark)}
                      dense
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <BookmarkIcon 
                          fontSize="small" 
                          sx={{ color: bookmark.highlightColor || 'primary.main' }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${bookmark.book} ${bookmark.chapter}:${bookmark.verse}`}
                        primaryTypographyProps={{ 
                          fontWeight: 'medium',
                          noWrap: true,
                          sx: { maxWidth: isMobile ? 180 : 280 } 
                        }}
                        secondary={bookmark.text.substring(0, 30) + (bookmark.text.length > 30 ? '...' : '')}
                        secondaryTypographyProps={{
                          variant: 'body2',
                          noWrap: true
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          ) : (
            <Box sx={{ py: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                저장된 북마크가 없습니다.
              </Typography>
            </Box>
          )}
        </Box>
      </Popover>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 