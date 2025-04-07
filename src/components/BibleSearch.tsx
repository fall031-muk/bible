import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import bibleData from '../data/bible.json';
import { BibleData, BibleVerse, SearchParams } from '../types/bible';

const bible = bibleData as BibleData;

export const BibleSearch: React.FC = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [chapters, setChapters] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [results, setResults] = useState<BibleVerse[]>([]);

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

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        성경 검색
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="검색어"
            value={searchParams.keyword || ''}
            onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
            sx={{ minWidth: 200 }}
          />
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>책</InputLabel>
            <Select
              value={searchParams.book || ''}
              label="책"
              onChange={(e) => setSearchParams({ ...searchParams, book: e.target.value })}
            >
              {books.map((book) => (
                <MenuItem key={book} value={book}>
                  {book}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>장</InputLabel>
            <Select
              value={searchParams.chapter || ''}
              label="장"
              onChange={(e) => setSearchParams({ ...searchParams, chapter: e.target.value })}
              disabled={!searchParams.book}
            >
              {chapters.map((chapter) => (
                <MenuItem key={chapter} value={chapter}>
                  {chapter}장
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSearch}>
            검색
          </Button>
        </Box>
      </Paper>

      <Paper>
        <List>
          {results.length > 0 ? (
            results.map((verse, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${verse.book} ${verse.chapter}장 ${verse.verse}절`}
                  secondary={verse.text}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="검색 결과가 없습니다. 다른 검색어를 입력해보세요." />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
}; 