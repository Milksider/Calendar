import React, { FC, PropsWithChildren } from 'react';

import classes from './MainLayout.module.css';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.layout}>{children}</div>;
};
