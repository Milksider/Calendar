import React, {FC, memo} from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IHeader } from '@Components/Container/Header/Header.types';
import { HeaderSX } from '@Components/Container/Header/stylesSX';
import { HeaderButtonSX } from '@Components/buttons';

export const Header: FC<IHeader> = memo(({ mode, colorMode }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={[HeaderSX.container,mode === 'dark' && HeaderSX.backgroundColor]}>
      <IconButton sx={HeaderSX.icon} onClick={colorMode} color='inherit'>
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Button
        color='primary'
        variant='contained'
        size='small'
        sx={HeaderButtonSX.button}
        onClick={() => changeLanguage('en')}>
        EN
      </Button>
      <Button
        color='primary'
        variant='contained'
        size='small'
        sx={HeaderButtonSX.button}
        onClick={() => changeLanguage('ru')}>
        RU
      </Button>
    </Box>
  );
});

Header.displayName = 'Header';
