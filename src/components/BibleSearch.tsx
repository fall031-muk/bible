import React, { useState, useEffect, useContext } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import SearchIcon from '@mui/icons-material/Search';
import bibleData from '../data/bible.json';
import { BibleData, BibleVerse, SearchParams } from '../types/bible';
import { FontSizeContext } from '../App';

const bible = bibleData as BibleData;

export const BibleSearch: React.FC = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [chapters, setChapters] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [showFontControls, setShowFontControls] = useState(false);
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useContext(FontSizeContext);
  
  // 반응형 디자인을 위한 미디어 쿼리
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleSearch = () => {
    const { keyword, book, chapter } = searchParams;
    const searchResults: BibleVerse[] = [];

    for (const [reference, text] of Object.entries(bible)) {
      // 검색 조건에 맞는지 확인
      if (book && !reference.startsWith(book)) continue;
      
      // 장 검색
      if (chapter) {
        const regex = new RegExp(`${book}${chapter}:`);
        if (!regex.test(reference)) continue;
      }
      
      // 키워드 검색
      if (keyword && !text.includes(keyword)) continue;

      // 참조 분석
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
      }
    }

    setResults(searchResults);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFontControls = () => {
    setShowFontControls(!showFontControls);
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
        }}>
          <Tooltip title="글자 크기 조절">
            <IconButton onClick={toggleFontControls} color="primary" size={isMobile ? "small" : "medium"}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          
          {showFontControls && (
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                display: 'inline-flex', 
                ml: 1,
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
      </Paper>

      <Paper>
        <List sx={{ 
          p: isMobile ? 1 : 2 
        }}>
          {results.length > 0 ? (
            results.map((verse, index) => (
              <ListItem 
                key={index} 
                divider
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: isMobile ? '12px 0' : '20px 0',
                }}
              >
                <Typography 
                  component="div" 
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  {`${verse.book} ${verse.chapter}장 ${verse.verse}절`}
                </Typography>
                
                <Typography 
                  component="div" 
                  variant="body1"
                  sx={{ 
                    width: '100%',
                    lineHeight: 1.8,
                    wordBreak: 'keep-all',
                    pl: 1
                  }}
                >
                  {verse.text}
                </Typography>
              </ListItem>
            ))
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
    </Box>
  );
}; 