import React from 'react';
import { Container } from '@mui/material';
import { TScreenType, getLayoutBreakpoints, useLayoutState } from 'src/shared/layout';
import { NotificationList } from './components/NotificationList';
import { NotificationTable } from './components/NotificationTable';

export const NotificationsPage: React.FC = () => 
{
  const isDesktop = useLayoutState().screenType === TScreenType.Desktop;

  return (
    <Container maxWidth={getLayoutBreakpoints()}>
      {isDesktop && <NotificationTable/>}
      {!isDesktop && <NotificationList/>}
    </Container>
  );
};