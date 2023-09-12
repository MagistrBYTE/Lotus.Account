import React from 'react';
import { IUserNotification, UserNotificationApi, UserNotificationObjectInfo } from 'src/modules/account/user-notifications';
import { TableView } from 'src/ui/components/DataView';

export const UserNotificationTable: React.FC = () => 
{
  return (
    <TableView<IUserNotification> 
      objectInfo={UserNotificationObjectInfo}
      enableColumnResizing={true}
      enableColumnActions={false}
      enableEditing={false}
      enableRowActions={false}
      layoutMode='grid'
      enableColumnFilterModes={false}
      onGetItems={UserNotificationApi.getUserNotificationsAsync}/>
  );
};