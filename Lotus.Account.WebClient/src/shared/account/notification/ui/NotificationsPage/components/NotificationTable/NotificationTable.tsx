import React from 'react';
import { INotification } from 'src/shared/account/notification';
import { NotificationApi } from 'src/shared/account/notification/api/NotificationApiService';
import { NotificationProperties } from 'src/shared/account/notification/domain/Notification';
import { TableView } from 'src/ui/components/DataView/TableView';

export const NotificationTable: React.FC = () => 
{
  return (
    <TableView<INotification> 
      propertiesInfo={NotificationProperties}
      columns={[]}
      data={[]}
      enableColumnResizing={true}
      onGetItems={NotificationApi.getNotificationsAsync}/>
  );
};