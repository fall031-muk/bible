import React, { useState, createContext, useCallback } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BibleSearch } from './components/BibleSearch';

// 글자 크기 컨텍스트 생성
export const FontSizeContext = createContext({
  fontSize: 16,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
});

function App() {
  const [fontSize, setFontSize] = useState(16); // 기본 글자 크기 16px

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

  // 글자 크기에 따라 동적으로 테마 생성
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontSize: fontSize,
    },
  });

  return (
    <FontSizeContext.Provider 
      value={{ 
        fontSize, 
        increaseFontSize, 
        decreaseFontSize, 
        resetFontSize 
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BibleSearch />
      </ThemeProvider>
    </FontSizeContext.Provider>
  );
}

export default App; 