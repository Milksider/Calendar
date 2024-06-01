import React, { FC, PropsWithChildren } from 'react';
import { IHeader } from '@Components/Container/Header/Header.types';
import { Box } from '@mui/material';
import { Header } from '@Components/Container/Header/Header';
import { useLocation } from 'react-router-dom';
import { ContainerSX } from './stylesSX';

export const Container: FC<PropsWithChildren<IHeader>> = ({
                                                            children,
                                                            mode,
                                                            colorMode,
                                                          }) => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  return (
    <Box sx={ mode === 'light' ? ContainerSX.containerImg : null}>
      {!isMainPage && <Header mode={mode} colorMode={colorMode} />}
      {children}
    </Box>
  );
};

