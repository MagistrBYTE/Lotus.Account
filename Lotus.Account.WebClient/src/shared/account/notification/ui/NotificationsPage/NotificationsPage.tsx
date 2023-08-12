import React from 'react';
import { TScreenType, useLayoutState } from 'src/shared/layout';
import { PageContainer } from 'src/ui/components/Layout';
import { NotificationList } from './components/NotificationList';
import { NotificationTable } from './components/NotificationTable';

export const NotificationsPage: React.FC = () => 
{
  const isDesktop = useLayoutState().screenType === TScreenType.Desktop;

  return (
    <PageContainer>
      {isDesktop && <NotificationTable/>}
      {!isDesktop && <NotificationList/>}
    </PageContainer>
  );
};