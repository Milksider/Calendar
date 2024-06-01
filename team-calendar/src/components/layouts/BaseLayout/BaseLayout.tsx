import React, { FC, PropsWithChildren } from 'react';

import classes from './BaseLayout.module.css';

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.layout}>{children}</div>;
};
