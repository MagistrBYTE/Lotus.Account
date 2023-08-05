import * as React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { MainHeader } from './components/MainHeader';
import { LeftSidebar } from './components/LeftSidebar';
import { Footer } from './components/Footer';

export interface IMainLayoutProps
{
  page: React.ReactElement | null;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({page}:IMainLayoutProps) => 
{
  return (
    <>
      <CssBaseline />
      <MainHeader />
      <LeftSidebar/>
      <Container maxWidth='xl'>
        {page}
      </Container>  
      <Footer/>
    </>
  );
};
