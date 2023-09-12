import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';
import { TScreenType, useLayoutState } from 'src/app/layout';
import { UserNotificationTable } from 'src/widgets/account/user-notifications/UserNotificationTable';
import { UserNotificationList } from 'src/widgets/account/user-notifications/UserNotificationList';


export const UserNotificationsPage: React.FC = () => 
{
  const isDesktop = useLayoutState().screenType === TScreenType.Desktop;

  return (
    <PageContainer>
      {isDesktop && <UserNotificationTable/>}
      {!isDesktop && <UserNotificationList/>}
    </PageContainer>
  );
};