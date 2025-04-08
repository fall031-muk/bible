import React, { useState, createContext, useCallback } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import { BibleSearch } from './components/BibleSearch';

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

function App() {
  const [fontSize, setFontSize] = useState(16); // 기본 글자 크기 16px
  const [mode, setMode] = useState<PaletteMode>('light'); // 기본 라이트 모드

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BibleSearch />
        </ThemeProvider>
      </FontSizeContext.Provider>
    </ColorModeContext.Provider>
  );
}

export default App; 