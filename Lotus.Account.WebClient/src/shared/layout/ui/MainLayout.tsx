import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { HorizontalStack } from 'src/ui/components/Layout';
import { useLayoutState } from '../store/LayoutSelector';
import { TScreenType } from '../domain/ScreenType';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { Footer } from './components/Footer';

export interface IMainLayoutProps
{
  page: React.ReactElement | null;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({page}:IMainLayoutProps) => 
{
  const layoutState = useLayoutState();

  if(layoutState.screenType != TScreenType.Landscape)
  {
    return (
      <>
        <CssBaseline />
        <Header />
        <LeftPanel/>
        {page}
        <Footer/>
      </>);
  }
  else
  {
    return (
      <HorizontalStack>
        <CssBaseline />
        <LeftPanel/>
        {page}
      </HorizontalStack>);    
  }
};
