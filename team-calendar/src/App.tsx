import React, {createContext, useMemo, useState} from 'react';
import './App.css';
import {createTheme, PaletteMode, ThemeProvider} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import {MainPage} from '@Pages/MainPage';
import {getDesignTokens} from './themes/getDesignTokens';
import {Container} from '@Components/Container/Container';

const ColorModeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
});

export const App = () => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container mode={theme.palette.mode} colorMode={colorMode.toggleColorMode}>
          <Routes>
            <Route path='/' element={<MainPage mode={theme.palette.mode}
                                               colorMode={colorMode.toggleColorMode} />} />
            <Route path='*' element={<>{'Error pages not found'}</>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
