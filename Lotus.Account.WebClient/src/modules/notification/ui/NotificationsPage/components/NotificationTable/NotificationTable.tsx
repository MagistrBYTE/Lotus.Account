import React from 'react';
import { NotificationApi } from 'src/modules/notification/api/NotificationApiService';
import { INotification, NotificationProperties } from 'src/modules/notification/domain/Notification';
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