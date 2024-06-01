import { purple, yellow } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            light: '#757ce8',
            dark: '#9c27b0c9',
            main: '#ffc107',
            contrastText: '#fff',
          },
        secondary:{
          main:'rgba(70, 5, 89, 0.4)',
        },
          divider: purple[200],
          background: {
            default: purple[900],
            paper: purple[900],
            event: '#9c27b0',
            backgroundLight: 'rgba(70, 5, 89, 0.4)',
            backgroundError: 'rgba(70, 5, 89, 0.4)',
            solidBackgroundLight: 'rgba(255, 255, 255)',
            backgroundDark: '#eeede6',
            tabDesc:'#e2e2de',
            backgroundGrayF2: '#F2F2F2',
            backgroundGrayDA: '#DADCE099',
            backgroundBlueF5: '#F5FAFF'
          },
          text: {
            primary: '#9c27b0',
            white: '#fff',
            secondary: '#ffc107',
            textBlue0C: '#0C41FF',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: '#757ce8',
            dark: '#9c27b0c9',
            main: '#9c27b0',
            contrastText: '#fff',
          },
        secondary:{
            main:'#ffc107',
        },

          divider: yellow[700],
          background: {
            event: '#ffc107',
            backgroundDark: '#1b1e2e',
            backgroundError: 'rgba(27, 30, 46, 0.4)',
            backgroundLight: 'rgba(255, 255, 255, 0.75)',
            solidBackgroundLight: 'rgba(255, 255, 255)',
            tabDesc:'rgba(31,34,52,0.86)',
            backgroundGrayF2: '#F2F2F2',
            backgroundGrayDA: '#DADCE099',
            backgroundBlueF5: '#F5FAFF'
          },
          text: {
            primary: '#fff',
            secondary: '#9c27b0',
            textBlue0C: '#0C41FF',
          },
        }),
  },
});
