import { Container } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { getLayoutBreakpoints, useLayoutState } from 'src/shared/layout';

export interface IPageContainerProps 
{
  children: ReactNode[] | ReactNode;
}

export const PageContainer: React.FC<IPageContainerProps> = ({children}:IPageContainerProps) => 
{
  const layoutState = useLayoutState();
  const marginTop = layoutState.header.isVisible ? layoutState.header.height + 5 : 5;
  const marginBottom = layoutState.footer.isVisible ? layoutState.footer.height + 5 : 5;
  return (
    <Container sx={{marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px`}} maxWidth={getLayoutBreakpoints()}>
      {children}
    </Container>
  );
};